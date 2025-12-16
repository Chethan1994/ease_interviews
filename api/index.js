
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();

// Allow CORS from anywhere for the demo
app.use(cors());
app.use(bodyParser.json());

// Configure Multer for memory storage (files are held in RAM)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 } // Limit file size to 4MB (Vercel has limits)
});

// --- In-Memory Database for Vercel ---
const db = {
    users: []
};

// --- Email Configuration ---
// Note: In production, these should be environment variables (process.env.EMAIL_USER, process.env.EMAIL_PASS)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'chethansg4@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here' 
    }
});

// --- Routes ---

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', users: db.users.length });
});

// Contribute Endpoint (Handles both text and file uploads)
app.post('/api/contribute', upload.single('file'), async (req, res) => {
    try {
        const { type } = req.body;
        const file = req.file;

        let subject = '';
        let textContent = '';
        let attachments = [];

        if (type === 'multiple') {
            const questions = JSON.parse(req.body.questions || '[]');
            const count = questions.length;
            
            subject = `New Contribution: ${count} Question${count > 1 ? 's' : ''}`;
            
            textContent = `User submitted ${count} questions:\n\n`;
            
            questions.forEach((q, index) => {
                textContent += `--- QUESTION ${index + 1} ---\n`;
                textContent += `Category: ${q.category}\n`;
                textContent += `Difficulty: ${q.difficulty}\n`;
                textContent += `Question:\n${q.question}\n\n`;
                textContent += `Answer:\n${q.answer}\n\n`;
                if (q.codeSnippet) {
                    textContent += `Code Snippet:\n${q.codeSnippet}\n`;
                }
                textContent += `\n`;
            });

        } else if (type === 'single') {
            // Legacy support if needed, but 'multiple' covers it
            const { category, difficulty, question, answer, codeSnippet } = req.body;
            subject = `New Contribution: ${category} (${difficulty})`;
            textContent = `
New Question Contribution

Category: ${category}
Difficulty: ${difficulty}

Question:
${question}

Answer:
${answer}

Code Snippet:
${codeSnippet || 'None'}
            `;
        } else {
            subject = 'Bulk Contribution Upload';
            textContent = `A bulk file upload has been submitted. See attachment.`;
            
            if (file) {
                attachments.push({
                    filename: file.originalname,
                    content: file.buffer
                });
            } else {
                return res.status(400).json({ message: 'No file uploaded for bulk submission' });
            }
        }

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'chethansg4@gmail.com', 
            to: 'chethansg4@gmail.com',
            subject: subject,
            text: textContent,
            attachments: attachments
        };

        if (process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'Contribution submitted successfully' });
        } else {
            console.log("Mock Email Sent:", mailOptions);
            res.json({ message: 'Contribution submitted successfully (Mock)' });
        }

    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to submit contribution. Please try again later.' });
    }
});

// Register
app.post('/api/register', (req, res) => {
    const { email, password, name } = req.body;
    
    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password, 
        name,
        isPremium: false,
        masteredIds: [],
        reviewedIds: []
    };

    db.users.push(newUser);

    const { password: _, ...userWithoutPass } = newUser;
    res.json(userWithoutPass);
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Ensure new fields exist for old users
    if (!user.reviewedIds) user.reviewedIds = [];
    if (!user.masteredIds) user.masteredIds = [];

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Mark Mastered
app.post('/api/user/progress/mastered', (req, res) => {
    const { userId, masteredId } = req.body;
    const user = db.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.masteredIds) user.masteredIds = [];
    
    if (!user.masteredIds.includes(masteredId)) {
        user.masteredIds.push(masteredId);
    }

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Mark Reviewed
app.post('/api/user/progress/reviewed', (req, res) => {
    const { userId, reviewedId } = req.body;
    const user = db.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.reviewedIds) user.reviewedIds = [];
    
    if (!user.reviewedIds.includes(reviewedId)) {
        user.reviewedIds.push(reviewedId);
    }

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Process Payment
app.post('/api/payment/success', (req, res) => {
    const { userId } = req.body;
    const user = db.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.isPremium = true;

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

module.exports = app;
        
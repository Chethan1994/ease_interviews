require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/interview-prep';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        console.log('Ensure you have a .env file with MONGO_URI or a local MongoDB running.');
    });

// --- Configuration ---

// Multer for file uploads (stored in memory to attach to email)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 } // 4MB Limit
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'chethansg4@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here' 
    }
});

// --- Routes ---

app.get('/api/health', (req, res) => {
    const readyState = mongoose.connection.readyState;
    const status = readyState === 1 ? 'connected' : 'disconnected';
    res.json({ status: 'ok', db: status });
});

// --- Feature: Contribution (Email) ---
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
            console.log("Mock Email Sent (No password configured):", subject);
            res.json({ message: 'Contribution submitted successfully (Mock)' });
        }

    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to submit contribution. Please try again later.' });
    }
});

// --- Feature: Authentication & User Data (MongoDB) ---

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            id: Date.now().toString(), // Custom ID for frontend compatibility
            email,
            password, // Note: Use bcrypt in production!
            name,
            isPremium: false
        });

        await newUser.save();

        // Remove sensitive data before sending back
        const userObj = newUser.toObject();
        delete userObj.password;
        delete userObj._id;
        
        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Simple plain text check (Use bcrypt.compare in production)
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj._id;

        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Mark Mastered
app.post('/api/user/progress/mastered', async (req, res) => {
    try {
        const { userId, masteredId } = req.body;
        
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $addToSet: { masteredIds: masteredId } }, // $addToSet prevents duplicates
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating mastery' });
    }
});

// Mark Reviewed
app.post('/api/user/progress/reviewed', async (req, res) => {
    try {
        const { userId, reviewedId } = req.body;
        
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $addToSet: { reviewedIds: reviewedId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating progress' });
    }
});

// Process Payment
app.post('/api/payment/success', async (req, res) => {
    try {
        const { userId } = req.body;
        
        const user = await User.findOneAndUpdate(
            { id: userId },
            { isPremium: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

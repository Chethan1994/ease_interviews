import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import mongoose from 'mongoose';
import { Buffer } from 'buffer';
import User from './models/User';
import Contribution from './models/Contribution';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors() as any);
app.use(bodyParser.json() as any);

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Vercel-Admin-ease-interview-db:srRODOaoHwMOtY24@ease-interview-db.rfn442u.mongodb.net/interview-prep?retryWrites=true&w=majority';

// Enhanced Logging for MongoDB
mongoose.connection.on('connected', () => console.log('✅ MongoDB: Connected successfully'));
mongoose.connection.on('open', () => console.log('✅ MongoDB: Connection open'));
mongoose.connection.on('disconnected', () => console.log('❌ MongoDB: Disconnected'));
mongoose.connection.on('reconnected', () => console.log('⚠️ MongoDB: Reconnected'));
mongoose.connection.on('disconnecting', () => console.log('⚠️ MongoDB: Disconnecting...'));
mongoose.connection.on('close', () => console.log('❌ MongoDB: Connection closed'));

console.log(`Attempting to connect to MongoDB at: ${MONGO_URI.replace(/:([^@]+)@/, ':****@')}`); // Log URI hiding password

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Initial Connection Established'))
    .catch((err) => {
        console.error('❌ MongoDB Initial Connection Error Details:', JSON.stringify(err, null, 2));
        console.log('HINT: Check if your IP is whitelisted in MongoDB Atlas Network Access. For temporary testing, you can allow 0.0.0.0/0.');
    });

// --- Configuration ---

// Multer for file uploads
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

app.get('/api/health', (req: any, res: any) => {
    const readyState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.json({ status: 'ok', dbState: states[readyState] || 'unknown' });
});

// --- Feature: Contribution (DB + Email) ---

interface MulterRequest extends Request {
    file?: any;
    body: any;
}

app.post('/api/contribute', upload.single('file') as any, async (req: any, res: any): Promise<any> => {
    console.log('📝 Received contribution request');
    try {
        const { type } = req.body;
        const file = req.file;

        let subject = '';
        let textContent = '';
        let attachments: { filename: string; content: Buffer }[] = [];
        let dbData: any = {};

        // 1. Prepare Data for DB and Email
        if (type === 'multiple') {
            const questions = JSON.parse(req.body.questions || '[]');
            dbData = { questions }; // Store raw array in DB
            
            const count = questions.length;
            subject = `New Contribution: ${count} Question${count > 1 ? 's' : ''}`;
            textContent = `User submitted ${count} questions:\n\n`;
            
            questions.forEach((q: any, index: number) => {
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
            dbData = { category, difficulty, question, answer, codeSnippet };

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
            // Bulk File
            subject = 'Bulk Contribution Upload';
            textContent = `A bulk file upload has been submitted. See attachment.`;
            
            if (file) {
                // Store file metadata + base64 content in DB (be careful with large files in Mongo)
                // For safety, we store it as a Buffer or base64 string if < 16MB
                dbData = {
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    contentBase64: file.buffer.toString('base64')
                };

                attachments.push({
                    filename: file.originalname,
                    content: file.buffer
                });
            } else {
                return res.status(400).json({ message: 'No file uploaded for bulk submission' });
            }
        }

        // 2. Save to MongoDB
        console.log('💾 Saving contribution to MongoDB...');
        const newContribution = new Contribution({
            type,
            data: dbData,
            status: 'pending'
        });
        await newContribution.save();
        console.log('✅ Contribution saved to DB with ID:', newContribution._id);

        // 3. Send Email
        console.log('📧 Sending email notification...');
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
            console.log("⚠️ Mock Email Sent (No password configured)");
            res.json({ message: 'Contribution submitted successfully (Saved to DB, Email Mocked)' });
        }

    } catch (error) {
        console.error('❌ Contribution Error:', error);
        res.status(500).json({ message: 'Failed to submit contribution. Check server logs.' });
    }
});

// --- Feature: Authentication & User Data (MongoDB) ---

// Register
app.post('/api/register', async (req: any, res: any): Promise<any> => {
    console.log('👤 Register Request:', req.body.email);
    try {
        const { email, password, name } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('⚠️ User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            id: Date.now().toString(),
            email,
            password, // In a real app, hash this!
            name,
            isPremium: false
        });

        await newUser.save();
        console.log('✅ User registered:', newUser._id);

        const userObj = newUser.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        
        res.json(userObj);
    } catch (err) {
        console.error('❌ Registration Error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login
app.post('/api/login', async (req: any, res: any): Promise<any> => {
    console.log('🔑 Login Request:', req.body.email);
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, password });

        if (!user) {
            console.log('❌ Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        console.log('✅ Login successful:', user._id);
        const userObj = user.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;

        res.json(userObj);
    } catch (err) {
        console.error('❌ Login Error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Mark Mastered
app.post('/api/user/progress/mastered', async (req: any, res: any): Promise<any> => {
    try {
        const { userId, masteredId } = req.body;
        
        const user = await User.findOneAndUpdate(
            { id: userId },
            { $addToSet: { masteredIds: masteredId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userObj = user.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error('❌ Progress Error:', err);
        res.status(500).json({ message: 'Error updating mastery' });
    }
});

// Mark Reviewed
app.post('/api/user/progress/reviewed', async (req: any, res: any): Promise<any> => {
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
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error('❌ Progress Error:', err);
        res.status(500).json({ message: 'Error updating progress' });
    }
});

// Process Payment
app.post('/api/payment/success', async (req: any, res: any): Promise<any> => {
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
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        res.json(userObj);
    } catch (err) {
        console.error('❌ Payment Error:', err);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
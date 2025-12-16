import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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

console.log(`Attempting to connect to MongoDB at: ${MONGO_URI.replace(/:([^@]+)@/, ':****@')}`);

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Initial Connection Established'))
    .catch((err) => {
        console.error('❌ MongoDB Initial Connection Error Details:', JSON.stringify(err, null, 2));
    });

// --- Configuration ---

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 } // 4MB Limit
});

// --- Routes ---

app.get('/api/health', (req: any, res: any) => {
    const readyState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.json({ status: 'ok', dbState: states[readyState] || 'unknown' });
});

// --- Feature: Contribution (DB Only - No Email) ---

interface MulterRequest extends Request {
    file?: any;
    body: any;
}

app.post('/api/contribute', upload.single('file') as any, async (req: any, res: any): Promise<any> => {
    console.log('📝 Received contribution request');
    try {
        const { type } = req.body;
        const file = req.file;

        let dbData: any = {};

        // 1. Prepare Data for DB
        if (type === 'multiple') {
            const questions = JSON.parse(req.body.questions || '[]');
            dbData = { questions }; 
        } else if (type === 'single') {
            const { category, difficulty, question, answer, codeSnippet } = req.body;
            dbData = { category, difficulty, question, answer, codeSnippet };
        } else {
            // Bulk File
            if (file) {
                dbData = {
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    contentBase64: file.buffer.toString('base64')
                };
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

        res.json({ message: 'Contribution submitted successfully' });

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
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            id: Date.now().toString(),
            email,
            password, 
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

// Google Auth
app.post('/api/auth/google', async (req: any, res: any): Promise<any> => {
    console.log('🔵 Google Auth Request:', req.body.email);
    try {
        const { email, name, googleId } = req.body;
        
        let user = await User.findOne({ email });
        
        if (!user) {
            console.log('✨ Creating new user via Google Auth');
            user = new User({
                id: Date.now().toString(),
                email,
                name,
                googleId,
                isPremium: false
            });
            await user.save();
        } else {
            console.log('✅ Existing user found for Google Auth');
            // Link Google ID if not present
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        }

        const userObj = user.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        
        res.json(userObj);
    } catch (err) {
        console.error('❌ Google Auth Error:', err);
        res.status(500).json({ message: 'Server error during Google authentication' });
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
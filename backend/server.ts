import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';
import User from './models/User';
import Contribution from './models/Contribution';
import Question from './models/Question';

const app = express();
const PORT = process.env.PORT;

app.use(cors() as any);
app.use(bodyParser.json() as any);

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

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

// --- Public Data ---

// Get Questions (DB)
app.get('/api/questions', async (req: any, res: any) => {
    try {
        const questions = await Question.find({});
        console.log(`Fetched ${questions.length} questions from DB`);
        res.json(questions);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

// --- Admin Routes ---

// Promote to Admin
app.post('/api/admin/promote', async (req: any, res: any) => {
    try {
        const { email } = req.body;
        const user = await User.findOneAndUpdate({ email }, { isAdmin: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User promoted to admin' });
    } catch (err) {
        res.status(500).json({ message: 'Error promoting user' });
    }
});

// Get Contributions
app.get('/api/admin/contributions', async (req: any, res: any) => {
    try {
        const contributions = await Contribution.find({ status: 'pending' }).sort({ submittedAt: -1 });
        res.json(contributions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contributions' });
    }
});

// Update Contribution Data
app.put('/api/admin/contributions/:id', async (req: any, res: any) => {
    try {
        const { data } = req.body;
        await Contribution.findByIdAndUpdate(req.params.id, { data });
        res.json({ message: 'Contribution updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating contribution' });
    }
});

// Delete Contribution
app.delete('/api/admin/contributions/:id', async (req: any, res: any) => {
    try {
        await Contribution.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contribution deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contribution' });
    }
});

// Approve Contribution
app.post('/api/admin/contributions/:id/approve', async (req: any, res: any) => {
    try {
        const contribution = await Contribution.findById(req.params.id);
        if (!contribution) return res.status(404).json({ message: 'Contribution not found' });

        // Logic for 'single' type contributions
        if (contribution.type === 'single') {
            const qData = contribution.data;
            const newQuestion = new Question({
                id: Date.now().toString(), // Generate a unique ID
                category: qData.category,
                difficulty: qData.difficulty,
                question: qData.question,
                answer: qData.answer,
                codeSnippet: qData.codeSnippet
            });
            await newQuestion.save();
        } 
        // Logic for 'multiple' type
        else if (contribution.type === 'multiple' && Array.isArray(contribution.data.questions)) {
             for (const q of contribution.data.questions) {
                 const newQuestion = new Question({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    category: q.category,
                    difficulty: q.difficulty,
                    question: q.question,
                    answer: q.answer,
                    codeSnippet: q.codeSnippet
                });
                await newQuestion.save();
             }
        }

        contribution.status = 'approved';
        await contribution.save();
        
        res.json({ message: 'Contribution approved and questions created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error approving contribution' });
    }
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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check for Default Admin
        const isAdmin = email === 'chethansg4@gmail.com';

        const newUser = new User({
            id: Date.now().toString(),
            email,
            password: hashedPassword, 
            name,
            isPremium: false,
            isAdmin
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
        
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user has a password (might be Google-only user)
        if (!user.password) {
            return res.status(401).json({ message: 'Please sign in with Google' });
        }

        // Compare password with hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('❌ Password mismatch');
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
            // Check for Default Admin
            const isAdmin = email === 'chethansg4@gmail.com';
            
            user = new User({
                id: Date.now().toString(),
                email,
                name,
                googleId,
                isPremium: false,
                isAdmin
            });
            await user.save();
        } else {
            console.log('✅ Existing user found for Google Auth');
            // Ensure Chethan is admin if account existed before rule
            if (email === 'chethansg4@gmail.com' && !user.isAdmin) {
                user.isAdmin = true;
                await user.save();
            }
            
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
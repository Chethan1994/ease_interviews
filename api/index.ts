import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';
import User from '../backend/models/User';
import Contribution from '../backend/models/Contribution';
import Question from '../backend/models/Question';

const app = express();

// Allow CORS
app.use(cors() as any);
app.use(bodyParser.json() as any);

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 } 
});

// --- MongoDB Connection Management for Serverless ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Vercel-Admin-ease-interview-db:srRODOaoHwMOtY24@ease-interview-db.rfn442u.mongodb.net/interview-prep?retryWrites=true&w=majority';

// Global cache to prevent multiple connections in serverless environment
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log(`Connecting to MongoDB...`);
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('✅ New MongoDB Connection Established');
      return mongoose;
    }).catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// --- Routes ---

app.get('/api/health', async (req: any, res: any) => {
    try {
        await connectToDatabase();
        res.json({ status: 'ok', db: 'connected' });
    } catch (e: any) {
        res.status(500).json({ status: 'error', error: e.message });
    }
});

// Get Questions (DB)
app.get('/api/questions', async (req: any, res: any) => {
    try {
        await connectToDatabase();
        const questions = await Question.find({});
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

// Promote to Admin
app.post('/api/admin/promote', async (req: any, res: any) => {
    try {
        await connectToDatabase();
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
        await connectToDatabase();
        const contributions = await Contribution.find({ status: 'pending' }).sort({ submittedAt: -1 });
        res.json(contributions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching contributions' });
    }
});

// Update Contribution Data
app.put('/api/admin/contributions/:id', async (req: any, res: any) => {
    try {
        await connectToDatabase();
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
        await connectToDatabase();
        await Contribution.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contribution deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contribution' });
    }
});

// Approve Contribution
app.post('/api/admin/contributions/:id/approve', async (req: any, res: any) => {
    try {
        await connectToDatabase();
        const contribution = await Contribution.findById(req.params.id);
        if (!contribution) return res.status(404).json({ message: 'Contribution not found' });

        if (contribution.type === 'single') {
            const qData = contribution.data;
            const newQuestion = new Question({
                id: Date.now().toString(),
                category: qData.category,
                difficulty: qData.difficulty,
                question: qData.question,
                answer: qData.answer,
                codeSnippet: qData.codeSnippet
            });
            await newQuestion.save();
        } 
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
        
        res.json({ message: 'Contribution approved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error approving contribution' });
    }
});

interface MulterRequest extends Request {
    file?: any;
    body: any;
}

// Contribute Endpoint (No Email)
app.post('/api/contribute', upload.single('file') as any, async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
        
        const { type } = req.body;
        const file = req.file;

        let dbData: any = {};

        if (type === 'multiple') {
            const questions = JSON.parse(req.body.questions || '[]');
            dbData = { questions };
        } else if (type === 'single') {
            const { category, difficulty, question, answer, codeSnippet } = req.body;
            dbData = { category, difficulty, question, answer, codeSnippet };
        } else {
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

        // Save to DB
        const newContribution = new Contribution({
            type,
            data: dbData,
            status: 'pending'
        });
        await newContribution.save();

        res.json({ message: 'Contribution submitted successfully' });

    } catch (error: any) {
        console.error('Contribution Error:', error);
        res.status(500).json({ message: 'Failed to submit contribution. ' + error.message });
    }
});

// Register
app.post('/api/register', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
        const { email, password, name } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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

        const userObj = newUser.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;
        
        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login
app.post('/api/login', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if (!user.password) {
             return res.status(401).json({ message: 'Please sign in with Google' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userObj = user.toObject();
        // @ts-ignore
        delete userObj.password;
        // @ts-ignore
        delete userObj._id;

        res.json(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Google Auth
app.post('/api/auth/google', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
        const { email, name, googleId } = req.body;
        
        let user = await User.findOne({ email });
        
        if (!user) {
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
            // Check for default admin logic on login for existing users
            if (email === 'chethansg4@gmail.com' && !user.isAdmin) {
                user.isAdmin = true;
                await user.save();
            }
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
        console.error('Google Auth Error:', err);
        res.status(500).json({ message: 'Server error during Google authentication' });
    }
});

// Mark Mastered
app.post('/api/user/progress/mastered', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
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
        console.error(err);
        res.status(500).json({ message: 'Error updating mastery' });
    }
});

// Mark Reviewed
app.post('/api/user/progress/reviewed', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
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
        console.error(err);
        res.status(500).json({ message: 'Error updating progress' });
    }
});

// Process Payment
app.post('/api/payment/success', async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
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
        console.error(err);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

export default app;
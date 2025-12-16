import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import mongoose from 'mongoose';
import { Buffer } from 'buffer';
import User from '../backend/models/User';
import Contribution from '../backend/models/Contribution';

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

// --- Email Configuration ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'chethansg4@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here' 
    }
});

// --- Routes ---

app.get('/api/health', async (req: any, res: any) => {
    try {
        await connectToDatabase();
        res.json({ status: 'ok', db: 'connected' });
    } catch (e: any) {
        res.status(500).json({ status: 'error', error: e.message });
    }
});

interface MulterRequest extends Request {
    file?: any;
    body: any;
}

// Contribute Endpoint
app.post('/api/contribute', upload.single('file') as any, async (req: any, res: any): Promise<any> => {
    try {
        await connectToDatabase();
        
        const { type } = req.body;
        const file = req.file;

        let subject = '';
        let textContent = '';
        let attachments: { filename: string; content: Buffer }[] = [];
        let dbData: any = {};

        if (type === 'multiple') {
            const questions = JSON.parse(req.body.questions || '[]');
            dbData = { questions };
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
            subject = 'Bulk Contribution Upload';
            textContent = `A bulk file upload has been submitted. See attachment.`;
            
            if (file) {
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

        // Save to DB
        const newContribution = new Contribution({
            type,
            data: dbData,
            status: 'pending'
        });
        await newContribution.save();

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
            res.json({ message: 'Contribution submitted successfully (Saved to DB)' });
        }

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

        const newUser = new User({
            id: Date.now().toString(),
            email,
            password, 
            name,
            isPremium: false
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
        const user = await User.findOne({ email, password });

        if (!user) {
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
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Allow CORS from anywhere for the demo
app.use(cors());
app.use(bodyParser.json());

// --- In-Memory Database for Vercel ---
// Vercel Serverless functions are ephemeral and read-only.
// We cannot write to 'database.json' permanently. 
// Using in-memory storage means data persists only while the lambda is warm.
const db = {
    users: []
};

// --- Routes ---

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', users: db.users.length });
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
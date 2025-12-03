const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(bodyParser.json());

// --- Database Helper ---
const getDb = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
};

const saveDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- Routes ---

// Register
app.post('/api/register', (req, res) => {
    const { email, password, name } = req.body;
    const db = getDb();
    
    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, hash this!
        name,
        isPremium: false,
        masteredIds: []
    };

    db.users.push(newUser);
    saveDb(db);

    const { password: _, ...userWithoutPass } = newUser;
    res.json(userWithoutPass);
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = getDb();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Update Progress (Mastered Questions)
app.post('/api/user/progress', (req, res) => {
    const { userId, masteredId } = req.body;
    const db = getDb();
    const userIndex = db.users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const user = db.users[userIndex];
    if (!user.masteredIds.includes(masteredId)) {
        user.masteredIds.push(masteredId);
        saveDb(db);
    }

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Process Payment
app.post('/api/payment/success', (req, res) => {
    const { userId } = req.body;
    const db = getDb();
    const userIndex = db.users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    db.users[userIndex].isPremium = true;
    saveDb(db);

    const { password: _, ...userWithoutPass } = db.users[userIndex];
    res.json(userWithoutPass);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    // Initialize DB if needed
    getDb();
});

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // We keep a custom 'id' field to maintain compatibility with the existing frontend logic
    // which expects a string ID (generated via Date.now()), rather than Mongo's ObjectId.
    id: { type: String, required: true, unique: true }, 
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In production, this should be hashed!
    name: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    
    // Arrays of strings to store Question IDs
    masteredIds: { type: [String], default: [] },
    reviewedIds: { type: [String], default: [] }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);

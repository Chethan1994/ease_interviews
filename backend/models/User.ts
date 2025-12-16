import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  isPremium: boolean;
  isAdmin: boolean;
  masteredIds: string[];
  reviewedIds: string[];
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Optional for Google Auth users
    name: { type: String, required: true },
    googleId: { type: String },
    isPremium: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    masteredIds: { type: [String], default: [] },
    reviewedIds: { type: [String], default: [] }
}, { 
    timestamps: true 
});

export default mongoose.model<IUser>('User', UserSchema);
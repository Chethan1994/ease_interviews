import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  name: string;
  isPremium: boolean;
  masteredIds: string[];
  reviewedIds: string[];
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    masteredIds: { type: [String], default: [] },
    reviewedIds: { type: [String], default: [] }
}, { 
    timestamps: true 
});

export default mongoose.model<IUser>('User', UserSchema);
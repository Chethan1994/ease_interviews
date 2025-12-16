import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  type: 'single' | 'multiple' | 'bulk';
  data: any; // Stores the question object, array of questions, or file metadata
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

const ContributionSchema: Schema = new Schema({
    type: { type: String, required: true, enum: ['single', 'multiple', 'bulk'] },
    data: { type: Schema.Types.Mixed, required: true }, 
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
}, { 
    timestamps: { createdAt: 'submittedAt', updatedAt: false } 
});

export default mongoose.model<IContribution>('Contribution', ContributionSchema);
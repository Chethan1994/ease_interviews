import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  imageUrl?: string;
}

const QuestionSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    codeSnippet: { type: String },
    imageUrl: { type: String }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
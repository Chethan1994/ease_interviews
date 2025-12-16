

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum Category {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  React = 'React',
  NextJS = 'Next.js',
  NodeJS = 'Node.js',
  HTML = 'HTML',
  CSS = 'CSS'
}

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  answer: string;
  codeSnippet?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  isAdmin?: boolean;
  googleId?: string;
  masteredIds: string[];
  reviewedIds: string[];
}

export interface UserProgress {
  masteredIds: string[];
  reviewedIds: string[];
  isPremium: boolean;
}

export interface CodingChallenge {
  id: string;
  category: Category;
  title: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  solutionCode: string;
  tags: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
}

export type ViewState = 'dashboard' | 'browse' | 'study' | 'ai-quiz' | 'coding-challenges' | 'auth';

export interface Contribution {
    _id: string;
    type: 'single' | 'multiple' | 'bulk';
    data: any;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}
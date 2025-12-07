
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum Category {
  React = 'React',
  NextJS = 'Next.js',
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
  NodeJS = 'Node.js',
  CSS = 'CSS',
  HTML = 'HTML'
}

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  answer: string;
  codeSnippet?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  masteredIds: string[];
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
}

export type ViewState = 'dashboard' | 'browse' | 'study' | 'ai-quiz' | 'coding-challenges' | 'auth';
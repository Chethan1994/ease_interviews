
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum Category {
  React = 'React',
  JavaScript = 'JavaScript',
  CSS = 'CSS',
  SystemDesign = 'System Design',
  Behavioral = 'Behavioral',
  HTML = 'HTML'
}

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  answer: string; // Markdown supported
  codeSnippet?: string;
}

export interface UserProgress {
  masteredIds: string[];
  reviewedIds: string[]; // Questions seen but not mastered
  isPremium: boolean; // Tracks if user has paid
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  solutionCode: string;
  tags: string[];
}

export type ViewState = 'dashboard' | 'browse' | 'study' | 'ai-quiz' | 'coding-challenges';

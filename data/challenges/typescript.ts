import { CodingChallenge, Difficulty, Category } from '../../types';

export const TS_CHALLENGES: CodingChallenge[] = [
  {
      id: 'ts-1',
      category: Category.TypeScript,
      title: 'Implement Partial',
      difficulty: Difficulty.Medium,
      description: 'Implement your own version of the `Partial<T>` utility type.',
      tags: ['Utility Types', 'Mapped Types'],
      starterCode: `// Implement MyPartial<T>\ntype MyPartial<T> = any;\n\ninterface User { name: string; age: number; }\nconst u: MyPartial<User> = { name: 'John' }; // Should not error`,
      solutionCode: `// Mapped type iterating over keys of T and making them optional\ntype MyPartial<T> = {\n  [P in keyof T]?: T[P];\n};\n\n// Usage:\ninterface User { name: string; age: number; }\nconst u: MyPartial<User> = { name: 'John' };`
  },
  {
      id: 'ts-2',
      category: Category.TypeScript,
      title: 'Implement Pick',
      difficulty: Difficulty.Medium,
      description: 'Implement your own version of the `Pick<T, K>` utility type.',
      tags: ['Utility Types', 'Mapped Types'],
      starterCode: `// Implement MyPick<T, K>\ntype MyPick<T, K extends keyof T> = any;\n\ninterface User { name: string; age: number; email: string; }\ntype NameOnly = MyPick<User, 'name'>;`,
      solutionCode: `type MyPick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};\n\ninterface User { name: string; age: number; email: string; }\ntype NameOnly = MyPick<User, 'name'>; // { name: string }`
  },
  {
      id: 'ts-3',
      category: Category.TypeScript,
      title: 'Tuple to Union',
      difficulty: Difficulty.Easy,
      description: 'Convert a tuple type to a union type of its values.',
      tags: ['Tuples', 'Unions'],
      starterCode: `type TupleToUnion<T extends any[]> = any;\n\ntype T = [1, 2, '3'];\ntype U = TupleToUnion<T>; // 1 | 2 | '3'`,
      solutionCode: `type TupleToUnion<T extends any[]> = T[number];\n\ntype T = [1, 2, '3'];\ntype U = TupleToUnion<T>; // Expected: 1 | 2 | '3'`
  },
  {
      id: 'ts-4',
      category: Category.TypeScript,
      title: 'Deep Readonly',
      difficulty: Difficulty.Hard,
      description: 'Create a type that makes all properties of an object (and its nested objects) readonly.',
      tags: ['Recursion', 'Modifiers'],
      starterCode: `type DeepReadonly<T> = any;\n\ninterface User { profile: { name: string } }\nconst u: DeepReadonly<User>;\n// u.profile.name = 'Jane'; // Should Error`,
      solutionCode: `type DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\n\ninterface User { profile: { name: string } }\nconst u: DeepReadonly<User> = { profile: { name: 'John' } };\n// u.profile.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property.`
  }
];
import { CodingChallenge } from '../types';
import { JS_CHALLENGES } from './challenges/javascript';
import { REACT_CHALLENGES } from './challenges/react';
import { NODE_CHALLENGES } from './challenges/nodejs';
import { NEXT_CHALLENGES } from './challenges/nextjs';
import { TS_CHALLENGES } from './challenges/typescript';
import { CSS_CHALLENGES } from './challenges/css';

export const CODING_CHALLENGES: CodingChallenge[] = [
  ...JS_CHALLENGES,
  ...REACT_CHALLENGES,
  ...NODE_CHALLENGES,
  ...NEXT_CHALLENGES,
  ...TS_CHALLENGES,
  ...CSS_CHALLENGES
];

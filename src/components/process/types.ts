
import { ReactNode } from 'react';

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface StepDetail {
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  details: StepDetail[];
  keyTerms: KeyTerm[];
}

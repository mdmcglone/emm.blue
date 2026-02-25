import { ReactNode } from "react";

export interface ChevronLabels {
  up?: string;
  down?: string;
  left?: string;
  right?: string;
}

export interface CellConfig {
  content: ReactNode;
  chevronLabels?: ChevronLabels;
}

export type Position = { x: number; y: number };

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
  imagePaths?: string[]; // Base paths for images in this cell (e.g., ["/photos/chair", "/photos/binocularts"])
  // Optional override for how this cell is labeled on the map,
  // independent from chevron-based inferred labels.
  mapTitle?: string;
}

export type Position = { x: number; y: number };

import { CellConfig } from "./types";

import { Cell_0_0 } from "./Cell_0_0";
import { Cell_1_0 } from "./Cell_1_0";
import { Cell_2_0 } from "./Cell_2_0";
import { Cell_3_0 } from "./Cell_3_0";
import { Cell_4_0 } from "./Cell_4_0";

import { Cell_0_1 } from "./Cell_0_1";
import { Cell_1_1 } from "./Cell_1_1";
import { Cell_2_1 } from "./Cell_2_1";
import { Cell_3_1 } from "./Cell_3_1";
import { Cell_4_1 } from "./Cell_4_1";

import { Cell_0_2 } from "./Cell_0_2";
import { Cell_1_2 } from "./Cell_1_2";
import { Cell_2_2 } from "./Cell_2_2";
import { Cell_3_2 } from "./Cell_3_2";
import { Cell_4_2 } from "./Cell_4_2";

import { Cell_0_3 } from "./Cell_0_3";
import { Cell_1_3 } from "./Cell_1_3";
import { Cell_2_3 } from "./Cell_2_3";
import { Cell_3_3 } from "./Cell_3_3";
import { Cell_4_3 } from "./Cell_4_3";

import { Cell_0_4 } from "./Cell_0_4";
import { Cell_1_4 } from "./Cell_1_4";
import { Cell_2_4 } from "./Cell_2_4";
import { Cell_3_4 } from "./Cell_3_4";
import { Cell_4_4 } from "./Cell_4_4";

export const GRID_SIZE = 5;

// Grid indexed as [y][x] for row-major access
export const cellGrid: CellConfig[][] = [
  [Cell_0_0, Cell_1_0, Cell_2_0, Cell_3_0, Cell_4_0],
  [Cell_0_1, Cell_1_1, Cell_2_1, Cell_3_1, Cell_4_1],
  [Cell_0_2, Cell_1_2, Cell_2_2, Cell_3_2, Cell_4_2],
  [Cell_0_3, Cell_1_3, Cell_2_3, Cell_3_3, Cell_4_3],
  [Cell_0_4, Cell_1_4, Cell_2_4, Cell_3_4, Cell_4_4],
];

export function getCell(x: number, y: number): CellConfig {
  return cellGrid[y][x];
}

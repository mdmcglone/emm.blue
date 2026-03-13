import { CellConfig } from "./types";

export const GRID_SIZE = 5;

// Lazy load cells to reduce initial bundle size
const cellLoaders: Array<Array<() => Promise<CellConfig>>> = [
  [
    () => import("./Cell_0_0").then((m) => m.Cell_0_0),
    () => import("./Cell_1_0").then((m) => m.Cell_1_0),
    () => import("./Cell_2_0").then((m) => m.Cell_2_0),
    () => import("./Cell_3_0").then((m) => m.Cell_3_0),
    () => import("./Cell_4_0").then((m) => m.Cell_4_0),
  ],
  [
    () => import("./Cell_0_1").then((m) => m.Cell_0_1),
    () => import("./Cell_1_1").then((m) => m.Cell_1_1),
    () => import("./Cell_2_1").then((m) => m.Cell_2_1),
    () => import("./Cell_3_1").then((m) => m.Cell_3_1),
    () => import("./Cell_4_1").then((m) => m.Cell_4_1),
  ],
  [
    () => import("./Cell_0_2").then((m) => m.Cell_0_2),
    () => import("./Cell_1_2").then((m) => m.Cell_1_2),
    () => import("./Cell_2_2").then((m) => m.Cell_2_2),
    () => import("./Cell_3_2").then((m) => m.Cell_3_2),
    () => import("./Cell_4_2").then((m) => m.Cell_4_2),
  ],
  [
    () => import("./Cell_0_3").then((m) => m.Cell_0_3),
    () => import("./Cell_1_3").then((m) => m.Cell_1_3),
    () => import("./Cell_2_3").then((m) => m.Cell_2_3),
    () => import("./Cell_3_3").then((m) => m.Cell_3_3),
    () => import("./Cell_4_3").then((m) => m.Cell_4_3),
  ],
  [
    () => import("./Cell_0_4").then((m) => m.Cell_0_4),
    () => import("./Cell_1_4").then((m) => m.Cell_1_4),
    () => import("./Cell_2_4").then((m) => m.Cell_2_4),
    () => import("./Cell_3_4").then((m) => m.Cell_3_4),
    () => import("./Cell_4_4").then((m) => m.Cell_4_4),
  ],
];

// Cache loaded cells
const cellCache = new Map<string, CellConfig>();

export async function getCell(x: number, y: number): Promise<CellConfig> {
  const key = `${x},${y}`;
  if (cellCache.has(key)) {
    return cellCache.get(key)!;
  }
  const loader = cellLoaders[y][x];
  const cell = await loader();
  cellCache.set(key, cell);
  return cell;
}

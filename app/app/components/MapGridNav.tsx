"use client";

import { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { GRID_SIZE, getCell } from "../cells";
import { glassStyle } from "./GlassBubble";

type Position = { x: number; y: number };

interface MapGridNavProps {
  isOpen: boolean;
  currentPosition: Position;
  onToggle: () => void;
  onClose: () => void;
  onSelectCell: (position: Position) => void;
}

const DIRECTION_DELTAS: Record<"up" | "down" | "left" | "right", { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

async function deriveCellTitles(): Promise<string[][]> {
  const titles = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => ""));

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      try {
        const cell = await getCell(x, y);
        const labels = cell?.chevronLabels;
        if (!labels) continue;
        for (const direction of Object.keys(DIRECTION_DELTAS) as Array<keyof typeof DIRECTION_DELTAS>) {
          const label = labels[direction];
          if (!label) continue;
          const nextX = x + DIRECTION_DELTAS[direction].dx;
          const nextY = y + DIRECTION_DELTAS[direction].dy;
          if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) continue;
          if (!titles[nextY][nextX]) titles[nextY][nextX] = label;
        }
      } catch {
        // Skip if cell fails to load
      }
    }
  }

  titles[2][2] = titles[2][2] || "Home";
  return titles;
}

export function MapGridNav({ isOpen, currentPosition, onToggle, onClose, onSelectCell }: MapGridNavProps) {
  const [hoveredCellKey, setHoveredCellKey] = useState<string | null>(null);
  const [titles, setTitles] = useState<string[][]>(() => 
    Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => ""))
  );

  useEffect(() => {
    if (isOpen) {
      deriveCellTitles().then(setTitles);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 lg:p-3 rounded-full opacity-80 hover:opacity-100 transition-opacity min-w-[2.5rem] min-h-[2.5rem] lg:min-w-[3rem] lg:min-h-[3rem]"
        style={{ 
          ...glassStyle, 
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
        aria-label="Open map"
      >
        <Icon icon="mdi:map-outline" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </button>

      <div
        className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={onClose}
        style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
      >
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <div
            className={`p-2.5 sm:p-3 transition-opacity duration-450 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
            onClick={(event) => event.stopPropagation()}
            style={{
              ...glassStyle,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {Array.from({ length: GRID_SIZE }).map((_, y) =>
              Array.from({ length: GRID_SIZE }).map((__, x) => {
                const key = `${x}-${y}`;
                const isCurrent = currentPosition.x === x && currentPosition.y === y;
                const isHovered = hoveredCellKey === key;
                const label = titles[y][x];
                return (
                  <button
                    key={key}
                    type="button"
                    onMouseEnter={() => setHoveredCellKey(key)}
                    onMouseLeave={() => setHoveredCellKey((prev) => (prev === key ? null : prev))}
                    onClick={() => onSelectCell({ x, y })}
                    className="w-[3.7rem] h-[3.7rem] sm:w-[4.1rem] sm:h-[4.1rem] md:w-[4.6rem] md:h-[4.6rem] p-1 text-[10px] sm:text-[11px] md:text-xs leading-tight text-center text-white/95 transition-colors"
                    style={{
                      ...glassStyle,
                      borderRadius: 0,
                      background: "transparent",
                      border: `1px solid ${isCurrent || isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)"}`,
                      boxShadow: isCurrent || isHovered ? "0 0 0 1px rgba(255,255,255,0.15)" : glassStyle.boxShadow,
                    }}
                    aria-label={label ? `Go to ${label}` : `Go to cell ${x + 1}-${y + 1}`}
                  >
                    {label}
                  </button>
                );
              }),
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


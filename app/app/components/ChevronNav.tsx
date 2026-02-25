import { glassStyle } from "./GlassBubble";
import { ChevronLabels } from "../cells/types";

interface ChevronNavProps {
  canGoUp: boolean;
  canGoDown: boolean;
  canGoLeft: boolean;
  canGoRight: boolean;
  labels?: ChevronLabels;
  onMove: (dx: number, dy: number) => void;
}

const ChevronIcon = ({ direction, className = "" }: { direction: "up" | "down" | "left" | "right"; className?: string }) => {
  const points = {
    up: "18 15 12 9 6 15",
    down: "6 9 12 15 18 9",
    left: "15 18 9 12 15 6",
    right: "9 18 15 12 9 6",
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${className}`}
    >
      <polyline points={points[direction]} />
    </svg>
  );
};

export function ChevronNav({ canGoUp, canGoDown, canGoLeft, canGoRight, labels = {}, onMove }: ChevronNavProps) {
  return (
    <>
      {canGoUp && (
        <button
          onClick={() => onMove(0, -1)}
          className="fixed top-0 left-1/2 -translate-x-1/2 p-2 lg:p-3 rounded-b-full opacity-70 hover:opacity-100 transition-opacity flex flex-col items-center"
          style={glassStyle}
          aria-label={labels.up || "Go up"}
        >
          <ChevronIcon direction="up" />
          {labels.up && <span className="text-xs md:text-sm font-medium">{labels.up}</span>}
        </button>
      )}

      {canGoDown && (
        <button
          onClick={() => onMove(0, 1)}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 p-2 lg:p-3 rounded-t-full opacity-70 hover:opacity-100 transition-opacity flex flex-col items-center"
          style={glassStyle}
          aria-label={labels.down || "Go down"}
        >
          {labels.down && <span className="text-xs md:text-sm font-medium">{labels.down}</span>}
          <ChevronIcon direction="down" />
        </button>
      )}

      {canGoLeft && (
        <button
          onClick={() => onMove(-1, 0)}
          className="fixed left-0 top-1/2 -translate-y-1/2 p-2 lg:p-3 rounded-r-full opacity-70 hover:opacity-100 transition-opacity flex items-center"
          style={glassStyle}
          aria-label={labels.left || "Go left"}
        >
          <ChevronIcon direction="left" />
          {labels.left && <span className="text-xs md:text-sm font-medium">{labels.left}</span>}
        </button>
      )}

      {canGoRight && (
        <button
          onClick={() => onMove(1, 0)}
          className="fixed right-0 top-1/2 -translate-y-1/2 p-2 lg:p-3 rounded-l-full opacity-70 hover:opacity-100 transition-opacity flex items-center"
          style={glassStyle}
          aria-label={labels.right || "Go right"}
        >
          {labels.right && <span className="text-xs md:text-sm font-medium">{labels.right}</span>}
          <ChevronIcon direction="right" />
        </button>
      )}
    </>
  );
}

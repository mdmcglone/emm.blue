import { glassStyle } from "./GlassBubble";
import { ChevronLabels } from "../cells/types";
import { useEffect, useCallback } from "react";
import { useNavigation } from "./NavigationContext";

interface ChevronNavProps {
  canGoUp: boolean;
  canGoDown: boolean;
  canGoLeft: boolean;
  canGoRight: boolean;
  labels?: ChevronLabels;
  onMove: (dx: number, dy: number) => void;
  enableFadeOut?: boolean;
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

export function ChevronNav({ canGoUp, canGoDown, canGoLeft, canGoRight, labels = {}, onMove, enableFadeOut = true }: ChevronNavProps) {
  const { triggerFadeOut } = useNavigation();

  const handleMove = useCallback((dx: number, dy: number) => {
    if (enableFadeOut) {
      triggerFadeOut();
    }
    onMove(dx, dy);
  }, [enableFadeOut, triggerFadeOut, onMove]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && canGoUp) {
        e.preventDefault();
        handleMove(0, -1);
      } else if (e.key === "ArrowDown" && canGoDown) {
        e.preventDefault();
        handleMove(0, 1);
      } else if (e.key === "ArrowLeft" && canGoLeft) {
        e.preventDefault();
        handleMove(-1, 0);
      } else if (e.key === "ArrowRight" && canGoRight) {
        e.preventDefault();
        handleMove(1, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoUp, canGoDown, canGoLeft, canGoRight, handleMove]);

  return (
    <>
      {canGoUp && (
        <button
          onClick={() => handleMove(0, -1)}
          className="fixed top-0 left-1/2 -translate-x-1/2 pt-2 pb-3 px-3 lg:pt-2 lg:pb-3 lg:px-3 rounded-b-full opacity-100 hover:opacity-100 transition-opacity flex flex-col items-center"
          style={glassStyle}
          aria-label={labels.up || "Go up"}
        >
          <ChevronIcon direction="up" />
          {labels.up && (
            <span
              className="text-xs md:text-sm font-medium"
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {labels.up}
            </span>
          )}
        </button>
      )}

      {canGoDown && (
        <button
          onClick={() => handleMove(0, 1)}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 pt-3 pb-2 px-3 lg:pt-3 lg:pb-2 lg:px-3 rounded-t-full opacity-100 hover:opacity-100 transition-opacity flex flex-col items-center"
          style={glassStyle}
          aria-label={labels.down || "Go down"}
        >
          {labels.down && (
            <span
              className="text-xs md:text-sm font-medium"
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {labels.down}
            </span>
          )}
          <ChevronIcon direction="down" />
        </button>
      )}

      {canGoLeft && (
        <button
          onClick={() => handleMove(-1, 0)}
          className="fixed left-0 top-1/2 -translate-y-1/2 py-3 pr-3 pl-2 lg:py-3 lg:pr-3 lg:pl-2 rounded-r-full opacity-100 hover:opacity-100 transition-opacity flex flex-col items-center gap-1"
          style={glassStyle}
          aria-label={labels.left || "Go left"}
        >
          {labels.left && (
            <span
              className="text-xs md:text-sm font-medium"
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {labels.left}
            </span>
          )}
          <ChevronIcon direction="left" />
        </button>
      )}

      {canGoRight && (
        <button
          onClick={() => handleMove(1, 0)}
          className="fixed right-0 top-1/2 -translate-y-1/2 py-3 pl-3 pr-2 lg:py-3 lg:pl-3 lg:pr-2 rounded-l-full opacity-100 hover:opacity-100 transition-opacity flex flex-col items-center gap-1"
          style={glassStyle}
          aria-label={labels.right || "Go right"}
        >
          {labels.right && (
            <span
              className="text-xs md:text-sm font-medium"
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {labels.right}
            </span>
          )}
          <ChevronIcon direction="right" />
        </button>
      )}
    </>
  );
}

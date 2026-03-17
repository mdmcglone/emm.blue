import { glassStyle } from "./GlassBubble";
import { ChevronLabels } from "../cells/types";
import { useEffect, useCallback, ReactNode, useState, useRef } from "react";
import { useNavigation } from "./NavigationContext";

interface ChevronNavProps {
  canGoUp: boolean;
  canGoDown: boolean;
  canGoLeft: boolean;
  canGoRight: boolean;
  labels?: ChevronLabels;
  onMove: (dx: number, dy: number) => void;
  enableFadeOut?: boolean;
  statsContent?: ReactNode;
}

type AnimationPhase = "idle" | "fading-out" | "resizing" | "fading-in";

const LABEL_FADE_DURATION = 260; // ms
const RESIZE_DURATION = 220; // ms

const useAnimatedLabels = (labels: ChevronLabels | undefined) => {
  const [displayLabels, setDisplayLabels] = useState<ChevronLabels | undefined>(labels);
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const timeoutsRef = useRef<number[]>([]);
  const prevLabelsRef = useRef<ChevronLabels | undefined>(labels);

  useEffect(() => {
    const prev = prevLabelsRef.current;
    const next = labels;
    // Deep-compare via stringify – labels object is tiny
    const same = JSON.stringify(prev) === JSON.stringify(next);
    if (same) return;

    prevLabelsRef.current = next;

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // New labels are ready: show them immediately and fade in.
    setDisplayLabels(next);
    setPhase("fading-in");

    const doneTimeout = window.setTimeout(() => {
      setPhase("idle");
    }, LABEL_FADE_DURATION);

    timeoutsRef.current.push(doneTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [labels]);

  const triggerImmediateFadeOut = () => {
    // Just start fading out immediately; the labels-change effect
    // will own the timing of the full cycle.
    setPhase("fading-out");
  };

  return { displayLabels, phase, triggerImmediateFadeOut };
};

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

export function ChevronNav({ canGoUp, canGoDown, canGoLeft, canGoRight, labels = {}, onMove, enableFadeOut = true, statsContent }: ChevronNavProps) {
  const { triggerFadeOut } = useNavigation();
  const { displayLabels, phase, triggerImmediateFadeOut } = useAnimatedLabels(labels);

  const labelOpacityClass = phase === "fading-out" || phase === "resizing" ? "opacity-0" : "opacity-100";
  const tabOpacityClass = phase === "fading-out" || phase === "resizing" ? "opacity-0" : "opacity-100";

  const handleMove = useCallback((dx: number, dy: number) => {
    triggerImmediateFadeOut();
    if (enableFadeOut) {
      triggerFadeOut();
    }
    onMove(dx, dy);
  }, [enableFadeOut, triggerFadeOut, onMove, triggerImmediateFadeOut]);

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
        <>
          <button
            onClick={() => handleMove(0, -1)}
            className={`fixed top-0 left-1/2 -translate-x-1/2 pt-2 pb-3 px-3 lg:pt-2 lg:pb-3 lg:px-3 rounded-b-full hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center ${tabOpacityClass}`}
            style={glassStyle}
            aria-label={displayLabels?.up || "Go up"}
          >
            <ChevronIcon direction="up" />
            {displayLabels?.up && (
              <span
                className={`text-xs md:text-sm font-medium transition-opacity duration-200 ${labelOpacityClass}`}
                style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
              >
                {displayLabels.up}
              </span>
            )}
          </button>
          {statsContent && (
            <div className="fixed top-16 left-0 right-0 w-full px-3 text-center text-white text-sm font-medium md:hidden [font-family:Inter,system-ui,-apple-system,sans-serif] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {statsContent}
            </div>
          )}
        </>
      )}

      {canGoDown && (
        <button
          onClick={() => handleMove(0, 1)}
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 pt-3 pb-2 px-3 lg:pt-3 lg:pb-2 lg:px-3 rounded-t-full hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center ${tabOpacityClass}`}
          style={glassStyle}
          aria-label={displayLabels?.down || "Go down"}
        >
          {displayLabels?.down && (
            <span
              className={`text-xs md:text-sm font-medium transition-opacity duration-200 ${labelOpacityClass}`}
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {displayLabels.down}
            </span>
          )}
          <ChevronIcon direction="down" />
        </button>
      )}

      {canGoLeft && (
        <button
          onClick={() => handleMove(-1, 0)}
          className={`fixed left-0 bottom-3 md:left-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 py-3 pr-3 pl-2 lg:py-3 lg:pr-3 lg:pl-2 rounded-r-full hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center gap-1 ${tabOpacityClass}`}
          style={glassStyle}
          aria-label={displayLabels?.left || "Go left"}
        >
          {displayLabels?.left && (
            <span
              className={`text-xs md:text-sm font-medium transition-opacity duration-200 ${labelOpacityClass}`}
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {displayLabels.left}
            </span>
          )}
          <ChevronIcon direction="left" />
        </button>
      )}

      {canGoRight && (
        <button
          onClick={() => handleMove(1, 0)}
          className={`fixed right-0 bottom-3 md:right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 py-3 pl-3 pr-2 lg:py-3 lg:pl-3 lg:pr-2 rounded-l-full hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center gap-1 ${tabOpacityClass}`}
          style={glassStyle}
          aria-label={displayLabels?.right || "Go right"}
        >
          {displayLabels?.right && (
            <span
              className={`text-xs md:text-sm font-medium transition-opacity duration-200 ${labelOpacityClass}`}
              style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
            >
              {displayLabels.right}
            </span>
          )}
          <ChevronIcon direction="right" />
        </button>
      )}
    </>
  );
}

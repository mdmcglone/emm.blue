import { ReactNode, CSSProperties, useLayoutEffect, useRef, useState } from "react";

export const glassStyle: CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

interface GlassBubbleProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeDurationMs?: number;
  fadeDelayMs?: number;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

export function GlassBubble({
  children,
  className = "",
  fadeIn = false,
  fadeDurationMs = 800,
  fadeDelayMs = 800,
  wrapperClassName,
  wrapperStyle,
}: GlassBubbleProps) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const hasMountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!fadeIn) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    setAnimationCycle((prev) => prev + 1);
  }, [fadeIn, children, className, wrapperClassName, fadeDurationMs, fadeDelayMs]);

  const animationName = `glassBubbleFade-${animationCycle}`;

  const baseStyle: CSSProperties = {
    ...glassStyle,
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    borderRadius: 24, // squircle-ish shape to save space
  };

  const animationStyle = fadeIn
    ? {
        animation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        WebkitAnimation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        // Ensure the bubble stays hidden during the delay period
        opacity: 0,
        // Target full opacity so text remains fully opaque when settled
        ["--glass-bubble-target-opacity" as const]: "1",
      }
    : undefined;

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <div
        className={className}
        style={fadeIn ? { ...baseStyle, ...animationStyle } : baseStyle}
      >
        {children}
      </div>
      {fadeIn && (
        <style>
          {`
            @keyframes ${animationName} {
              from {
                opacity: 0;
              }
              to {
                opacity: var(--glass-bubble-target-opacity, 1);
              }
            }
          `}
        </style>
      )}
    </div>
  );
}

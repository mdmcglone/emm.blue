import { ReactNode, CSSProperties, useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigation } from "./NavigationContext";

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
  enableFadeOut?: boolean;
  fadeOutCounterMovement?: { x: number; y: number };
}

export function GlassBubble({
  children,
  className = "",
  fadeIn = false,
  fadeDurationMs = 800,
  fadeDelayMs = 800,
  wrapperClassName,
  wrapperStyle,
  enableFadeOut = true,
  fadeOutCounterMovement: _unused,
}: GlassBubbleProps) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [fadeOutCycle, setFadeOutCycle] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasMountedRef = useRef(false);
  const { fadeOut, fadeOutCounterMovement } = useNavigation();

  useLayoutEffect(() => {
    if (!fadeIn) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    setAnimationCycle((prev) => prev + 1);
    // Reset fade-out state when new content mounts
    setIsFadingOut(false);
  }, [fadeIn, children, className, wrapperClassName, fadeDurationMs, fadeDelayMs]);

  // Trigger fade-out animation when navigation happens
  useEffect(() => {
    if (enableFadeOut && fadeOut && !isFadingOut) {
      setIsFadingOut(true);
      setFadeOutCycle((prev) => prev + 1);
    }
  }, [fadeOut, enableFadeOut, isFadingOut]);

  const animationName = `glassBubbleFade-${animationCycle}`;
  const fadeOutAnimationName = `glassBubbleFadeOut-${fadeOutCycle}`;

  const baseStyle: CSSProperties = {
    ...glassStyle,
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    borderRadius: 24, // squircle-ish shape to save space
  };

  const fadeInStyle = fadeIn && !isFadingOut
    ? {
        animation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        WebkitAnimation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        // Ensure the bubble stays hidden during the delay period
        opacity: 0,
        // Target full opacity so text remains fully opaque when settled
        ["--glass-bubble-target-opacity" as const]: "1",
      }
    : undefined;

  const fadeOutStyle = isFadingOut
    ? {
        animation: `${fadeOutAnimationName} 600ms forwards, ${fadeOutAnimationName}-move 1000ms cubic-bezier(0, 0, 0.2, 1) forwards`,
        WebkitAnimation: `${fadeOutAnimationName} 600ms forwards, ${fadeOutAnimationName}-move 1000ms cubic-bezier(0, 0, 0.2, 1) forwards`,
        opacity: 1,
      }
    : undefined;

  const animationStyle = fadeOutStyle || fadeInStyle;

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <div
        className={className}
        style={animationStyle ? { ...baseStyle, ...animationStyle } : baseStyle}
      >
        {children}
      </div>
      {fadeIn && !isFadingOut && (
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
      {isFadingOut && (
        <style>
          {`
            @keyframes ${fadeOutAnimationName} {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes ${fadeOutAnimationName}-move {
              from {
                transform: translate(0, 0);
              }
              to {
                transform: translate(${fadeOutCounterMovement.x}px, ${fadeOutCounterMovement.y}px);
              }
            }
          `}
        </style>
      )}
    </div>
  );
}

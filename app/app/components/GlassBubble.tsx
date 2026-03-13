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
  smallFont?: boolean;
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
  smallFont = false,
  wrapperClassName,
  wrapperStyle,
  enableFadeOut = true,
  fadeOutCounterMovement: _unused,
}: GlassBubbleProps) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [fadeOutCycle, setFadeOutCycle] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasMountedRef = useRef(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const { fadeOut, fadeOutCounterMovement, backgroundTinyReady } = useNavigation();

  // Use IntersectionObserver to detect when element is visible before starting fade-in
  // Also wait for page to be loaded and background tiny image to be ready
  useEffect(() => {
    if (!fadeIn || !bubbleRef.current) return;

    let observer: IntersectionObserver | null = null;

    // Wait for both page to be fully loaded AND background tiny image to be ready
    const checkReady = () => {
      if (document.readyState === 'complete' && backgroundTinyReady && bubbleRef.current && !observer) {
        // Small delay to ensure rendering is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (bubbleRef.current && !observer) {
              observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      setIsVisible(true);
                      observer?.disconnect();
                      observer = null;
                    }
                  });
                },
                { threshold: 0.01 } // Trigger when any part is visible
              );

              observer.observe(bubbleRef.current);
            }
          });
        });
      }
    };

    // Set up listener for page load
    const handleLoad = () => checkReady();

    // Check immediately if both conditions are met
    checkReady();

    // If page isn't loaded yet, wait for it
    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [fadeIn, backgroundTinyReady]);

  useLayoutEffect(() => {
    if (!fadeIn) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    // Only trigger animation cycle if element is visible
    if (isVisible) {
      setAnimationCycle((prev) => prev + 1);
      // Reset fade-out state when new content mounts
      setIsFadingOut(false);
    }
  }, [fadeIn, isVisible, children, className, wrapperClassName, fadeDurationMs, fadeDelayMs]);

  // Trigger fade-out animation when navigation happens
  useEffect(() => {
    if (enableFadeOut && fadeOut && !isFadingOut) {
      setIsFadingOut(true);
      setFadeOutCycle((prev) => prev + 1);
    }
  }, [fadeOut, enableFadeOut, isFadingOut]);

  // If navigation fade-out is reset/cancelled before remount, restore visibility.
  useEffect(() => {
    if (!fadeOut && isFadingOut) {
      setIsFadingOut(false);
    }
  }, [fadeOut, isFadingOut]);

  const animationName = `glassBubbleFade-${animationCycle}`;
  const fadeOutAnimationName = `glassBubbleFadeOut-${fadeOutCycle}`;

  const baseStyle: CSSProperties = {
    ...glassStyle,
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    ...(smallFont ? { fontSize: "clamp(0.67em, 2.8vw, 1em)" } : {}),
    borderRadius: 24, // squircle-ish shape to save space
    overflow: "hidden", // Safari clip fix for images exceeding border radius
  };

  const fadeInStyle = fadeIn && !isFadingOut && isVisible
    ? {
        animation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        WebkitAnimation: `${animationName} ${fadeDurationMs}ms forwards ${fadeDelayMs}ms`,
        // Ensure the bubble stays hidden during the delay period
        opacity: 0,
        // Target full opacity so text remains fully opaque when settled
        ["--glass-bubble-target-opacity" as const]: "1",
      }
    : fadeIn && !isVisible
      ? { opacity: 0 } // Keep hidden until visible
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
        ref={bubbleRef}
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

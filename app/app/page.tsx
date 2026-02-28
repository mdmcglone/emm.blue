"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { GRID_SIZE, getCell } from "./cells";
import { ChevronNav } from "./components/ChevronNav";
import { glassStyle } from "./components/GlassBubble";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";

interface Layout {
  containerSize: number;
  mapWidth: number;
  mapHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  maxPanX: number;
  maxPanY: number;
}

const SWIPE_THRESHOLD = 50; // minimum distance in px to trigger swipe
const HOME_INDEX = 2;

function HomeContent() {
  const [displayPosition, setDisplayPosition] = useState({ x: HOME_INDEX, y: HOME_INDEX });
  const [targetPosition, setTargetPosition] = useState({ x: HOME_INDEX, y: HOME_INDEX });
  const [layout, setLayout] = useState<Layout | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const { triggerFadeOut, fadeOut, resetFadeOut, setFadeOutCounterMovement } = useNavigation();

  // When navigation is triggered, reset fade-out after animation completes
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        resetFadeOut();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, resetFadeOut]);

  // When fade-out completes, switch to the target position
  useEffect(() => {
    if (!fadeOut && (displayPosition.x !== targetPosition.x || displayPosition.y !== targetPosition.y)) {
      setDisplayPosition(targetPosition);
    }
  }, [fadeOut, displayPosition, targetPosition]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => updateLayout(img.naturalWidth, img.naturalHeight);
    img.src = "/darkmatter.jpg";

    const handleResize = () => {
      if (img.complete && img.naturalWidth) {
        updateLayout(img.naturalWidth, img.naturalHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateLayout = (imgW: number, imgH: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const vmax = Math.max(vw, vh);
    const containerSize = 5 * vmax;

    const imgAspect = imgW / imgH;

    // With "contain", map fits within square container preserving aspect ratio
    let mapWidth: number, mapHeight: number;
    if (imgAspect > 1) {
      mapWidth = containerSize;
      mapHeight = containerSize / imgAspect;
    } else {
      mapHeight = containerSize;
      mapWidth = containerSize * imgAspect;
    }

    // Max pan from center before map edge reaches viewport edge
    const maxPanX = Math.max(0, (mapWidth - vw) / 2);
    const maxPanY = Math.max(0, (mapHeight - vh) / 2);

    setLayout({ containerSize, mapWidth, mapHeight, viewportWidth: vw, viewportHeight: vh, maxPanX, maxPanY });
  };

  const canGoUp = displayPosition.y > 0;
  const canGoDown = displayPosition.y < GRID_SIZE - 1;
  const canGoLeft = displayPosition.x > 0;
  const canGoRight = displayPosition.x < GRID_SIZE - 1;

  const currentCell = getCell(displayPosition.x, displayPosition.y);

  const move = useCallback((dx: number, dy: number) => {
    triggerFadeOut();
    setTargetPosition((p) => ({
      x: Math.max(0, Math.min(GRID_SIZE - 1, p.x + dx)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, p.y + dy)),
    }));
  }, [triggerFadeOut]);

  const goHome = useCallback(() => {
    triggerFadeOut();
    setTargetPosition({ x: HOME_INDEX, y: HOME_INDEX });
  }, [triggerFadeOut]);

  const isHome = displayPosition.x === HOME_INDEX && displayPosition.y === HOME_INDEX;

  // Touch handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if swipe is significant and which direction
    if (Math.max(absDeltaX, absDeltaY) >= SWIPE_THRESHOLD) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe - swipe left moves right, swipe right moves left
        if (deltaX < 0 && canGoRight) {
          move(1, 0);
        } else if (deltaX > 0 && canGoLeft) {
          move(-1, 0);
        }
      } else {
        // Vertical swipe - swipe up moves down, swipe down moves up
        if (deltaY < 0 && canGoDown) {
          move(0, 1);
        } else if (deltaY > 0 && canGoUp) {
          move(0, -1);
        }
      }
    }

    touchStart.current = null;
  }, [canGoUp, canGoDown, canGoLeft, canGoRight, move]);

  // Calculate pan offset for current grid position (use targetPosition for immediate pan)
  const getOffset = (): { x: number; y: number } => {
    if (!layout) return { x: 0, y: 0 };

    const { containerSize, viewportWidth, viewportHeight, maxPanX, maxPanY } = layout;

    // Step by one viewport when possible; otherwise overlap evenly.
    // This guarantees edge cells never go beyond the photo bounds.
    const centerIndex = (GRID_SIZE - 1) / 2;
    const totalIntervals = GRID_SIZE - 1;
    const availablePanX = maxPanX * 2;
    const availablePanY = maxPanY * 2;
    const desiredSpanX = totalIntervals * viewportWidth;
    const desiredSpanY = totalIntervals * viewportHeight;
    const stepX =
      totalIntervals > 0
        ? Math.min(viewportWidth, availablePanX / totalIntervals)
        : 0;
    const stepY =
      totalIntervals > 0
        ? Math.min(viewportHeight, availablePanY / totalIntervals)
        : 0;

    const rawPanX = (targetPosition.x - centerIndex) * stepX;
    const rawPanY = (targetPosition.y - centerIndex) * stepY;
    const panX = Math.max(-maxPanX, Math.min(maxPanX, rawPanX));
    const panY = Math.max(-maxPanY, Math.min(maxPanY, rawPanY));

    // Base offset to center the container in viewport
    const baseX = (viewportWidth - containerSize) / 2;
    const baseY = (viewportHeight - containerSize) / 2;

    return {
      x: baseX - panX,
      y: baseY - panY,
    };
  };

  const offset = getOffset();

  // Calculate counter-movement for bubbles to stay in place while screen pans
  const getBubbleCounterMovement = (): { x: number; y: number } => {
    if (!layout) return { x: 0, y: 0 };

    const { containerSize, viewportWidth, viewportHeight, maxPanX, maxPanY } = layout;
    const centerIndex = (GRID_SIZE - 1) / 2;
    const totalIntervals = GRID_SIZE - 1;
    const availablePanX = maxPanX * 2;
    const availablePanY = maxPanY * 2;
    const stepX =
      totalIntervals > 0
        ? Math.min(viewportWidth, availablePanX / totalIntervals)
        : 0;
    const stepY =
      totalIntervals > 0
        ? Math.min(viewportHeight, availablePanY / totalIntervals)
        : 0;

    // Calculate pan for both positions
    const displayRawPanX = (displayPosition.x - centerIndex) * stepX;
    const displayRawPanY = (displayPosition.y - centerIndex) * stepY;
    const displayPanX = Math.max(-maxPanX, Math.min(maxPanX, displayRawPanX));
    const displayPanY = Math.max(-maxPanY, Math.min(maxPanY, displayRawPanY));

    const targetRawPanX = (targetPosition.x - centerIndex) * stepX;
    const targetRawPanY = (targetPosition.y - centerIndex) * stepY;
    const targetPanX = Math.max(-maxPanX, Math.min(maxPanX, targetRawPanX));
    const targetPanY = Math.max(-maxPanY, Math.min(maxPanY, targetRawPanY));

    // The screen pans by this amount; bubbles need to move opposite
    return {
      x: -(targetPanX - displayPanX),
      y: -(targetPanY - displayPanY),
    };
  };

  const bubbleCounterMovement = useMemo(() => getBubbleCounterMovement(), [layout, displayPosition, targetPosition]);

  // Update context with counter movement when fading out
  useEffect(() => {
    if (fadeOut) {
      setFadeOutCounterMovement(bubbleCounterMovement);
    }
  }, [fadeOut, bubbleCounterMovement, setFadeOutCounterMovement]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-black touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Panning map background */}
      <div
        className="absolute"
        style={{
          width: layout ? `${layout.containerSize}px` : "500vmax",
          height: layout ? `${layout.containerSize}px` : "500vmax",
          transform: layout
            ? `translate(${offset.x}px, ${offset.y}px)`
            : `translate(calc(50vw - 250vmax), calc(50vh - 250vmax))`,
          backgroundImage: "url(/darkmatter.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "transform 1000ms cubic-bezier(0, 0, 0.2, 1)",
        }}
      />

      {/* Current cell content - fixed to viewport center */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          {currentCell.content}
        </div>
      </div>

      {/* Home button */}
      <button
        onClick={goHome}
        className="fixed top-3 left-3 p-2 lg:p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        style={{
          ...glassStyle,
          animation: !isHome
            ? `homeButtonFadeIn 800ms forwards 800ms`
            : `homeButtonFadeOut 400ms forwards`,
          WebkitAnimation: !isHome
            ? `homeButtonFadeIn 800ms forwards 800ms`
            : `homeButtonFadeOut 400ms forwards`,
          opacity: isHome ? 0 : 0, // initial opacity always 0, animation handles fade-in/out
        }}
        aria-label="Go home"
      >
        <Icon icon="mdi:home" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        <style>
          {`
            @keyframes homeButtonFadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes homeButtonFadeOut {
              from { opacity: 1; }
              to   { opacity: 0; }
            }
          `}
        </style>
      </button>


      {/* Chevron navigation */}
      <ChevronNav
        canGoUp={canGoUp}
        canGoDown={canGoDown}
        canGoLeft={canGoLeft}
        canGoRight={canGoRight}
        labels={currentCell.chevronLabels}
        onMove={move}
      />
    </div>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <HomeContent />
    </NavigationProvider>
  );
}

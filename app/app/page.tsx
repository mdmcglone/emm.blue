"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { GRID_SIZE, getCell } from "./cells";
import { ChevronNav } from "./components/ChevronNav";
import { glassStyle } from "./components/GlassBubble";

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

export default function Home() {
  const [position, setPosition] = useState({ x: 2, y: 2 });
  const [layout, setLayout] = useState<Layout | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => updateLayout(img.naturalWidth, img.naturalHeight);
    img.src = "/The-Known-World.jpg";

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

  const canGoUp = position.y > 0;
  const canGoDown = position.y < GRID_SIZE - 1;
  const canGoLeft = position.x > 0;
  const canGoRight = position.x < GRID_SIZE - 1;

  const currentCell = getCell(position.x, position.y);

  const move = useCallback((dx: number, dy: number) => {
    setPosition((p) => ({
      x: Math.max(0, Math.min(GRID_SIZE - 1, p.x + dx)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, p.y + dy)),
    }));
  }, []);

  const goHome = useCallback(() => {
    setPosition({ x: 2, y: 2 });
  }, []);

  const isHome = position.x === 2 && position.y === 2;

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

  // Calculate pan offset for current grid position
  const getOffset = (): { x: number; y: number } => {
    if (!layout) return { x: 0, y: 0 };

    const { containerSize, viewportWidth, viewportHeight, maxPanX, maxPanY } = layout;

    // Normalized position: -1 (edge) to 0 (center) to +1 (edge)
    // Position 0 → -1, Position 2 → 0, Position 4 → +1
    const normX = (position.x - 2) / 2;
    const normY = (position.y - 2) / 2;

    // Pan offset from center (clamped to max pan)
    const panX = normX * maxPanX;
    const panY = normY * maxPanY;

    // Base offset to center the container in viewport
    const baseX = (viewportWidth - containerSize) / 2;
    const baseY = (viewportHeight - containerSize) / 2;

    return {
      x: baseX - panX,
      y: baseY - panY,
    };
  };

  const offset = getOffset();

  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-black touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Panning map background */}
      <div
        className="absolute transition-transform duration-1000 ease-out"
        style={{
          width: layout ? `${layout.containerSize}px` : "500vmax",
          height: layout ? `${layout.containerSize}px` : "500vmax",
          transform: layout
            ? `translate(${offset.x}px, ${offset.y}px)`
            : `translate(calc(50vw - 250vmax), calc(50vh - 250vmax))`,
          backgroundImage: "url(/The-Known-World.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Current cell content - fixed to viewport center */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          {currentCell.content}
        </div>
      </div>

      {/* Home button */}
      {!isHome && (
        <button
          onClick={goHome}
          className="fixed top-3 left-3 p-2 lg:p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity"
          style={glassStyle}
          aria-label="Go home"
        >
          <Icon icon="mdi:home" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </button>
      )}

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

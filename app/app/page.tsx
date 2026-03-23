"use client";

import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { GRID_SIZE, getCell } from "./cells";
import { CellConfig } from "./cells/types";
import { glassStyle } from "./components/GlassBubble";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";
import { GameStatsProvider, useGameStats } from "./components/GameStatsContext";

// Lazy load components that are conditionally rendered or not immediately needed
const ChevronNav = lazy(() => import("./components/ChevronNav").then((m) => ({ default: m.ChevronNav })));
const MapGridNav = lazy(() => import("./components/MapGridNav").then((m) => ({ default: m.MapGridNav })));
const SocialsModal = lazy(() => import("./components/SocialsModal").then((m) => ({ default: m.SocialsModal })));

interface Layout {
  containerSize: number;
  mapWidth: number;
  mapHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  maxPanX: number;
  maxPanY: number;
}

interface PanMetrics {
  centerIndex: number;
  safeMaxPanX: number;
  safeMaxPanY: number;
  stepX: number;
  stepY: number;
}

const SWIPE_THRESHOLD = 50; // minimum distance in px to trigger swipe
const HOME_INDEX = 2;
const HOME_BUTTON_FADE_OUT_MS = 220;
const BACKGROUND_TINY_WEBP = "/darkmatter-tiny.webp";
const BACKGROUND_MD_WEBP = "/darkmatter-md.webp";
const BACKGROUND_LG_WEBP = "/darkmatter-lg.webp";
const BACKGROUND_JPG = "/darkmatter.jpg";

import { prefetchCellImages } from "./utils/imageCache";

// Lazy load Icon component for home button (only rendered conditionally)
const HomeButtonIcon = lazy(() => 
  import("@iconify/react").then((mod) => ({ 
    default: ({ icon, className }: { icon: string; className?: string }) => {
      const { Icon } = mod;
      return <Icon icon={icon} className={className} />;
    }
  }))
);

function HomeButton({ goHome, glassStyle, visible }: { goHome: () => void; glassStyle: React.CSSProperties; visible: boolean }) {
  const [isFadingIn, setIsFadingIn] = useState(true);

  return (
    <button
      onClick={goHome}
      onAnimationEnd={() => setIsFadingIn(false)}
      className={`p-2 lg:p-3 rounded-full hover:opacity-100 transition-opacity duration-220 min-w-[2.5rem] min-h-[2.5rem] lg:min-w-[3rem] lg:min-h-[3rem] ${visible ? "opacity-80 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      style={{
        ...glassStyle,
        animation: isFadingIn ? `homeButtonFadeIn 800ms forwards 800ms` : undefined,
        WebkitAnimation: isFadingIn ? `homeButtonFadeIn 800ms forwards 800ms` : undefined,
        opacity: isFadingIn ? 0 : undefined,
      }}
      aria-label="Go home"
    >
      <Suspense fallback={<span className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />}>
        <HomeButtonIcon icon="mdi:home" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </Suspense>
      <style>
        {`
          @keyframes homeButtonFadeIn {
            from { opacity: 0; }
            to   { opacity: 0.8; }
          }
        `}
      </style>
    </button>
  );
}

function getPanMetrics(layout: Layout): PanMetrics {
  const { viewportWidth, viewportHeight, maxPanX, maxPanY } = layout;
  const totalIntervals = GRID_SIZE - 1;
  const centerIndex = totalIntervals / 2;
  // Keep a small overlap buffer so edge cells never expose black at viewport extremes.
  const edgeGuardPx = Math.min(48, Math.max(16, Math.round(Math.min(viewportWidth, viewportHeight) * 0.04)));
  const safeMaxPanX = Math.max(0, maxPanX - edgeGuardPx);
  const safeMaxPanY = Math.max(0, maxPanY - edgeGuardPx);
  const availablePanX = safeMaxPanX * 2;
  const availablePanY = safeMaxPanY * 2;
  const stepX = totalIntervals > 0 ? Math.min(viewportWidth, availablePanX / totalIntervals) : 0;
  const stepY = totalIntervals > 0 ? Math.min(viewportHeight, availablePanY / totalIntervals) : 0;
  return { centerIndex, safeMaxPanX, safeMaxPanY, stepX, stepY };
}

function HomeContent() {
  const [displayPosition, setDisplayPosition] = useState({ x: HOME_INDEX, y: HOME_INDEX });
  const [targetPosition, setTargetPosition] = useState({ x: HOME_INDEX, y: HOME_INDEX });
  const [layout, setLayout] = useState<Layout | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const backgroundDimensionsRef = useRef<{ width: number; height: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundTinyReady, setBackgroundTinyReady] = useState(false);
  const [backgroundMdReady, setBackgroundMdReady] = useState(false);
  const [backgroundLgReady, setBackgroundLgReady] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [currentCell, setCurrentCell] = useState<CellConfig | null>(null);
  const [showHomeButton, setShowHomeButton] = useState(false);
  const { triggerFadeOut, fadeOut, resetFadeOut, setFadeOutCounterMovement, setBackgroundTinyReady: setContextBackgroundTinyReady } = useNavigation();
  const { statsContent } = useGameStats();

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
    let cancelled = false;

    const preload = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const setLayoutFromImage = (img: HTMLImageElement) => {
      backgroundDimensionsRef.current = { width: img.naturalWidth, height: img.naturalHeight };
      updateLayout(img.naturalWidth, img.naturalHeight);
    };

    // Helper to schedule a function in an idle period or next task,
    // so heavy work doesn't block a single long frame.
    const scheduleIdle = (fn: () => void) => {
      if (typeof (window as any).requestIdleCallback === "function") {
        (window as any).requestIdleCallback(() => {
          if (!cancelled) fn();
        });
      } else {
        // Fallback: next macrotask
        setTimeout(() => {
          if (!cancelled) fn();
        }, 0);
      }
    };

    const runBackgroundProgressiveLoad = async () => {
      // Step 1: tiny image as fast as possible so content can show.
      try {
        await preload(BACKGROUND_TINY_WEBP);
        if (cancelled) return;
        setBackgroundTinyReady(true);
        setContextBackgroundTinyReady(true);
      } catch {
        // If tiny fails, continue with md/lg pipeline but mark as ready anyway
        setBackgroundTinyReady(true);
        setContextBackgroundTinyReady(true);
      }

      // Step 2: medium and large images are scheduled in idle time
      scheduleIdle(() => {
        if (cancelled) return;

        const loadMdAndLg = async () => {
          try {
            const mdImg = await preload(BACKGROUND_MD_WEBP);
            if (cancelled) return;
            setLayoutFromImage(mdImg);
            setImageLoaded(true);
            setBackgroundMdReady(true);

            // Large variant (or JPG fallback) is lower priority: schedule again.
            scheduleIdle(async () => {
              if (cancelled) return;
              try {
                const lgImg = await preload(BACKGROUND_LG_WEBP);
                if (cancelled) return;
                setLayoutFromImage(lgImg);
                setBackgroundLgReady(true);
              } catch {
                const jpgImg = await preload(BACKGROUND_JPG);
                if (cancelled) return;
                setLayoutFromImage(jpgImg);
                setBackgroundLgReady(true);
              }
            });
          } catch {
            // If md fails, fall back to JPG, still scheduled away from the tiny load.
            const jpgImg = await preload(BACKGROUND_JPG);
            if (cancelled) return;
            setLayoutFromImage(jpgImg);
            setImageLoaded(true);
            setBackgroundMdReady(true);
            setBackgroundLgReady(true);
          }
        };

        loadMdAndLg();
      });
    };

    runBackgroundProgressiveLoad();

    const handleResize = () => {
      if (backgroundDimensionsRef.current) {
        updateLayout(backgroundDimensionsRef.current.width, backgroundDimensionsRef.current.height);
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
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

  // Preload neighboring cells and prefetch their images
  const preloadNeighbors = useCallback((x: number, y: number) => {
    const neighbors = [
      { x: x, y: y - 1 }, // Up
      { x: x, y: y + 1 }, // Down
      { x: x - 1, y: y }, // Left
      { x: x + 1, y: y }, // Right
    ];

    neighbors.forEach(({ x: nx, y: ny }) => {
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        // Preload cell config in background, don't await
        getCell(nx, ny)
          .then((cell) => {
            // Once cell loads, prefetch its images
            if (cell.imagePaths && cell.imagePaths.length > 0) {
              prefetchCellImages(cell.imagePaths);
            }
          })
          .catch(() => {
            // Ignore errors, cell will load when needed
          });
      }
    });
  }, []);

  // Load cell asynchronously when displayPosition changes
  useEffect(() => {
    const loadCell = async () => {
      const cell = await getCell(displayPosition.x, displayPosition.y);
      setCurrentCell(cell);
      // Preload neighbors after current cell loads
      preloadNeighbors(displayPosition.x, displayPosition.y);
    };
    loadCell();
  }, [displayPosition.x, displayPosition.y, preloadNeighbors]);

  // Load initial cell
  useEffect(() => {
    const loadInitialCell = async () => {
      const cell = await getCell(HOME_INDEX, HOME_INDEX);
      setCurrentCell(cell);
      // Preload neighbors after initial cell loads
      preloadNeighbors(HOME_INDEX, HOME_INDEX);
    };
    loadInitialCell();
  }, [preloadNeighbors]);

  const canGoUp = displayPosition.y > 0;
  const canGoDown = displayPosition.y < GRID_SIZE - 1;
  // Check mobile directly instead of maintaining state
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const canGoLeft = displayPosition.x > 0 && !(isMobile && displayPosition.x === 4 && displayPosition.y === 4);
  const canGoRight = displayPosition.x < GRID_SIZE - 1;

  const move = useCallback((dx: number, dy: number) => {
    setIsMapOpen(false);
    setIsSocialsOpen(false);
    triggerFadeOut();
    setTargetPosition((p) => ({
      x: Math.max(0, Math.min(GRID_SIZE - 1, p.x + dx)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, p.y + dy)),
    }));
  }, [triggerFadeOut]);

  const goHome = useCallback(() => {
    setIsMapOpen(false);
    setIsSocialsOpen(false);
    triggerFadeOut();
    setTargetPosition({ x: HOME_INDEX, y: HOME_INDEX });
  }, [triggerFadeOut]);

  const jumpToCell = useCallback((position: { x: number; y: number }) => {
    setIsMapOpen(false);
    setIsSocialsOpen(false);
    if (displayPosition.x === position.x && displayPosition.y === position.y) return;
    triggerFadeOut();
    setTargetPosition(position);
  }, [displayPosition.x, displayPosition.y, triggerFadeOut]);

  const isHome = displayPosition.x === HOME_INDEX && displayPosition.y === HOME_INDEX;

  useEffect(() => {
    if (!isHome) {
      setShowHomeButton(true);
      return;
    }
    const timeout = window.setTimeout(() => {
      setShowHomeButton(false);
    }, HOME_BUTTON_FADE_OUT_MS);
    return () => window.clearTimeout(timeout);
  }, [isHome]);

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

    const { containerSize, viewportWidth, viewportHeight } = layout;
    const { centerIndex, safeMaxPanX, safeMaxPanY, stepX, stepY } = getPanMetrics(layout);

    const rawPanX = (targetPosition.x - centerIndex) * stepX;
    const rawPanY = (targetPosition.y - centerIndex) * stepY;
    const panX = Math.max(-safeMaxPanX, Math.min(safeMaxPanX, rawPanX));
    const panY = Math.max(-safeMaxPanY, Math.min(safeMaxPanY, rawPanY));

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

    const { centerIndex, safeMaxPanX, safeMaxPanY, stepX, stepY } = getPanMetrics(layout);

    // Calculate pan for both positions
    const displayRawPanX = (displayPosition.x - centerIndex) * stepX;
    const displayRawPanY = (displayPosition.y - centerIndex) * stepY;
    const displayPanX = Math.max(-safeMaxPanX, Math.min(safeMaxPanX, displayRawPanX));
    const displayPanY = Math.max(-safeMaxPanY, Math.min(safeMaxPanY, displayRawPanY));

    const targetRawPanX = (targetPosition.x - centerIndex) * stepX;
    const targetRawPanY = (targetPosition.y - centerIndex) * stepY;
    const targetPanX = Math.max(-safeMaxPanX, Math.min(safeMaxPanX, targetRawPanX));
    const targetPanY = Math.max(-safeMaxPanY, Math.min(safeMaxPanY, targetRawPanY));

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
          backgroundImage: backgroundLgReady
            ? `url(${BACKGROUND_LG_WEBP})`
            : backgroundMdReady
              ? `url(${BACKGROUND_MD_WEBP})`
              : `url(${BACKGROUND_TINY_WEBP})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "transform 1000ms cubic-bezier(0, 0, 0.2, 1)",
        }}
      />

      {/* Current cell content - fixed to viewport center */}
      {/* Only show content after background tiny is ready to prevent black background flash */}
      {currentCell && backgroundTinyReady && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            {currentCell.content}
          </div>
        </div>
      )}

      {/* Only show nav buttons after background is ready */}
      {backgroundTinyReady && (
        <>
          <div className="fixed top-3 left-3 z-50 flex items-center gap-2">
            <Suspense fallback={null}>
              <MapGridNav
                isOpen={isMapOpen}
                currentPosition={displayPosition}
                onToggle={() => {
                  setIsSocialsOpen(false);
                  setIsMapOpen((prev) => !prev);
                }}
                onClose={() => setIsMapOpen(false)}
                onSelectCell={jumpToCell}
              />
            </Suspense>

            {showHomeButton && <HomeButton goHome={goHome} glassStyle={glassStyle} visible={!isHome} />}
          </div>

          <div className="fixed top-3 right-3 z-50">
            <Suspense fallback={null}>
              <SocialsModal
                isOpen={isSocialsOpen}
                onToggle={() => {
                  setIsMapOpen(false);
                  setIsSocialsOpen((prev) => !prev);
                }}
                onClose={() => setIsSocialsOpen(false)}
              />
            </Suspense>
          </div>

          {/* Chevron navigation */}
          <Suspense fallback={null}>
            <ChevronNav
              canGoUp={canGoUp}
              canGoDown={canGoDown}
              canGoLeft={canGoLeft}
              canGoRight={canGoRight}
              labels={currentCell?.chevronLabels}
              onMove={move}
              statsContent={statsContent}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <GameStatsProvider>
        <HomeContent />
      </GameStatsProvider>
    </NavigationProvider>
  );
}

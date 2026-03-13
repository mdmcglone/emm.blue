"use client";

import { ImgHTMLAttributes, useEffect, useLayoutEffect, useRef, useState } from "react";

interface ProgressiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  basePath: string;
  fallbackSrc: string;
  sizes?: string; // e.g., "(max-width: 768px) 100vw, 400px"
  fetchPriority?: "high" | "low" | "auto";
}

// Build srcset with all available image sizes
function buildSrcSet(basePath: string, fallbackSrc: string): string {
  // Estimated widths based on typical image sizes
  // Adjust these if your actual image dimensions differ
  const srcset = [
    `${basePath}-tiny.webp 200w`,
    `${basePath}-md.webp 720w`,
    `${basePath}-lg.webp 1400w`,
    `${fallbackSrc} 1400w`, // Fallback as last option
  ];
  return srcset.join(", ");
}

export function ProgressiveImage({
  basePath,
  fallbackSrc,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  sizes = "(max-width: 768px) 200px, (max-width: 1200px) 200px, 200px",
  fetchPriority,
  ...imgProps
}: ProgressiveImageProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const tinyImgRef = useRef<HTMLImageElement | null>(null);
  const hasStartedRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const loadRunRef = useRef(0);
  const tinySrc = `${basePath}-tiny.webp`;
  const srcSet = buildSrcSet(basePath, fallbackSrc);
  const [highSrc, setHighSrc] = useState<string | null>(null);
  const [isHighReady, setIsHighReady] = useState(false);
  const [showTiny, setShowTiny] = useState(true);
  const [tinyOpacity, setTinyOpacity] = useState(1);
  const [isTinyLoaded, setIsTinyLoaded] = useState(false);

  useLayoutEffect(() => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    setHighSrc(null);
    setIsHighReady(false);
    setShowTiny(true);
    setTinyOpacity(1);
    setIsTinyLoaded(false);
    hasStartedRef.current = false;
    loadRunRef.current += 1;
  }, [basePath]);

  useEffect(() => {
    if (isTinyLoaded) return;
    const tinyImg = tinyImgRef.current;
    if (!tinyImg) return;
    if (tinyImg.complete) {
      setIsTinyLoaded(true);
    }
  }, [isTinyLoaded, tinySrc]);

  useEffect(() => {
    const preloadAndDecode = (src: string): Promise<boolean> =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        let settled = false;
        const settle = (ok: boolean) => {
          if (settled) return;
          settled = true;
          img.onload = null;
          img.onerror = null;
          resolve(ok);
        };
        const decodeAndSettle = () => {
          img.decode().then(() => settle(true)).catch(() => settle(true));
        };

        img.onload = () => decodeAndSettle();
        img.onerror = () => settle(false);
        img.src = src;

        if (img.complete) {
          if (img.naturalWidth > 0) decodeAndSettle();
          else settle(false);
        }
      });

    const startLoad = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      const currentRun = loadRunRef.current;
      setIsHighReady(false);
      // With srcset, browser will choose the appropriate image based on sizes
      // We set src to the smallest option as a fallback, browser will use srcSet for actual selection
      // This ensures browser chooses from srcSet rather than downloading a specific size
      const fallbackSrcForSrc = `${basePath}-tiny.webp`;

      (async () => {
        // Preload tiny as fallback, but let browser choose from srcSet
        const fallbackReady = await preloadAndDecode(fallbackSrcForSrc);
        if (loadRunRef.current !== currentRun) return;
        if (fallbackReady) {
          // Set to tiny as src fallback, browser will use srcSet for actual image
          setHighSrc(fallbackSrcForSrc);
          setIsHighReady(true);
          return;
        }
        // If tiny fails, try the actual fallback
        const actualFallbackReady = await preloadAndDecode(fallbackSrc);
        if (loadRunRef.current !== currentRun) return;
        setHighSrc(actualFallbackReady ? fallbackSrc : fallbackSrcForSrc);
        setIsHighReady(actualFallbackReady);
      })();
    };

    // Always let tiny placeholder resolve first, so high-res images never win the race to first paint.
    if (!isTinyLoaded) return;

    if (loading === "eager") {
      startLoad();
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      startLoad();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [basePath, fallbackSrc, isTinyLoaded, loading]);

  useEffect(() => {
    if (!isHighReady || !showTiny) return;
    const rafId = window.requestAnimationFrame(() => setTinyOpacity(0));
    fadeTimeoutRef.current = window.setTimeout(() => {
      setShowTiny(false);
      fadeTimeoutRef.current = null;
    }, 260);
    return () => {
      window.cancelAnimationFrame(rafId);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    };
  }, [isHighReady, showTiny]);

  return (
    <span
      ref={containerRef}
      style={{ position: "relative", display: "block", width: "100%", height: "100%" }}
    >
      {highSrc ? (
        <img
          src={highSrc}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            opacity: 1,
            zIndex: 1,
            ...style,
          }}
          onError={(event) => {
            if (highSrc !== fallbackSrc) {
              setIsHighReady(false);
              setHighSrc(fallbackSrc);
              return;
            }
            event.currentTarget.onerror = null;
          }}
          {...imgProps}
        />
      ) : null}
      {showTiny ? (
        <img
          ref={tinyImgRef}
          src={tinySrc}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            opacity: tinyOpacity,
            transition: "opacity 260ms ease",
            zIndex: 2,
            pointerEvents: "none",
            ...style,
          }}
          alt=""
          aria-hidden="true"
          onLoad={() => setIsTinyLoaded(true)}
          onError={() => setIsTinyLoaded(true)}
        />
      ) : null}
    </span>
  );
}


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
  const highImgRef = useRef<HTMLImageElement | null>(null);
  const hasStartedRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const loadRunRef = useRef(0);
  const tinySrc = `${basePath}-tiny.webp`;
  const srcSet = buildSrcSet(basePath, fallbackSrc);
  const [shouldLoadHigh, setShouldLoadHigh] = useState(false);
  const [isHighReady, setIsHighReady] = useState(false);
  const [showTiny, setShowTiny] = useState(true);
  const [tinyOpacity, setTinyOpacity] = useState(1);
  const [isTinyLoaded, setIsTinyLoaded] = useState(false);

  useLayoutEffect(() => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    setShouldLoadHigh(false);
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
      // Start loading high-res image - browser will choose from srcSet
      setShouldLoadHigh(true);
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
      {shouldLoadHigh ? (
        <img
          ref={highImgRef}
          srcSet={srcSet}
          sizes={sizes}
          src={fallbackSrc}
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
            opacity: isHighReady ? 1 : 0,
            transition: isHighReady ? "opacity 260ms ease" : "none",
            zIndex: 1,
            ...style,
          }}
          onLoad={() => {
            setIsHighReady(true);
          }}
          onError={(event) => {
            // If srcset fails, fallback to jpeg
            if (event.currentTarget.srcset) {
              event.currentTarget.srcset = "";
              event.currentTarget.src = fallbackSrc;
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


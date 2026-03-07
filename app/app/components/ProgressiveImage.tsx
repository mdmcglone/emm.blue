"use client";

import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface ProgressiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  basePath: string;
  fallbackSrc: string;
}

function chooseTargetSrc(basePath: string): string {
  const dpr = window.devicePixelRatio || 1;
  const effectiveWidth = window.innerWidth * dpr;
  return effectiveWidth >= 1400 ? `${basePath}-lg.webp` : `${basePath}-md.webp`;
}

export function ProgressiveImage({
  basePath,
  fallbackSrc,
  loading = "lazy",
  decoding = "async",
  ...imgProps
}: ProgressiveImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const hasStartedRef = useRef(false);
  const [src, setSrc] = useState(`${basePath}-tiny.webp`);

  useEffect(() => {
    setSrc(`${basePath}-tiny.webp`);
    hasStartedRef.current = false;
  }, [basePath]);

  useEffect(() => {
    const startLoad = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      const target = chooseTargetSrc(basePath);
      const img = new Image();
      img.onload = () => setSrc(target);
      img.onerror = () => setSrc(fallbackSrc);
      img.src = target;
    };

    if (loading === "eager") {
      startLoad();
      return;
    }

    const node = imgRef.current;
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
  }, [basePath, fallbackSrc, loading]);

  return (
    <img
      ref={imgRef}
      src={src}
      loading={loading}
      decoding={decoding}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackSrc;
      }}
      {...imgProps}
    />
  );
}


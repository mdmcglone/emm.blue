// Track prefetched images to avoid duplicates
const prefetchedImages = new Set<string>();
// Track images that are actually loaded into memory (not just prefetched)
const loadedImages = new Map<string, HTMLImageElement>();

// Check if an image is already cached/prefetched
export function isImagePrefetched(src: string): boolean {
  return prefetchedImages.has(src);
}

// Check if an image is already loaded into memory
export function isImageLoaded(src: string): boolean {
  return loadedImages.has(src);
}

// Get a preloaded image if available
export function getPreloadedImage(src: string): HTMLImageElement | null {
  return loadedImages.get(src) || null;
}

// Check if an image is already in browser cache
export async function isImageCached(src: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    // Check if image loads immediately (cached images load synchronously)
    const img = new Image();
    return new Promise<boolean>((resolve) => {
      let resolved = false;
      const settle = (cached: boolean) => {
        if (resolved) return;
        resolved = true;
        resolve(cached);
      };
      
      img.onload = () => settle(true);
      img.onerror = () => settle(false);
      img.src = src;
      
      // If complete immediately after setting src, it's cached
      // Use requestAnimationFrame to check after browser has a chance to check cache
      requestAnimationFrame(() => {
        if (img.complete && img.naturalWidth > 0) {
          settle(true);
          return;
        }
        // If not cached, it won't load synchronously - timeout quickly
        setTimeout(() => settle(false), 10);
      });
    });
  } catch {
    return false;
  }
}

// Mark an image as prefetched
export function markImagePrefetched(src: string): void {
  prefetchedImages.add(src);
}

// Prefetch images for neighboring cells (lower priority than preload)
// Actually loads images into memory so they're truly cached (no 304 requests)
export function prefetchCellImages(imagePaths: string[]): void {
  if (typeof window === "undefined") return;
  
  imagePaths.forEach((basePath) => {
    // Prefetch tiny and md versions (browser will choose appropriate size)
    const tinySrc = `${basePath}-tiny.webp`;
    const mdSrc = `${basePath}-md.webp`;
    
    // Actually load images into memory (not just prefetch links)
    // This ensures they're in browser cache and no requests are made when used
    [tinySrc, mdSrc].forEach((src) => {
      // Skip if already loaded
      if (loadedImages.has(src)) return;
      
      // Skip if already prefetched (loading in progress)
      if (prefetchedImages.has(src)) return;
      
      markImagePrefetched(src);
      
      // Actually load the image into memory
      const img = new Image();
      img.onload = () => {
        // Image is now in memory cache - store reference
        loadedImages.set(src, img);
      };
      img.onerror = () => {
        // Remove from prefetched set on error so we can retry later if needed
        prefetchedImages.delete(src);
      };
      // Set src to trigger load (browser will use cache if available)
      img.src = src;
    });
  });
}

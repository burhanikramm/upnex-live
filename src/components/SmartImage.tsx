import { useState, type ImgHTMLAttributes } from 'react';

/**
 * Branded inline SVG used whenever a real asset is missing or fails to load.
 * Inlined as a data-URI so it costs zero network requests.
 */
const FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16203D"/>
      <stop offset="55%" stop-color="#2B3D70"/>
      <stop offset="100%" stop-color="#0B1020"/>
    </linearGradient>
    <pattern id="p" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0V46" fill="none" stroke="rgba(138,162,224,.10)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="500" fill="url(#g)"/>
  <rect width="800" height="500" fill="url(#p)"/>
  <g fill="none" stroke="rgba(180,196,238,.5)" stroke-width="10" stroke-linecap="round">
    <path d="M338 196v70a42 42 0 0 0 84 0v-70"/>
    <path d="M446 300V196l72 104V196"/>
  </g>
  <text x="400" y="360" text-anchor="middle"
        font-family="Inter, Segoe UI, sans-serif" font-size="19"
        letter-spacing="7" fill="rgba(180,196,238,.62)">UPNEX</text>
</svg>`);

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Skip lazy-loading for above-the-fold imagery. */
  priority?: boolean;
  /** Optional custom fallback source. */
  fallbackSrc?: string;
}

/**
 * Drop-in <img> replacement.
 *  - lazy-loads and async-decodes by default (keeps the main thread free)
 *  - fades in once decoded, so there is no flash of empty box
 *  - swaps to a branded placeholder if the file is missing or 404s
 */
export default function SmartImage({
  src,
  alt,
  priority = false,
  fallbackSrc = FALLBACK,
  className = '',
  style,
  ...rest
}: SmartImageProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={current}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-expect-error - fetchpriority is valid HTML, typings lag behind
      fetchpriority={priority ? 'high' : 'auto'}
      draggable={false}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== fallbackSrc) {
          setCurrent(fallbackSrc);
        }
        setLoaded(true);
      }}
      className={className}
      style={{ opacity: loaded ? 1 : 0, ...style }}
      {...rest}
    />
  );
}

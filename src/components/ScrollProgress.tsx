import { useEffect, useRef } from 'react';

/**
 * Reading-progress bar.
 * Writes directly to the DOM via a transform (compositor-only, no layout,
 * no React re-render per scroll event) and throttles with requestAnimationFrame.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = barRef.current;
      if (el) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? window.scrollY / docHeight : 0;
        el.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="progress-bar"
      style={{ transform: 'scaleX(0)' }}
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
}

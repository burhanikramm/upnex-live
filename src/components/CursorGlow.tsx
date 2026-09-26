import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a solid dot that tracks the pointer exactly and a ring
 * that eases behind it.
 *
 * Performance notes:
 *  - one shared rAF loop drives both elements (no per-event style thrash)
 *  - the loop parks itself when the pointer is idle and restarts on move
 *  - skipped entirely on touch devices and when reduced motion is requested
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...mouse };
    let ringSize = 38;
    let targetSize = 38;
    let animId = 0;
    let running = false;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const frame = () => {
      ring.x = lerp(ring.x, mouse.x, 0.14);
      ring.y = lerp(ring.y, mouse.y, 0.14);
      ringSize = lerp(ringSize, targetSize, 0.16);

      if (ringRef.current) {
        const half = ringSize / 2;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.transform = `translate3d(${ring.x - half}px, ${ring.y - half}px, 0)`;
      }

      // park the loop once the ring has caught up
      const settled =
        Math.abs(ring.x - mouse.x) < 0.4 &&
        Math.abs(ring.y - mouse.y) < 0.4 &&
        Math.abs(ringSize - targetSize) < 0.4;

      if (settled) {
        running = false;
        return;
      }
      animId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      animId = requestAnimationFrame(frame);
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3.5}px, ${e.clientY - 3.5}px, 0)`;
      }
      start();
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'button, a, [role="button"], input, textarea, select, label'
      );
      targetSize = interactive ? 54 : 38;
      if (ringRef.current) {
        ringRef.current.style.borderColor = interactive
          ? 'rgba(138, 162, 224, 1)'
          : 'rgba(138, 162, 224, 0.55)';
      }
      start();
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden sm:block"
        style={{ position: 'fixed', left: 0, top: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden sm:block"
        style={{ position: 'fixed', left: 0, top: 0, width: 38, height: 38 }}
        aria-hidden="true"
      />
    </>
  );
}

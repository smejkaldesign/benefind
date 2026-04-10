"use client";

import { useEffect, useRef } from "react";

/**
 * Animated dither fade overlay with large square pixels.
 * Organic flowing noise creates a scattered, cloud-like dissolve.
 * Bottom is fully solid dark, dots thin out and get smaller toward the top.
 */

interface DitherFadeProps {
  className?: string;
  color?: string;
}

export function DitherFade({ className, color = "#121212" }: DitherFadeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Hash noise
    function hash(x: number, y: number): number {
      let h = x * 374761393 + y * 668265263;
      h = (h ^ (h >> 13)) * 1274126177;
      h = h ^ (h >> 16);
      return (h & 0x7fffffff) / 0x7fffffff;
    }

    function smoothNoise(x: number, y: number): number {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);
      const n00 = hash(ix, iy);
      const n10 = hash(ix + 1, iy);
      const n01 = hash(ix, iy + 1);
      const n11 = hash(ix + 1, iy + 1);
      return (
        (n00 + (n10 - n00) * sx) * (1 - sy) + (n01 + (n11 - n01) * sx) * sy
      );
    }

    function fbm(x: number, y: number, octaves: number): number {
      let value = 0;
      let amp = 0.5;
      let freq = 1;
      for (let i = 0; i < octaves; i++) {
        value += amp * smoothNoise(x * freq, y * freq);
        amp *= 0.5;
        freq *= 2;
      }
      return value;
    }

    const PIXEL = 6; // Large square pixel size

    function render(time: number) {
      if (!ctx || width === 0 || height === 0) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const t = time * 0.00012;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PIXEL);
      const rows = Math.ceil(height / PIXEL);

      // Solid dark fill at the very bottom 15%
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, height * 0.85, width, height * 0.15);

      for (let row = 0; row < rows; row++) {
        const y = row / rows;
        // Vertical density: sparse at top, dense at bottom
        const verticalDensity = y * y * y * 2.0;

        for (let col = 0; col < cols; col++) {
          const x = col / cols;

          // Layered noise for organic, cloud-like flow
          const n1 = fbm(x * 4 + t * 0.25, y * 3 + t * 0.12, 4);
          const n2 = fbm(x * 6 - t * 0.18 + 50, y * 4 + t * 0.08 + 50, 3);
          const n3 = fbm(x * 2.5 + n1 * 0.5, y * 2 + n2 * 0.3 + t * 0.06, 3);

          let value = n1 * 0.35 + n2 * 0.3 + n3 * 0.35;
          value = value * 0.4 + verticalDensity * 0.6;

          // Static per-cell randomness
          const cellRand = hash(col * 7, row * 13) * 0.15;
          const threshold = 0.25 + cellRand;

          if (value > threshold && y < 0.85) {
            const intensity = Math.min(1, (value - threshold) / 0.35);
            // Square size varies: larger when denser
            const size = Math.max(
              2,
              Math.floor(PIXEL * (0.4 + 0.6 * intensity)),
            );

            const px = col * PIXEL;
            const py = row * PIXEL;

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.7 + 0.3 * intensity})`;
            ctx.fillRect(px, py, size, size);
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

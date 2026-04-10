"use client";

import { useEffect, useRef } from "react";

/**
 * Animated dither fade overlay — adapted from Celune's DitherBackground.
 * Renders organic flowing dark dots (#121212) that increase in density
 * toward the bottom, creating a cloud-like dissolve effect.
 *
 * The bottom ~20% is fully solid dark. The top fades to transparent.
 * Uses FBM noise with smooth time evolution for fluid, cloud-like motion.
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

    // Parse color
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const colorStr = `rgb(${r}, ${g}, ${b})`;

    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Deterministic hash noise
    function hash(x: number, y: number): number {
      let h = x * 374761393 + y * 668265263;
      h = (h ^ (h >> 13)) * 1274126177;
      h = h ^ (h >> 16);
      return (h & 0x7fffffff) / 0x7fffffff;
    }

    // Smooth noise with cubic interpolation
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
      const nx0 = n00 + (n10 - n00) * sx;
      const nx1 = n01 + (n11 - n01) * sx;
      return nx0 + (nx1 - nx0) * sy;
    }

    // Fractal brownian motion
    function fbm(x: number, y: number, octaves: number): number {
      let value = 0;
      let amplitude = 0.5;
      let frequency = 1;
      for (let i = 0; i < octaves; i++) {
        value += amplitude * smoothNoise(x * frequency, y * frequency);
        amplitude *= 0.5;
        frequency *= 2;
      }
      return value;
    }

    // Pre-compute static dither thresholds
    let ditherGrid: Float32Array | null = null;
    let gridCols = 0;
    let gridRows = 0;
    const SCALE = 4;

    function ensureDitherGrid(cols: number, rows: number) {
      if (ditherGrid && gridCols === cols && gridRows === rows) return;
      gridCols = cols;
      gridRows = rows;
      ditherGrid = new Float32Array(cols * rows);
      for (let rr = 0; rr < rows; rr++) {
        for (let c = 0; c < cols; c++) {
          ditherGrid[rr * cols + c] = hash(c * 7, rr * 13) * 0.12;
        }
      }
    }

    function render(time: number) {
      if (!ctx) return;
      const t = time * 0.00015;

      // Clear to transparent
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SCALE);
      const rows = Math.ceil(height / SCALE);

      ensureDitherGrid(cols, rows);
      if (!ditherGrid) return;

      // Solid dark fill at the very bottom 20%
      ctx.fillStyle = colorStr;
      ctx.fillRect(0, height * 0.8, width, height * 0.2);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col / cols;
          const y = row / rows;

          // Vertical gradient: more dots toward bottom
          // y=0 (top) → very sparse, y=0.8 (bottom) → fully solid
          const verticalDensity = y * y * 1.6;

          // Smooth layered noise for organic flow
          const n1 = fbm(x * 3 + t * 0.3, y * 3 + t * 0.15, 4);
          const n2 = fbm(x * 5 - t * 0.2 + 100, y * 5 + t * 0.1 + 100, 3);
          const n3 = fbm(x * 2 + n1 * 0.4, y * 2 + n2 * 0.4 + t * 0.08, 3);

          let value = n1 * 0.4 + n2 * 0.3 + n3 * 0.3;

          // Blend noise with vertical gradient
          value = value * 0.5 + verticalDensity * 0.5;

          // Static dither threshold
          const threshold = 0.28 + (ditherGrid[row * cols + col] ?? 0);

          if (value > threshold && y < 0.8) {
            const intensity = Math.min(1, (value - threshold) / 0.4);
            const dotSize = SCALE * 0.3 + SCALE * 0.5 * intensity;

            const px = col * SCALE + SCALE / 2;
            const py = row * SCALE + SCALE / 2;

            ctx.fillStyle = colorStr;
            ctx.beginPath();
            ctx.arc(px, py, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
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

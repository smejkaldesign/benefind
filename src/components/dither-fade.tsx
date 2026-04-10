"use client";

import { useEffect, useRef } from "react";

/**
 * Animated Bayer-matrix dither fade overlay.
 * Renders dark (#121212) dots that increase in density toward the bottom,
 * creating an animated dissolve effect between the hero and dark background.
 *
 * - Bottom is fully solid dark
 * - Dots animate subtly via time-based noise offset
 * - Covers bottom ~25% of parent (set via CSS)
 */

const BAYER_8X8 = [
  0, 48, 12, 60, 3, 51, 15, 63, 32, 16, 44, 28, 35, 19, 47, 31, 8, 56, 4, 52,
  11, 59, 7, 55, 40, 24, 36, 20, 43, 27, 39, 23, 2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29, 10, 58, 6, 54, 9, 57, 5, 53, 42, 26, 38, 22,
  41, 25, 37, 21,
];

interface DitherFadeProps {
  className?: string;
  color?: string;
  pixelSize?: number;
  speed?: number;
}

export function DitherFade({
  className,
  color = "#121212",
  pixelSize = 4,
  speed = 0.3,
}: DitherFadeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    // Parse color to RGB
    const tempEl = document.createElement("div");
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const computed = getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    const rgb = computed.match(/\d+/g)?.map(Number) || [18, 18, 18];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      // Use lower resolution for performance (dither is pixelated anyway)
      canvas.width = Math.ceil(rect.width / pixelSize);
      canvas.height = Math.ceil(rect.height / pixelSize);
    }

    function render() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (performance.now() - startTime) * 0.001 * speed;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        // Gradient: 0 at top (transparent) → 1 at bottom (fully dark)
        const gradientT = y / h;
        // Apply easing for more natural fade
        const threshold = gradientT * gradientT * 1.2;

        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          // Bayer threshold with time-based offset
          const bx = (x + Math.floor(elapsed * 3)) % 8;
          const by = (y + Math.floor(elapsed * 2)) % 8;
          const bayerValue = BAYER_8X8[by * 8 + bx]! / 64;

          if (threshold > bayerValue) {
            data[idx] = rgb[0]!;
            data[idx + 1] = rgb[1]!;
            data[idx + 2] = rgb[2]!;
            data[idx + 3] = 255;
          }
          // else: stays transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(render);
    }

    resize();
    render();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [color, pixelSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        imageRendering: "pixelated",
        width: "100%",
        height: "100%",
      }}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type CLOUDS_FN from "vanta/dist/vanta.clouds.min";

type VantaEffect = ReturnType<typeof CLOUDS_FN>;

interface VantaCloudsProps {
  className?: string;
  children?: React.ReactNode;
}

export function VantaClouds({ className, children }: VantaCloudsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let destroyed = false;

    const loadVanta = async () => {
      try {
        const THREE = await import("three");
        const CLOUDS = (await import("vanta/dist/vanta.clouds.min")).default;

        if (destroyed || !containerRef.current) return;

        effectRef.current = CLOUDS({
          el: containerRef.current,
          THREE,
          // Normal blue sky with white clouds (matching Warp Oz)
          skyColor: 0x8b9fd4,
          cloudColor: 0xc4b5e3,
          cloudShadowColor: 0x4a5082,
          sunColor: 0xd4c5f0,
          sunGlareColor: 0xc9b8e8,
          sunlightColor: 0xb5a0d8,
          speed: 0.8,
          mouseControls: true,
          touchControls: true,
          minHeight: 600,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
        });
        setLoaded(true);
      } catch {
        // Vanta fails gracefully on unsupported browsers
      }
    };

    loadVanta();

    return () => {
      destroyed = true;
      if (effectRef.current) {
        effectRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        backgroundColor: "#8b9fd4",
      }}
    >
      {/* Fallback gradient visible until Vanta loads */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #a0b0e0 0%, #8b9fd4 40%, #7a8dc0 100%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

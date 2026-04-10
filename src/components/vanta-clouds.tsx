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
          // Vanta.js default colors
          skyColor: 0x68b8d7,
          cloudColor: 0xadc1de,
          cloudShadowColor: 0x183550,
          sunColor: 0xff9919,
          sunGlareColor: 0xff6633,
          sunlightColor: 0xff9933,
          speed: 0.3,
          mouseControls: false,
          touchControls: false,
          minHeight: 600,
          minWidth: 200,
          // Scale up to push cloud horizon lower (center of container)
          scale: 1.5,
          scaleMobile: 1.5,
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
        backgroundColor: "#68b8d7",
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #7ec8e0 0%, #adc1de 50%, #68b8d7 100%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

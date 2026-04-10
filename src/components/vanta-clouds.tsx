'use client';

import { useEffect, useRef, useState } from 'react';
import type CLOUDS_FN from 'vanta/dist/vanta.clouds.min';

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
        const THREE = await import('three');
        const CLOUDS = (await import('vanta/dist/vanta.clouds.min')).default;

        if (destroyed || !containerRef.current) return;

        effectRef.current = CLOUDS({
          el: containerRef.current,
          THREE,
          skyColor: 0x1e2b4d,
          cloudColor: 0xcab1f7,
          cloudShadowColor: 0x121212,
          sunColor: 0xdeb0f7,
          sunGlareColor: 0xdeb0f7,
          sunlightColor: 0xcab1f7,
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
        position: 'relative',
        backgroundColor: '#1E2B4D',
      }}
    >
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1E2B4D 0%, #2A1F4D 50%, #121212 100%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

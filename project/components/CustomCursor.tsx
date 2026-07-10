'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [data-cursor="hover"], input, textarea, [role="button"]');
      setHovering(!!isInteractive);

      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 12) trailRef.current.shift();
      setTrail(trailRef.current.map((p, i) => ({ ...p, id: i })));
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none hidden md:block">
      {trail.map((p, i) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-neon-cyan/20"
          style={{
            left: p.x,
            top: p.y,
            width: 6 - i * 0.4,
            height: 6 - i * 0.4,
            transform: 'translate(-50%, -50%)',
            opacity: (1 - i / 12) * 0.5,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
      <div
        className="absolute rounded-full border border-neon-cyan/60 transition-all duration-200 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: hovering ? 48 : 24,
          height: hovering ? 48 : 24,
          transform: 'translate(-50%, -50%)',
          backgroundColor: hovering ? 'hsl(189 94% 55% / 0.1)' : 'transparent',
          boxShadow: clicking
            ? '0 0 30px hsl(189 94% 55% / 0.6)'
            : '0 0 15px hsl(189 94% 55% / 0.3)',
          scale: clicking ? '0.8' : '1',
        }}
      />
      <div
        className="absolute rounded-full bg-neon-cyan"
        style={{
          left: position.x,
          top: position.y,
          width: 4,
          height: 4,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}

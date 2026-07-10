'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; r: number; o: number; s: number }[] = [];
    const starCount = Math.min(150, Math.floor((w * h) / 12000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.5 + 0.1,
        s: Math.random() * 0.5 + 0.1,
      });
    }

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        star.o += Math.sin(Date.now() * 0.001 * star.s) * 0.005;
        const opacity = Math.max(0.05, Math.min(0.6, star.o));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${opacity})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 aurora-bg opacity-40" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-2 text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
                Portfolio
              </div>
              <h1 className="text-5xl font-bold gradient-text gradient-animate">
                Muhammad Areesh
              </h1>
            </motion.div>

            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-emerald"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {Math.min(Math.floor(progress), 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

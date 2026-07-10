'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProfileBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 mb-8 mx-auto"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue blur-xl opacity-50 animate-pulse-glow" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-emerald p-[2px] animate-spin-slow">
          <div className="w-full h-full rounded-full bg-background" />
        </div>
        <div className="absolute inset-[2px] rounded-full overflow-hidden">
          <Image
            src="/images/WhatsApp_Image_2026-07-10_at_12.42.52.jpeg"
            alt="Muhammad Areesh"
            fill
            sizes="112px"
            className="object-cover rounded-full"
            priority
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-neon-emerald border-2 border-background flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

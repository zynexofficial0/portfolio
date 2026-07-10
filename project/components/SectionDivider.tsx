'use client';

import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="h-full bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent origin-center"
      />
    </div>
  );
}

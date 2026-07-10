'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Mail, MessageCircle, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 aurora-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:border-neon-cyan/30 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:text-neon-cyan transition-colors" />
            <span className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center font-bold text-black text-sm">
              MA
            </div>
            <span className="font-semibold tracking-tight">Muhammad Areesh</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <SocialIcon href="mailto:zynexofficial09@gmail.com" icon={Mail} label="Email" />
            <SocialIcon href="https://wa.me/923125342033" icon={MessageCircle} label="WhatsApp" />
            <SocialIcon href="https://github.com" icon={Github} label="GitHub" />
            <SocialIcon href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Muhammad Areesh. All rights reserved.</p>
            <p className="mt-1">Built with Next.js, Three.js, Framer Motion & GSAP</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-neon-cyan/30 transition-colors"
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}

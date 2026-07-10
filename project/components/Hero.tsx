'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown, Mail, Phone, Sparkles } from 'lucide-react';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });
const ProfileBadge = dynamic(() => import('./ProfileBadge'), { ssr: false });

const codeSnippets = [
  'const dev = new FullStackDeveloper("Areesh");',
  'await app.deploy({ scale: "infinite" });',
  'git push origin main --force-of-nature',
  'npm run build -- --magic',
  'return <Experience that={isImmersive} />;',
];

const techIcons = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'Tailwind'];

const typingTexts = [
  'Beautiful Code.',
  'Scalable Systems.',
  'Immersive UX.',
  'Modern Products.',
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [snippetIdx, setSnippetIdx] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100]);

  useEffect(() => {
    const current = typingTexts[textIdx];
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= current.length) {
        setTyped(current.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          let backIdx = current.length;
          const backInterval = setInterval(() => {
            if (backIdx >= 0) {
              setTyped(current.slice(0, backIdx));
              backIdx--;
            } else {
              clearInterval(backInterval);
              setTextIdx((i) => (i + 1) % typingTexts.length);
            }
          }, 30);
        }, 1500);
      }
    }, 80);
    return () => clearInterval(typeInterval);
  }, [textIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIdx((i) => (i + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-0 aurora-bg opacity-60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto"
      >
        <ProfileBadge />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-emerald" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Building Modern Web
          <br />
          Experiences with{' '}
          <span className="gradient-text gradient-animate inline-block min-h-[1.1em] text-left">
            {typed}
            <span className="animate-blink">|</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Hi, I&apos;m Muhammad Areesh, a Full Stack Developer passionate about
          creating scalable web applications, engaging user experiences, and
          modern digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles className="w-4 h-4" />
            View Featured Work
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {techIcons.map((tech, i) => (
            <motion.span
              key={tech}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
              className="glass px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground hover:border-neon-cyan/30 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 glass-strong rounded-2xl overflow-hidden max-w-md w-full text-left"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">areesh@portfolio</span>
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm">
            <span className="text-neon-emerald">$</span>{' '}
            <motion.span
              key={snippetIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-foreground/80"
            >
              {codeSnippets[snippetIdx]}
            </motion.span>
            <span className="animate-blink text-neon-cyan">_</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 w-full h-4 bg-neon-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}

function MagneticButton({
  children,
  onClick,
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={onClick}
      className={`group relative flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-black'
          : 'glass text-foreground hover:bg-white/5'
      }`}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

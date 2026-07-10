'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight, X, TrendingUp, Zap, Layers, Gauge, FolderGit2 } from 'lucide-react';

const additionalProjects = [
  {
    name: 'AirdropHunt',
    description: 'A comprehensive crypto airdrop tracking and discovery platform with real-time updates.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    url: 'https://airdrophunt.net',
    featured: true,
  },
  {
    name: 'Portfolio Engine',
    description: 'A reusable portfolio framework with 3D scenes, smooth scroll, and cinematic animations.',
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'GSAP'],
    url: '#',
    featured: false,
  },
  {
    name: 'Realtime Chat App',
    description: 'Full-stack real-time messaging application with presence, typing indicators, and rooms.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    url: '#',
    featured: false,
  },
  {
    name: 'E-Commerce Dashboard',
    description: 'Admin dashboard with analytics, inventory management, and order tracking.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind', 'Recharts'],
    url: '#',
    featured: false,
  },
  {
    name: 'AI Content Generator',
    description: 'AI-powered content generation tool with streaming responses and rich text editing.',
    tech: ['React', 'Node.js', 'OpenAI API', 'Express'],
    url: '#',
    featured: false,
  },
  {
    name: 'Task Management App',
    description: 'Kanban-style task manager with drag-and-drop, teams, and real-time sync.',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    url: '#',
    featured: false,
  },
];

const featuredStats = [
  { label: 'Monthly Users', value: '5K+', icon: TrendingUp },
  { label: 'Uptime', value: '99.9%', icon: Gauge },
  { label: 'Page Speed', value: '95+', icon: Zap },
  { label: 'Tech Stack', value: '8', icon: Layers },
];

const featuredFeatures = [
  'Real-time airdrop tracking and alerts',
  'User authentication and personalized watchlists',
  'Responsive, SEO-optimized landing pages',
  'Scalable backend with Supabase integration',
  'Modern, performant UI with Tailwind CSS',
];

export default function FeaturedWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const browserY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="work" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted-foreground mb-4">
            <span className="w-1 h-1 rounded-full bg-neon-amber" />
            Featured Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            A project I&apos;m <span className="gradient-text">proud</span> of
          </h2>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: browserY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-neon-blue/10">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-3 flex-1 glass rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
                  airdrophunt.net
                </div>
              </div>
              <div className="relative aspect-[16/10] bg-gradient-to-br from-neon-blue/10 to-neon-emerald/10 overflow-hidden">
                <div className="absolute inset-0 shimmer opacity-30" />
                <div className="absolute inset-0 p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center text-black font-bold text-xs">
                        AH
                      </div>
                      <span className="text-sm font-semibold">AirdropHunt</span>
                    </div>
                    <div className="glass px-2 py-1 rounded-full text-[10px] text-neon-emerald">
                      Live
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-lg p-3"
                      >
                        <div className="w-full h-2 bg-white/10 rounded-full mb-2" />
                        <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-auto glass rounded-xl p-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Latest Airdrops</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 glass-strong rounded-xl px-4 py-3 shadow-xl"
            >
              <div className="text-xs text-muted-foreground">Performance</div>
              <div className="text-2xl font-bold gradient-text">95+</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 glass-strong rounded-xl px-4 py-3 shadow-xl"
            >
              <div className="text-xs text-muted-foreground">Users</div>
              <div className="text-2xl font-bold gradient-text">5K+</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="glass px-3 py-1 rounded-full text-xs text-neon-cyan">
                  Featured Project
                </span>
                <span className="glass px-3 py-1 rounded-full text-xs text-neon-emerald flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                  Live
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                AirdropHunt
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                A comprehensive crypto airdrop tracking platform that helps users
                discover, track, and never miss valuable airdrop opportunities.
                Built with a focus on performance, scalability, and user experience.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featuredStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-3 text-center"
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1 text-neon-cyan/70" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Key Features</h4>
              <ul className="space-y-2">
                {featuredFeatures.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue" />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Lucide'].map((t) => (
                  <span key={t} className="glass px-3 py-1.5 rounded-full text-xs hover:border-neon-cyan/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href="https://airdrophunt.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-medium text-sm"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Visit Website <ExternalLink className="w-4 h-4" />
                </span>
              </motion.a>
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass flex items-center gap-2 px-6 py-3 rounded-full text-sm hover:bg-white/5 transition-colors"
              >
                View More Projects <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-xl font-semibold">All Projects</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="glass p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {additionalProjects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-5 group hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base">{project.name}</h4>
                      {project.url !== '#' && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-neon-cyan transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] glass px-2 py-1 rounded-full text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

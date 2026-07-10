'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Code2, Star } from 'lucide-react';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Independent',
    period: '2023 — Present',
    desc: 'Building production-grade web applications from end to end. Working with React, Next.js, Node.js, and modern databases to deliver scalable products.',
    achievements: [
      'Developed and deployed AirdropHunt — a live crypto airdrop platform',
      'Built full-stack applications with React, Next.js, and Supabase',
      'Implemented responsive, accessible, and performant UIs',
    ],
    icon: Code2,
    color: 'from-neon-cyan to-neon-blue',
  },
  {
    role: 'Frontend Developer',
    company: 'Project-based Work',
    period: '2023 — 2024',
    desc: 'Focused on crafting immersive user interfaces with modern frameworks, animation libraries, and 3D web experiences.',
    achievements: [
      'Created animated, interactive web experiences with Framer Motion & GSAP',
      'Integrated Three.js and React Three Fiber for 3D web scenes',
      'Optimized applications for 95+ Lighthouse performance scores',
    ],
    icon: Briefcase,
    color: 'from-neon-blue to-neon-emerald',
  },
  {
    role: 'Continuous Learning',
    company: 'Self-driven Development',
    period: 'Ongoing',
    desc: 'Constantly expanding my technical horizons — exploring new frameworks, tools, and best practices in modern web development.',
    achievements: [
      'Mastering TypeScript, Docker, and cloud deployment workflows',
      'Exploring advanced 3D web and WebGL techniques',
      'Staying current with the latest industry standards and patterns',
    ],
    icon: GraduationCap,
    color: 'from-neon-emerald to-neon-amber',
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted-foreground mb-4">
            <span className="w-1 h-1 rounded-full bg-neon-emerald" />
            Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            A journey of <span className="gradient-text">growth</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-emerald -translate-x-1/2 origin-top"
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => {
              const Icon = exp.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 hidden md:block" />

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-xl`}
                    >
                      <Icon className="w-5 h-5 text-black" />
                    </motion.div>
                  </div>

                  <div className="flex-1 ml-14 md:ml-0">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl p-6 group hover:border-white/15 transition-all"
                  >
                    <div className={`text-xs font-mono uppercase tracking-wider mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <p className="text-sm text-neon-cyan/80 mb-3">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.desc}
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Star className="w-3.5 h-3.5 mt-0.5 text-neon-cyan/60 flex-shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

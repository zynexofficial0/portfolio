'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Zap, Heart, ArrowUpRight } from 'lucide-react';

const timeline = [
  {
    year: '2023',
    title: 'The Journey Begins',
    desc: 'Started as a Full Stack Developer, diving deep into React, Node.js, and modern web technologies.',
    icon: Code2,
    color: 'from-neon-cyan to-neon-blue',
  },
  {
    year: '2023',
    title: 'Building Real Products',
    desc: 'Shipped production applications including AirdropHunt, working with React, Next.js, and scalable backend systems.',
    icon: Rocket,
    color: 'from-neon-blue to-neon-emerald',
  },
  {
    year: '2024',
    title: 'Mastering the Stack',
    desc: 'Deepened expertise across the full stack — from database design with PostgreSQL & Supabase to immersive 3D web experiences.',
    icon: Zap,
    color: 'from-neon-emerald to-neon-amber',
  },
  {
    year: 'Now',
    title: 'Crafting Experiences',
    desc: 'Focused on building cinematic, performant web experiences that blend engineering excellence with design sensibility.',
    icon: Heart,
    color: 'from-neon-amber to-neon-rose',
  },
];

const achievements = [
  { label: 'Years Experience', value: '2', suffix: '+' },
  { label: 'Projects Shipped', value: '10', suffix: '+' },
  { label: 'Technologies', value: '17', suffix: '+' },
  { label: 'Lines of Code', value: '50', suffix: 'K+' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted-foreground mb-4">
            <span className="w-1 h-1 rounded-full bg-neon-cyan" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            The story behind the <span className="gradient-text">code</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-20">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 text-center group hover:border-neon-cyan/20 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                {a.value}
                <span className="text-xl">{a.suffix}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{a.label}</div>
            </motion.div>
          ))}
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-emerald -translate-x-1/2 origin-top"
          />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 ml-12 md:ml-0">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="glass rounded-2xl p-6 group hover:border-white/15 transition-all"
                    >
                      <div className={`text-xs font-mono uppercase tracking-wider mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.year}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        {item.title}
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:rotate-45 transition-all" />
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
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

'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const skills = [
  { name: 'HTML', category: 'Frontend', color: '#e34f26' },
  { name: 'CSS', category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', category: 'Frontend', color: '#f7df1e' },
  { name: 'TypeScript', category: 'Frontend', color: '#3178c6' },
  { name: 'React', category: 'Frontend', color: '#61dafb' },
  { name: 'Next.js', category: 'Frontend', color: '#ffffff' },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#06b6d4' },
  { name: 'Node.js', category: 'Backend', color: '#339933' },
  { name: 'Express', category: 'Backend', color: '#808080' },
  { name: 'MongoDB', category: 'Database', color: '#47a248' },
  { name: 'PostgreSQL', category: 'Database', color: '#4169e1' },
  { name: 'Supabase', category: 'Backend', color: '#3ecf8e' },
  { name: 'Firebase', category: 'Backend', color: '#ffca28' },
  { name: 'Git', category: 'Tools', color: '#f05032' },
  { name: 'GitHub', category: 'Tools', color: '#ffffff' },
  { name: 'Docker', category: 'Tools', color: '#2496ed' },
  { name: 'Vercel', category: 'Tools', color: '#ffffff' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

function SkillSphere({ filter }: { filter: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState<string | null>(null);

  const positions = useMemo(() => {
    const filtered = filter === 'All' ? skills : skills.filter((s) => s.category === filter);
    return filtered.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / filtered.length);
      const theta = Math.sqrt(filtered.length * Math.PI) * phi;
      const r = 3.5;
      return {
        ...skill,
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, [filter]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15 + mouse.x * 0.3;
    groupRef.current.rotation.x = mouse.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      {positions.map((skill) => (
        <group key={skill.name} position={skill.position}>
          <mesh
            onPointerOver={() => setHovered(skill.name)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={hovered === skill.name ? 1.5 : 0.4}
            />
          </mesh>
          <Html
            center
            distanceFactor={8}
            style={{
              pointerEvents: 'none',
              opacity: hovered === skill.name ? 1 : 0.7,
              transition: 'opacity 0.3s',
              transform: hovered === skill.name ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <div
              style={{
                fontSize: hovered === skill.name ? '14px' : '11px',
                fontWeight: 500,
                color: '#fff',
                whiteSpace: 'nowrap',
                textShadow: '0 0 10px rgba(0,0,0,0.8)',
                transition: 'all 0.3s',
              }}
            >
              {skill.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState('All');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted-foreground mb-4">
            <span className="w-1 h-1 rounded-full bg-neon-blue" />
            Skills & Technologies
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            My <span className="gradient-text">technical</span> arsenal
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-medium'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="relative h-[500px] w-full">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="hsl(189, 94%, 60%)" />
            <pointLight position={[-10, -10, 5]} intensity={0.8} color="hsl(217, 91%, 60%)" />
            <SkillSphere filter={filter} />
          </Canvas>

          <motion.div
            style={{ rotate }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {(filter === 'All' ? skills : skills.filter((s) => s.category === filter)).map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:border-white/20 transition-all"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

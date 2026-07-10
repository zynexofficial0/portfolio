'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Copy, Check } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-muted-foreground mb-4">
            <span className="w-1 h-1 rounded-full bg-neon-rose" />
            Contact
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Let&apos;s build something <span className="gradient-text">together</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Open to new opportunities, collaborations, and interesting conversations.
            Reach out through any channel below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            value="+92 312 5342033"
            href="https://wa.me/923125342033"
            color="from-[#25D366] to-[#128C7E]"
            delay={0}
          />
          <ContactCard
            icon={Mail}
            label="Email"
            value="zynexofficial09@gmail.com"
            href="mailto:zynexofficial09@gmail.com"
            color="from-neon-cyan to-neon-blue"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  color: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: x * -10 });
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={handleClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative block glass-strong rounded-3xl p-8 transition-transform duration-200 ease-out overflow-hidden hover:border-white/15"
    >
      <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
      <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`} />

      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/20 animate-ping pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 100,
            height: 100,
            transform: 'translate(-50%, -50%)',
            animationDuration: '0.6s',
          }}
        />
      ))}

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
            {label}
          </div>
          <div className="text-lg font-semibold truncate">{value}</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-neon-cyan/80 flex items-center gap-1 group-hover:gap-2 transition-all">
              {href.startsWith('http') ? 'Open chat' : 'Send email'}
              <span className="transition-transform">→</span>
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-neon-emerald" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

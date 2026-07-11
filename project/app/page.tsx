'use client';

import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const FeaturedWork = dynamic(() => import('@/components/FeaturedWork'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const SectionDivider = dynamic(() => import('@/components/SectionDivider'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <AnimatedBackground />

      <div className="relative min-h-screen noise-overlay">
        <Navbar />

        <main className="pt-24 sm:pt-28">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <FeaturedWork />
          <SectionDivider />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}


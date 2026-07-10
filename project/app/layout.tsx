import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://airdrophunt.net'),
  title: 'Muhammad Areesh — Full Stack Developer',
  description:
    'Full Stack Developer with 2 years of experience building scalable web applications, engaging user experiences, and modern digital products.',
  keywords: [
    'Muhammad Areesh',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Muhammad Areesh' }],
  creator: 'Muhammad Areesh',
  openGraph: {
    title: 'Muhammad Areesh — Full Stack Developer',
    description:
      'Full Stack Developer with 2 years of experience building scalable web applications and modern digital products.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Areesh — Full Stack Developer',
    description:
      'Full Stack Developer with 2 years of experience building scalable web applications and modern digital products.',
  },
};

export const viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}

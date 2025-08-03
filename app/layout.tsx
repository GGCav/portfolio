import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jinfeng He - Portfolio',
  description: 'Full-stack developer and researcher at Cornell University',
  icons: {
    icon: [
      {
        url: '/GGCav Black Hexagonal Icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/GGCav Black Hexagonal Icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/GGCav Black Hexagonal Icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Jinfeng He - Portfolio',
    description: 'Full-stack developer and researcher at Cornell University',
    images: [
      {
        url: '/GGCav Black Hexagonal Icon.png',
        width: 512,
        height: 512,
        alt: 'GGCav Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Jinfeng He - Portfolio',
    description: 'Full-stack developer and researcher at Cornell University',
    images: ['/GGCav Black Hexagonal Icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/GGCav Black Hexagonal Icon.png" />
        <link rel="apple-touch-icon" href="/GGCav Black Hexagonal Icon.png" />
        <link rel="shortcut icon" href="/GGCav Black Hexagonal Icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
} 
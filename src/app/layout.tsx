import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://squareserver.in'),
  title: {
    default: 'SquareServer - Premier IT Solutions & R&D',
    template: '%s | SquareServer'
  },
  description: 'Leading IT solutions company specializing in cutting-edge technology development, research & development, and innovative software solutions for enterprises.',
  keywords: ['IT Solutions', 'Software Development', 'Research and Development', 'Technology Consulting', 'Web Development', 'Mobile Apps', 'AI/ML'],
  authors: [{ name: 'SquareServer' }],
  creator: 'SquareServer',
  icons: {
    icon: '/logo1.png',
    shortcut: '/logo1.png',
    apple: '/logo1.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://squareserver.in',
    title: 'SquareServer - Premier IT Solutions & R&D',
    description: 'Leading IT solutions company specializing in cutting-edge technology development and research.',
    siteName: 'SquareServer',
    images: [
      {
        url: '/logo1.png',
        width: 1200,
        height: 630,
        alt: 'SquareServer Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SquareServer - Premier IT Solutions & R&D',
    description: 'Leading IT solutions company specializing in cutting-edge technology development and research.',
    creator: '@squareserver',
    images: ['/logo1.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SettingsProvider } from '@/contexts/settingsContext';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { PostHogProvider } from './posthog-provider';
import type { ReactNode } from 'react';

const montserratFont = localFont({
  src: [
    {
      path: './fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Black.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'IaC Toolbox - Infrastructure as Code Tutorials for AWS & Terraform',
  description:
    'Learn to deploy production-ready AWS infrastructure with Terraform. Free, open source tutorials for modern developers.',
  generator: 'Next.js',
  keywords: [
    'Infrastructure as Code',
    'IaC',
    'Terraform',
    'AWS',
    'deployment',
    'DevOps',
    'open source',
    'tutorials',
  ],
  authors: [{ name: 'Viktor Vasylkovskyi' }],
  openGraph: {
    images: ['/opengraph-image.png'],
    type: 'website',
    url: 'https://iac-toolbox.com/',
    title: 'IaC Toolbox - Infrastructure as Code Tutorials',
    description:
      'Learn to deploy production-ready AWS infrastructure with Terraform. Free, open source tutorials for modern developers.',
    siteName: 'IaC Toolbox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IaC Toolbox - Infrastructure as Code Tutorials',
    description: 'Learn to deploy production-ready AWS infrastructure with Terraform.',
  },
  icons: {
    icon: [
      {
        url: '/iac-toolbox-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/iac-toolbox-logo-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/iac-toolbox-logo.svg',
        type: 'image',
      },
    ],
    apple: '/iac-toolbox-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SettingsProvider>
        <html
          lang='en'
          className={`${montserratFont.className} bg-background`}
          suppressHydrationWarning
        >
          <body className='flex flex-col min-h-screen'>
            <PostHogProvider>{children}</PostHogProvider>
          </body>
        </html>
      </SettingsProvider>
    </ThemeProvider>
  );
}

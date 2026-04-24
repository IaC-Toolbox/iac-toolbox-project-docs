import '../fumadocs.css';

import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <HomeLayout className='items-center home-page' {...baseOptions()}>
        {children}
      </HomeLayout>
    </RootProvider>
  );
}

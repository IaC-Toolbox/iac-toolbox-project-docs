import './fumadocs.css';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { RootProvider } from 'fumadocs-ui/provider/next';

// eslint-disable-next-line no-undef
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <RootProvider>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        sidebar={{
          tabs: [
            {
              title: 'Building MVP Infra from Scratch',
              url: '/docs/v1-beginner-infrastructure-as-code/',
            },
            {
              title: 'Private On-Premises Infrastructure',
              url: '/docs/v0-private-on-premises-infrastructure/',
            },
            {
              title: 'A Journey to Production-Ready App',
              url: '/docs/v2-production-ready-infrastructure-as-code/',
            },
          ],
        }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

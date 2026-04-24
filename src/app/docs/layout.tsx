import '../fumadocs.css';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

// eslint-disable-next-line no-undef
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <RootProvider>
      <DocsLayout tree={source.pageTree} {...baseOptions()}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

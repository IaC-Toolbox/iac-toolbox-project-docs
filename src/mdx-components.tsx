import defaultMdxComponents from 'fumadocs-ui/mdx';
import dynamic from 'next/dynamic';
import type { MDXComponents } from 'mdx/types';

const Mermaid = dynamic(() => import('@/components/mermaid'), { ssr: false });

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    ...components,
  };
}

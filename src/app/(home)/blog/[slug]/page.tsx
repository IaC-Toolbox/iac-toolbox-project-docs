import { blog } from '@/lib/source';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { getMDXComponents } from '@/mdx-components';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = blog.getPage([slug]);

  if (!page) {
    notFound();
  }

  const date = new Date(page.data.date as string);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const MDX = page.data.body;

  return (
    <main className="container py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="size-4" />
        Back to Blog
      </Link>

      <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto">
        <header className="mb-8 not-prose">
          <h1 className="text-4xl font-bold text-fd-foreground mb-4">
            {page.data.title}
          </h1>
          <div className="flex items-center gap-2 text-fd-muted-foreground">
            <span>{page.data.author as string}</span>
            <span>•</span>
            <time dateTime={page.data.date as string}>{formattedDate}</time>
          </div>
        </header>

        {page.data.toc && page.data.toc.length > 0 && (
          <div className="mb-8 not-prose">
            <InlineTOC items={page.data.toc} />
          </div>
        )}

        <div className="mdx-content">
          <MDX components={getMDXComponents()} />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return blog.generateParams().map((params) => ({
    slug: params.slug.join('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = blog.getPage([slug]);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

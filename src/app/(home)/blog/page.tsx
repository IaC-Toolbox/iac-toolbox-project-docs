import { blog } from '@/lib/source';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tutorials, guides, and updates for IaC Toolbox',
};

export default function BlogPage() {
  const posts = blog.getPages();

  // Sort by date descending (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.date as string);
    const dateB = new Date(b.data.date as string);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <main className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fd-foreground mb-2">Blog</h1>
        <p className="text-fd-muted-foreground">
          Tutorials, guides, and updates for IaC Toolbox
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => {
          const date = new Date(post.data.date as string);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <Link
              key={post.url}
              href={post.url}
              className="block p-6 bg-fd-card border border-fd-border rounded-lg hover:bg-fd-accent transition-colors"
            >
              <h2 className="text-xl font-semibold text-fd-foreground mb-2">
                {post.data.title}
              </h2>
              {post.data.description && (
                <p className="text-fd-muted-foreground mb-4">
                  {post.data.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-sm text-fd-muted-foreground">
                <span>{post.data.author as string}</span>
                <span>•</span>
                <time dateTime={post.data.date as string}>{formattedDate}</time>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

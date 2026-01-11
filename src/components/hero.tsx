import { Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GITHUB_URL = 'https://github.com/IaC-Toolbox/iac-toolbox-project';
const DOCS_URL = 'https://www.iac-toolbox.com/docs/v1-beginner-infrastructure-as-code';

const BADGE_TEXT = 'Terraform AWS Deployment Tutorials';
const HERO_TITLE_MAIN = 'Your Infrastructure';
const HERO_TITLE_HIGHLIGHT = ' Toolkit';
const HERO_DESCRIPTION =
  'Open source, step-by-step Terraform tutorials for deploying production-ready AWS infrastructure. Built for startups and developers who want to ship fast.';
const TUTORIALS_CTA_TEXT = 'View Tutorials';
const GITHUB_CTA_TEXT = 'Star on GitHub';

const STATS = [
  { value: 'IaC', label: 'Tutorials' },
  { value: '100%', label: 'Open Source' },
  { value: 'AWS', label: 'Focused' },
  { value: 'Free', label: 'Forever' },
];

export function Hero({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${sectionClassnames}`}>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(167,139,250,0.08),transparent)] dark:bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(167,139,250,0.05),transparent)]' />
      </div>

      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
            </span>
            <span className='text-muted-foreground'>{BADGE_TEXT}</span>
          </div>

          {/* Heading */}
          <h1 className='mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl'>
            {HERO_TITLE_MAIN}
            <span className='text-primary'>{HERO_TITLE_HIGHLIGHT}</span>
          </h1>

          {/* Description */}
          <p className='mb-8 text-lg text-muted-foreground text-pretty md:text-xl max-w-2xl mx-auto'>
            {HERO_DESCRIPTION}
          </p>

          {/* CTAs - Tutorials is now primary, GitHub is secondary */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button asChild size='lg' className='gap-2 min-h-[52px] px-8 w-full sm:w-auto'>
              <a href={DOCS_URL} target='_blank' rel='noopener noreferrer'>
                <BookOpen className='h-5 w-5' />
                {TUTORIALS_CTA_TEXT}
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='gap-2 min-h-[52px] px-8 w-full sm:w-auto bg-transparent'
            >
              <a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
                <Star className='h-4 w-4' />
                {GITHUB_CTA_TEXT}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className='mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8'>
            {STATS.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-2xl font-bold md:text-3xl'>{stat.value}</div>
                <div className='text-sm text-muted-foreground'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

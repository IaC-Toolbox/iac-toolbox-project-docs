import { Star, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GITHUB_URL = 'https://github.com/IaC-Toolbox/iac-toolbox-project';
const DOCS_URL = '/docs';

const SECTION_TITLE = 'Star Us on GitHub';
const SECTION_DESCRIPTION =
  'If IaC Toolbox helps you deploy faster, show your support with a GitHub star. It helps others discover the project!';
const GITHUB_CTA_TEXT = 'Star on GitHub';
const DOCS_CTA_TEXT = 'View Tutorials';
const OPEN_SOURCE_TEXT = '100% Open Source';
const LICENSE_TEXT = 'MIT License';

export function CTASection({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='mb-6 inline-flex items-center justify-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10'>
              <Star className='h-8 w-8 text-primary' />
            </div>
          </div>

          <h2 className='text-3xl font-bold tracking-tight md:text-4xl mb-4 text-balance'>
            {SECTION_TITLE}
          </h2>

          <p className='text-lg text-muted-foreground mb-8 text-pretty max-w-xl mx-auto'>
            {SECTION_DESCRIPTION}
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button asChild size='lg' className='gap-2 min-h-[52px] px-8 w-full sm:w-auto'>
              <a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
                <Star className='h-5 w-5' />
                {GITHUB_CTA_TEXT}
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='gap-2 min-h-[52px] px-8 w-full sm:w-auto bg-transparent'
            >
              <a href={DOCS_URL} target='_blank' rel='noopener noreferrer'>
                {DOCS_CTA_TEXT}
                <ArrowRight className='h-4 w-4' />
              </a>
            </Button>
          </div>

          <div className='mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Github className='h-4 w-4' />
              <span>{OPEN_SOURCE_TEXT}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Star className='h-4 w-4' />
              <span>{LICENSE_TEXT}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

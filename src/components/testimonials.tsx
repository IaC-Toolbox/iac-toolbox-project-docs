import { Quote } from 'lucide-react';

const SECTION_LABEL = 'Why IaC Toolbox Exists';
const SECTION_TITLE = 'Built from real startup infrastructure';
const TESTIMONIAL_TEXT =
  "I've worked at startups where infrastructure complexity grew faster than the company. By the time we needed to pursue SOC 2, progress slowed to a crawl — changes were risky and even small improvements took too long. IaC Toolbox is a cleaned-up, opinionated version of the Terraform and AWS setups I wish we had from the start.";
const AUTHOR_NAME = 'Viktor Vasylkovskyi';
const AUTHOR_TITLE = 'Senior Software Engineer, PagerDuty';

export function Testimonials({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl'>
          <div className='text-center mb-12'>
            <p className='text-sm font-medium text-primary mb-2 uppercase tracking-wide'>
              {SECTION_LABEL}
            </p>
            <h2 className='mb-4 text-3xl font-bold md:text-4xl'>{SECTION_TITLE}</h2>
          </div>

          <div className='rounded-lg border border-border bg-card p-8 md:p-12 relative'>
            <Quote className='absolute top-6 left-6 h-8 w-8 text-primary/20' />
            <blockquote className='relative'>
              <p className='text-lg md:text-xl text-foreground leading-relaxed mb-6'>
                {TESTIMONIAL_TEXT}
              </p>
              <footer className='flex items-center gap-4'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg'>
                  VV
                </div>
                <div>
                  <div className='font-semibold'>{AUTHOR_NAME}</div>
                  <div className='text-sm text-muted-foreground'>{AUTHOR_TITLE}</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

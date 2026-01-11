import { Code, Zap, FileText, TrendingUp } from 'lucide-react';

const SECTION_TITLE = 'Learn by Building Real Infrastructure';
const SECTION_DESCRIPTION =
  'Not toy examples. Real AWS resources you can deploy, modify, and scale.';

const values = [
  {
    icon: Code,
    action: 'Deploy production AWS resources',
    outcome: 'VPCs, compute, databases, load balancers, secrets management',
    why: 'all from Terraform.',
  },
  {
    icon: Zap,
    action: 'Built for startup budgets',
    outcome: 'Run your MVP infrastructure for ~$50–$100/month',
    why: 'without cutting corners.',
  },
  {
    icon: FileText,
    action: 'Opinionated and documented',
    outcome: 'Follow a clear path that works',
    why: 'not "choose-your-own-adventure" AWS.',
  },
  {
    icon: TrendingUp,
    action: "Grow when you're ready",
    outcome: 'Start simple, then add security, compliance, and scale',
    why: 'at your own pace.',
  },
];

export function ValueProposition({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h2 className='mb-4 text-3xl font-bold md:text-4xl'>{SECTION_TITLE}</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>{SECTION_DESCRIPTION}</p>
          </div>

          <div className='grid gap-8 md:grid-cols-2'>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className='group relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50'
                >
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                    <Icon className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>{value.action}</h3>
                  <p className='text-muted-foreground'>
                    {value.outcome} <span className='text-foreground font-medium'>{value.why}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

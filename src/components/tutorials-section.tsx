import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// URLs
const DOCS_URL = 'https://www.iac-toolbox.com/docs/v1-beginner-infrastructure-as-code';

// Section text
const SECTION_TITLE = '8 Comprehensive Tutorials';
const SECTION_DESCRIPTION =
  'From zero to production-ready infrastructure. Each tutorial builds on the previous one.';
const CTA_TEXT = 'Start Learning';

const tutorials = [
  {
    title: 'VPC & Networking & Deploying EC2 instance on AWS with Terraform',
    description:
      'Configure Virtual Private Clouds for secure infrastructure, Launch and configure your first EC2 instance for web applications',
    duration: '15 min',
    level: 'Beginner',
  },
  {
    title: 'Provision DNS records with Terraform',
    description: 'Expose your domain to the internet by managing DNS records',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    title: 'Provisioning EC2 Instances with Terraform Modules – Best Practices Guide',
    description: 'Learn how to use Terraform modules to provision EC2 instances effectively',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    title: 'Provisioning SSL Certificate',
    description: 'Secure your applications with SSL/TLS certificates using AWS Certificate Manager',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    title: 'Provisioning API Gateway and connecting it to Ec-2',
    description: 'Expose your backend services securely using API Gateway',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    title: 'Provisioning Application Load Balancer and connecting it to Ec-2 instance',
    description: 'Distribute incoming traffic across multiple EC2 instances',
    duration: '15 min',
    level: 'Beginner',
  },
  {
    title: 'Provision AWS Secret Manager Retrieval of Secrets',
    description: 'Securely manage and retrieve sensitive information using AWS Secrets Manager',
    duration: '10 min',
    level: 'Beginner',
  },
  {
    title: 'RDS Database Setup - Provisioning PostgresSQL RDBMS',
    description: 'Set up managed databases with Amazon RDS',
    duration: '10 min',
    level: 'Beginner',
  },
];

export function TutorialsSection({ sectionClassnames }: { sectionClassnames: string }) {
  return (
    <section id='tutorials' className={`py-16 md:py-24 ${sectionClassnames}`}>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center mb-12'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl mb-4'>{SECTION_TITLE}</h2>
          <p className='text-lg text-muted-foreground'>{SECTION_DESCRIPTION}</p>
        </div>

        <div className='mx-auto max-w-5xl grid gap-4 md:grid-cols-2'>
          {tutorials.map((tutorial, index) => (
            <Card key={tutorial.title} className='group hover:border-primary/50 transition-colors'>
              <CardHeader className='pb-2'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground mb-2'>
                  <span className='bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    {tutorial.duration}
                  </span>
                  <span className='flex items-center gap-1'>
                    <BookOpen className='h-3 w-3' />
                    {tutorial.level}
                  </span>
                </div>
                <CardTitle className='text-base group-hover:text-primary transition-colors'>
                  {tutorial.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Button asChild size='lg' className='gap-2 min-h-[52px]'>
            <a href={DOCS_URL} target='_blank' rel='noopener noreferrer'>
              {CTA_TEXT}
              <ArrowRight className='h-4 w-4' />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

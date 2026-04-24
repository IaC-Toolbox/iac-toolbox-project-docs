'use client';

import Link from 'next/link';
import { Star, Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import Image from 'next/image';

// URLs
const GITHUB_URL = 'https://github.com/IaC-Toolbox/iac-toolbox-project';
const DOCS_URL = 'https://www.iac-toolbox.com/docs/v1-beginner-infrastructure-as-code';

// Text content
const BRAND_NAME = 'IaC Toolbox';
const LOGO_ALT = 'IaC Toolbox Logo';

export function NavTitle() {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <Image src='/iac-toolbox-logo.svg' alt={LOGO_ALT} width={40} height={40} />
      <span className='font-bold text-lg'>{BRAND_NAME}</span>
    </Link>
  );
}

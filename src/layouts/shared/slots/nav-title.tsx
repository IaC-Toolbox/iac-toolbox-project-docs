'use client';

import Link from 'next/link';
import Image from 'next/image';
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

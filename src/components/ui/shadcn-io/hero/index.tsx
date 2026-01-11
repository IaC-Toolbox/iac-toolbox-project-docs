'use client';

import { Button } from '@/components/ui/button';
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';
import Image from 'next/image';

import Link from 'next/link';
import type { FC } from 'react';
import { HexagonBackground } from '../hexagon-background';

type HeroScreenProps = {
  announcementTag?: string;
  announcementTitle?: string;
  announcementUrl?: string;
  title: string;
  description: string;
  primaryActionText: string;
  primaryActionLink: string;
  secondaryActionText?: string;
  secondaryActionLink?: string;
};

const logoSize = 128;

const HeroScreen: FC<HeroScreenProps> = ({
  announcementTag,
  announcementTitle,
  announcementUrl,
  title,
  description,
  primaryActionText,
  primaryActionLink,
  secondaryActionText,
  secondaryActionLink,
}) => (
  <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background'>
    <div className='flex flex-col gap-16 px-8 py-24 text-center z-10 pointer-events-none'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <div className='flex flex-col items-center justify-center'>
          <Image
            src='/logo.png'
            alt='Infrastructure as Code Toolbox Project Logo'
            width={logoSize}
            height={logoSize}
          />
        </div>
        {announcementUrl && (
          <Link href={announcementUrl}>
            <Announcement>
              <AnnouncementTag>{announcementTag}</AnnouncementTag>
              <AnnouncementTitle>{announcementTitle}</AnnouncementTitle>
            </Announcement>
          </Link>
        )}
        <h1 className='mb-0 text-balance font-medium text-2xl md:text-3xl xl:text-6xl'>{title}</h1>
        <p className='mt-0 mb-0 text-balance text-lg text-muted-foreground'>{description}</p>
        <div className='flex items-center gap-2 pointer-events-auto'>
          <Button asChild size={'lg'}>
            <Link href={primaryActionLink}>{primaryActionText}</Link>
          </Button>
          {secondaryActionLink && secondaryActionText && (
            <Button asChild variant='outline'>
              <Link className='no-underline' href={secondaryActionLink}>
                {secondaryActionText}
              </Link>
            </Button>
          )}
          {/* <GithubStars /> */}
        </div>
      </div>
    </div>
    <HexagonBackground
      hexagonSize={75}
      hexagonMargin={3}
      className='absolute inset-0'
    ></HexagonBackground>

    {/* <RetroGrid /> */}
  </div>
);

export default HeroScreen;

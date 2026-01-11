'use client';

import { ThemeToggleGif } from '@/components/molecules/theme-toggle-gif/theme-toggle-gif';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const logoSize = 36;
// Simple logo component for the navbar
const Logo = () => {
  return (
    <Image
      src='/logo.png'
      alt='Infrastructure as Code Toolbox Project Logo'
      width={logoSize}
      height={logoSize}
    />
  );
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M4 12L20 12'
      className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
    />
    <path
      d='M4 12H20'
      className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
    />
    <path
      d='M4 12H20'
      className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
    />
  </svg>
);

// Types
export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}

// Default navigation links
// const defaultNavigationLinks: Navbar01NavLink[] = [
//   { href: '#', label: 'Home', active: true },
//   // { href: '#docs', label: 'Documentation' },
//   // { href: "#about", label: "About" },
// ];

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      // logoHref = '#',
      // navigationLinks = defaultNavigationLinks,
      // signInText = 'Sign In',
      // signInHref = '#signin',
      ctaText = 'Get Started',
      // ctaHref = '/app',
      // onSignInClick,
      onCtaClick,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
          className,
        )}
        {...props}
      >
        <div className='container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4'>
          {/* Left side */}
          <div className='flex items-center gap-2'>
            {/* Main nav */}
            <div className='flex items-center gap-6'>
              <button
                onClick={(e) => e.preventDefault()}
                className='flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer'
              >
                <span className='hidden font-bold text-xl sm:inline-block'>
                  Infrastructure as Code Toolbox Project
                </span>
              </button>

              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className='flex'>
                  {/* <NavigationMenuList className='gap-1'>
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className={cn(
                            'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline',
                            link.active
                              ? 'bg-accent text-accent-foreground'
                              : 'text-foreground/80 hover:text-foreground',
                          )}
                        >
                          {link.label}
                        </button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList> */}
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className='flex items-center gap-3'>
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (onSignInClick) onSignInClick();
              }}
            >
              {signInText}
            </Button> */}
            <ThemeToggleGif />
            <Button
              size='sm'
              className='text-sm font-medium px-4 h-9 rounded-md shadow-sm cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                if (onCtaClick) onCtaClick();
              }}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </header>
    );
  },
);

Navbar01.displayName = 'Navbar01';

export { HamburgerIcon, Logo };

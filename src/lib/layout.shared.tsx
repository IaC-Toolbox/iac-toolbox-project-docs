import { NavTitle } from '@/layouts/shared/slots/nav-title';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // component: <NavTitle />,
      title: <NavTitle />,
    },
    githubUrl: 'https://github.com/IaC-Toolbox/iac-toolbox-project',
    links: [
      {
        icon: <BookIcon />,
        text: 'Documentation',
        url: '/docs',
        // secondary items will be displayed differently on navbar
        secondary: false,
        active: 'nested-url',
      },
      {
        icon: <BookIcon />,
        text: 'Blog',
        url: '/blog',
        // secondary items will be displayed differently on navbar
        secondary: false,
        active: 'nested-url',
      },
    ],
  };
}

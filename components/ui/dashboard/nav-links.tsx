'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  FileIcon,
  PersonIcon,
  TokensIcon,
} from '@radix-ui/react-icons';
import { Button } from '../button';
import { Locale } from '@/lib/i18n/i18n-config';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: FileIcon,
  // },
  // { name: 'Customers', href: '/dashboard/customers', icon: PersonIcon },
  { name: 'Tokens', href: '/dashboard/tokens', icon: TokensIcon },
];

export default function NavLinks({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        console.log('lang', lang, link.href, pathname);
        return (
          <Link
            key={link.href}
            href={`/${lang}${link.href}`}
            className={clsx(
              'flex h-[48px] w-full grow items-center justify-center gap-2 border-b-[1px] border-green-500 p-3 text-sm font-medium hover:opacity-50 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-green-500': pathname === `/${lang}${link.href}`,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

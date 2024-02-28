'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button } from '../button';
import { Locale } from '@/lib/i18n/i18n-config';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: FileIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: PersonIcon },
];

export default function NavLinks({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        console.log('lang', lang, link.href, pathname);
        return (
          <Button
            key={link.name}
            asChild
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 bg-gray-500 p-3 text-sm font-medium hover:bg-gray-50 hover:text-gray-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-100 text-gray-800':
                  pathname === `/${lang}${link.href}`,
              },
            )}
          >
            <Link
              href={`/${lang}${link.href}`}
              className="flex w-full justify-center"
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Button>
        );
      })}
    </>
  );
}

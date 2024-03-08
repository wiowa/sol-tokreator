'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import { LoopIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-[48px] w-full cursor-pointer items-center p-3 hover:text-green-500">
          <LoopIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="ml-2">Locale switcher</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

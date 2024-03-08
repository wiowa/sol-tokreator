import Link from 'next/link';
import NavLinks from '@/components/ui/dashboard/nav-links';
import AcmeLogo from '@/components/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import { ModeToggle } from '../dark-mode-switcher';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import { set } from '@/lib/session-store';
import { redirect } from 'next/navigation';

export default function SideNav({ lang }: { lang: Locale }) {
  return (
    <div className="flex h-full flex-col border-r-2 border-green-500 py-4">
      <Link
        className="mb-8 flex h-20 items-end justify-start rounded-md border-b-2 border-green-500 p-4 md:h-40"
        href="/"
      >
        <div className="w-32  md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks lang={lang} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <LocaleSwitcher />
        <ModeToggle />
        <form
          action={async () => {
            'use server';
            await set('pubKey', '');
            redirect('/');
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

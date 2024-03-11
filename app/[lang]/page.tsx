import AcmeLogo from '@/components/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/components/ui/home.module.css';
import { lusitana, inter } from '@/components/ui/fonts';
import Image from 'next/image';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import { Button } from '@/components/ui/button';

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  console.log('lang', lang);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg p-4 md:h-[52px]">
        <AcmeLogo />
        <Button
          asChild
          className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
        >
          <Link href="/login">
            <span>Log in</span>
          </Link>
        </Button>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg  px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${inter.className} text-2xl font-bold md:text-5xl md:leading-normal`}
          >
            Create <span className="text-green-500">permissioned</span> Solana
            tokens on a permissionless network
          </p>
          <p>
            Token extensions unlock rich native functionality designed for
            complex behaviors, without compromising on security or scalability.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        {/* <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-desktop.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div> */}
      </div>
    </main>
  );
}

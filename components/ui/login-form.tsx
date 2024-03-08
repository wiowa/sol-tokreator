'use client';
import React from 'react';
import { oxygen } from '@/components/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { authenticate } from '@/lib/actions/authentication';
import { usePhantomContext } from '@/context/phantom-provider';
import { useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
// import { get, set } from '@/lib/session-store';

export default function LoginForm({
  lang,
  handleLogin,
}: {
  lang: Locale;
  handleLogin: (pubKey: string) => void;
}) {
  const { setWallet, setProvider, wallet } = usePhantomContext();
  const router = useRouter();
  const getPhantomProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      console.log('provider', provider);
      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
  };

  React.useEffect(() => {
    if (wallet) router.push(`/${lang}/dashboard/tokens`);
  }, []);

  const onLogin = async (getProvider: () => any) => {
    const provider = getProvider();
    console.log('provider', provider);
    setProvider(provider);
    try {
      const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      const pubKey = resp.publicKey.toString();
      setWallet(pubKey);
      handleLogin(pubKey);
      router.push(`/${lang}/dashboard/tokens`);
    } catch (err) {
      console.log('error while connect', err);
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`${oxygen.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <Button onClick={() => onLogin(getPhantomProvider)}>
          Connect with phantom
        </Button>
      </div>
    </div>
  );
}

import AcmeLogo from '@/components/ui/acme-logo';
import LoginForm from '@/components/ui/login-form';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import { get, set } from '@/lib/session-store';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const handleLogin = async (pubKey: string) => {
    'use server';
    await set('pubKey', pubKey);
  };
  const pubKey = await get('pubKey');
  if (pubKey) redirect(`/${lang}/dashboard/tokens`);
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 rounded-lg border-2 border-green-500 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
          <div className="w-32 md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm lang={lang} handleLogin={handleLogin} />
      </div>
    </main>
  );
}

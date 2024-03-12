import Form from '@/components/ui/tokens/create-form';
import Breadcrumbs from '@/components/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/lib/data';
import { Locale } from '@/lib/i18n/i18n-config';
import { get } from '@/lib/session-store';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const wallet = await get('pubKey');
  return (
    <main className="px-8">
      <div className="sticky top-0 z-10 bg-white pb-3 pt-6 dark:bg-stone-950 md:pb-3 md:pt-12">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Tokens', href: `/${lang}/dashboard/tokens` },
            {
              label: 'Add Token',
              href: `/${lang}/dashboard/tokens/create`,
              active: true,
            },
          ]}
        />
      </div>
      <Form lang={lang} wallet={wallet} />
    </main>
  );
}

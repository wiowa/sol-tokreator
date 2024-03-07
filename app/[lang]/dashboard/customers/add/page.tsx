import Form from '@/components/ui/invoices/create-form';
import Breadcrumbs from '@/components/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/lib/data';
import { Locale } from '@/lib/i18n/i18n-config';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: `/${lang}/dashboard/customers` },
          {
            label: 'Add Customer',
            href: `/${lang}/dashboard/customers/add`,
            active: true,
          },
        ]}
      />
      <p>ADD CUSTOMER</p>
    </main>
  );
}

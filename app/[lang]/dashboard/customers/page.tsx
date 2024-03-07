import { Suspense } from 'react';
import { Metadata } from 'next';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import Search from '@/components/ui/search';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import Table from '@/components/ui/customers/table';
import Pagination from '@/components/ui/paginationWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { AddCustomer } from '@/components/ui/customers/buttons';

import { fetchCustomersPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Customers | Acme Dashboard',
};

export default async function Page({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const dictionary = await getDictionary(lang);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">{dictionary.customers.title}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <AddCustomer href={`/${lang}/dashboard/customers/add`} />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

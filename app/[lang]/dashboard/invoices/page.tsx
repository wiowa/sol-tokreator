import Pagination from '@/components/ui/paginationWrapper';
import Search from '@/components/ui/search';
import Table from '@/components/ui/invoices/table';
import { CreateInvoice } from '@/components/ui/invoices/buttons';
import { lusitana } from '@/components/ui/fonts';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  console.log('total pages', totalPages);
  return (
    <div className="w-full px-6 md:px-12">
      <div className="sticky top-0 z-10 bg-white pb-3 pt-6 dark:bg-stone-950 md:pb-3 md:pt-12">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>
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

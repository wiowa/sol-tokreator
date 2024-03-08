import Pagination from '@/components/ui/paginationWrapper';
import Search from '@/components/ui/search';
import Table from '@/components/ui/tokens/table';
import { CreateToken } from '@/components/ui/tokens/buttons';
import { oxygen } from '@/components/ui/fonts';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchTokensPages } from '@/lib/data/tokens';
import { Metadata } from 'next';
import { get, set } from '@/lib/session-store';
import { Locale } from '@/lib/i18n/i18n-config';
import { redirect } from 'next/navigation';
import { fetchFilteredTokens } from '@/lib/data/tokens';
export const metadata: Metadata = {
  title: 'Tokens | Acme Dashboard',
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
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTokensPages(query);
  console.log('total pages', totalPages);
  const pubKey = await get('pubKey');
  const tokens = await fetchFilteredTokens(query, currentPage, pubKey);
  return (
    <div className="w-full px-6 md:px-12">
      <div className="sticky top-0 z-10 bg-white pb-3 pt-6 dark:bg-stone-950 md:pb-3 md:pt-12">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${oxygen.className} text-2xl`}>Tokens</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
          <CreateToken lang={lang} />
        </div>
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table tokens={tokens} lang={lang} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

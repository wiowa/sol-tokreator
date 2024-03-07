'use client';

import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function PaginationWrapper({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  // NOTE: comment in this code when you get to this point in the course
  const allPages = generatePagination(currentPage, totalPages);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            href={createPageURL(currentPage - 1)}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          if (page === '...')
            return (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            );
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationNext
          disabled={currentPage === totalPages}
          href={createPageURL(currentPage + 1)}
        />
      </PaginationContent>
    </Pagination>
  );
}

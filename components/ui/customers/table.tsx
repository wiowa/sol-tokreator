import Image from 'next/image';
import { lusitana } from '@/components/ui/fonts';
import Search from '@/components/ui/search';
import { CustomersTableType, FormattedCustomersTable } from '@/lib/definitions';
import { fetchFilteredCustomers } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);
  return (
    <Table className="mt-5">
      <TableCaption>List of cutomers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Total Invoices</TableHead>
          <TableHead>Total Pending</TableHead>
          <TableHead>Total Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="flex items-center gap-3">
              <Image
                src={customer.image_url}
                className="rounded-full"
                alt={`${customer.name}'s profile picture`}
                width={28}
                height={28}
              />
              <span>{customer.name}</span>
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.total_invoices}</TableCell>
            <TableCell>{customer.total_pending}</TableCell>
            <TableCell>{customer.total_paid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

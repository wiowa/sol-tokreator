'use client';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TokensTable } from '@/lib/definitions/tokens';
import Link from 'next/link';

export default function TokensTable({
  tokens,
  lang,
}: {
  tokens: TokensTable[];
  lang: string;
}) {
  console.log(tokens);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Metadata Url</TableHead>
          <TableHead>Supply</TableHead>
          <TableHead>Decimals</TableHead>
          <TableHead>Creation Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens &&
          tokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell className="flex items-center gap-4">
                <Link href={`/${lang}/dashboard/tokens/${token.id}`}>
                  {token.name}
                </Link>
              </TableCell>
              <TableCell>{token.metadataurl}</TableCell>
              <TableCell>{token.supply}</TableCell>
              <TableCell>{token.decimals}</TableCell>
              <TableCell>{format(token.date, 'MM/dd/yyyy')}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

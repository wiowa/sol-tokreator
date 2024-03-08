import Link from 'next/link';
import { deleteInvoice } from '@/lib/actions/invoices';
import { Button } from '../button';
import { Pencil2Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import { Locale } from '@/lib/i18n/i18n-config';

export function CreateToken({ lang }: { lang: Locale }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/${lang}/dashboard/tokens/create`}>
        <PlusIcon className="md:mr-2" />
        <span className="hidden md:block">Create Token</span>
      </Link>
    </Button>
  );
}

export function UpdateToken({ id }: { id: string }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/dashboard/tokens/${id}/edit`}>
        <Pencil2Icon />
      </Link>
    </Button>
  );
}

export function DeleteToken({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <Button variant="outline" className="bg-red-600 hover:bg-red-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="text-white" />
      </Button>
    </form>
  );
}

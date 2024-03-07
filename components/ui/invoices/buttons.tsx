import Link from 'next/link';
import { deleteInvoice } from '@/lib/actions/invoices';
import { Button } from '../button';
import { Pencil2Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons';

export function CreateInvoice() {
  return (
    <Button asChild variant="outline">
      <Link href="/dashboard/invoices/create">
        <PlusIcon className="md:mr-2" />
        <span className="hidden md:block">Create Invoice</span>{' '}
      </Link>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <Pencil2Icon />
      </Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
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

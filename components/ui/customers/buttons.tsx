import Link from 'next/link';
import { Button } from '../button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Url } from 'next/dist/shared/lib/router/router';

export function AddCustomer({ href }: { href: Url }) {
  return (
    <Button asChild variant="outline">
      <Link href={href}>
        <PlusIcon className="md:mr-2" />
        <span className="hidden md:block">Add User</span>{' '}
      </Link>
    </Button>
  );
}

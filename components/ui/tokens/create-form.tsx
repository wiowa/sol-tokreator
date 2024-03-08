'use client';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createToken } from '@/lib/actions/tokens';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Locale } from '@/lib/i18n/i18n-config';
import { Input } from '../input';

export default function Form({ lang, wallet }: { lang: Locale; wallet: any }) {
  const initialState = { message: null, errors: {} };
  const createTokenWithLang = createToken.bind(null, wallet, lang);
  const [state, dispatch] = useFormState(createTokenWithLang, initialState);

  return (
    <form action={dispatch}>
      <Card className="p-4 md:p-6">
        {/* Token Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <Input name="name" id="name" type="text" />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="symbol" className="mb-2 block text-sm font-medium">
            Symbol
          </label>
          <Input name="symbol" id="symbol" type="text" />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.symbol &&
              state.errors.symbol.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <div className="mb-4">
          <label
            htmlFor="metadataUrl"
            className="mb-2 block text-sm font-medium"
          >
            Metadata Url
          </label>
          <Input name="metadataUrl" id="metadataUrl" type="text" />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.metadataUrl &&
              state.errors.metadataUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="supply" className="mb-2 block text-sm font-medium">
            Supply
          </label>
          <Input name="supply" id="supply" type="number" />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.supply &&
              state.errors.supply.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="decimals" className="mb-2 block text-sm font-medium">
            Decimals
          </label>
          <Input name="decimals" id="decimals" type="number" />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.decimals &&
              state.errors.decimals.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}

'use client';

import * as React from 'react';
import { CustomerField } from '@/lib/definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectCustomer({ customers }: { customers: CustomerField[] }) {
  return (
    <Select name="customerId">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a customer..." />
      </SelectTrigger>
      <SelectContent>
        {customers.map((customer) => (
          <SelectItem key={customer.id} value={customer.id}>
            {customer.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

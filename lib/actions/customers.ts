'use server'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  email: z.string({ invalid_type_error: 'Please enter an email' }),
  name: z.string({ invalid_type_error: 'Please enter an email' }),
  creation: z.string(),
  update: z.string()
})

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
  };
  message?: string | null;
}

const AddCustomer = FormSchema.omit({ id: true, creation: true, update: true });

export async function addCustomer(prevState: State, formData: FormData) {
  const validatedFields = AddCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields?.error?.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { email, name } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
    INSERT INTO customers (email, name, creation, update)
    VALUES (${email}, ${name}, ${date})
  `;
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  const headersList = headers();
  const fullUrl = headersList.get('referer')
  const lang = fullUrl?.split('/')[3]
  revalidatePath(`/${lang}/dashboard/invoices`);
  redirect(`/${lang}/dashboard/invoices`);
}
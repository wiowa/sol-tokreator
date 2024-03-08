'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please fill token name field',
  }),
  symbol: z.string({
    invalid_type_error: 'Please fill symbol field',
  }),
  metadataUrl: z.string({
    invalid_type_error: 'Please fill metadata url field',
  }),
  supply: z.string(),
  decimals: z.string(),
  date: z.string(),
});

export type State = {
  errors?: {
    name?: string[];
    symbol?: string[];
    metadataUrl?: string[];
    supply?: string[];
    decimals?: string[];
  };
  message?: string | null;
};

const CreateToken = FormSchema.omit({ id: true, date: true });

export async function createToken(wallet: string, lang: string, prevState: State, formData: FormData) {

  const validatedFields = CreateToken.safeParse({
    name: formData.get('name'),
    symbol: formData.get('symbol'),
    metadataUrl: formData.get('metadataUrl'),
    supply: formData.get('supply'),
    decimals: formData.get('decimals'),
  });
  console.log('validatedFields.success', validatedFields.success)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Token.',
    };
  }
  const { name, symbol, metadataUrl, supply, decimals } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  console.log('date', date)
  try {
    await sql`
    INSERT INTO tokens (name, symbol, metadataUrl, supply, decimals, date, wallet)
    VALUES (${name}, ${symbol}, ${metadataUrl}, ${parseInt(supply)}, ${parseInt(decimals)}, ${date}, ${wallet})
  `;
  } catch (e) {
    console.log('e', e)
    return {
      message: 'Database Error: Failed to Create Token.',
    };
  }
  console.log('here')
  revalidatePath(`/${lang}/dashboard/tokens`);
  redirect(`/${lang}/dashboard/tokens`);
}
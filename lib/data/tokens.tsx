import { sql } from '@vercel/postgres';

import { TokensTable } from '../definitions/tokens';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredTokens(
  query: string,
  currentPage: number,
  pubKey: string,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tokens = await sql<TokensTable>`
      SELECT
      tokens.id,
      tokens.name,
      tokens.metadataUrl,
      tokens.supply,
      tokens.decimals,
      tokens.date
      FROM tokens
      WHERE
      tokens.wallet = ${pubKey} AND (
      tokens.name ILIKE ${`%${query}%`} OR
      tokens.metadataUrl ILIKE ${`%${query}%`} )
      ORDER BY tokens.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tokens.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tokens.');
  }
}

export async function fetchTokensPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tokens
    WHERE
    tokens.name ILIKE ${`%${query}%`} OR
    tokens.metadataUrl ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tokens.');
  }
}

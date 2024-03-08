import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from './lib/i18n/i18n-config';

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { get } from '@/lib/session-store';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin
  const locale = getLocale(request);
  console.log('pathname', request.nextUrl)
  const connectedWallet = await get('pubKey')
  console.log('connectedWallet', connectedWallet)
  if (!connectedWallet && pathname.includes('dashboard')) return NextResponse.redirect(new URL(`${origin}/${locale}/login`))
  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}


export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
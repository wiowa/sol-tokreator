import { Locale } from '@/lib/i18n/i18n-config';

export default function Page({
  params: { lang, tokenId },
}: {
  params: { lang: Locale; tokenId: string };
}) {
  return (
    <main>
      <h1>{tokenId}</h1>
    </main>
  );
}

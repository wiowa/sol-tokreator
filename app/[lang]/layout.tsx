import '@/style/global.css';
import { inter, oxygen } from '@/components/ui/fonts';
import { Metadata } from 'next';
import { ThemeProvider } from '@/context/theme-provider';
import { PhantomProvider } from '@/context/phantom-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${oxygen.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PhantomProvider>{children}</PhantomProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import SideNav from '@/components/ui/dashboard/sidenav';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav lang={lang} />
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}

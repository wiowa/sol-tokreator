import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { spaceGrotesk } from '@/components/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${spaceGrotesk.className} flex flex-row items-center leading-none`}
    >
      <p className="text-[30px]">
        <span className="text-green-500">Gennesis.</span>
        <span>xyz</span>
      </p>
    </div>
  );
}

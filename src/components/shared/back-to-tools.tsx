'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Renders a "Back to Tools" link that preserves the originating tab.
 * Reads ?from=<tabId> from the URL and links back to /consulting/tools/hub?tab=<tabId>.
 */
export function BackToTools({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const href = from ? `/consulting/tools/hub?tab=${from}` : '/consulting/tools/hub';
  const { t } = useTranslation('common');

  return (
    <Link
      href={href}
      className={
        className ??
        'inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6'
      }
    >
      <ArrowLeft className="w-4 h-4" aria-hidden />
      {t('backToTools', 'Back to Tools')}
    </Link>
  );
}

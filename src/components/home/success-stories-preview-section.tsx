'use client';

import { useTranslation } from 'react-i18next';
import { SuccessStoriesPreview } from '@/components/shared/success-stories-preview';

const HOMEPAGE_SUCCESS_STORY_CLIENTS = ['Solaraa', 'Anexx', 'Asta by Avim'] as const;
const HUB_SUCCESS_STORIES_TAB = '/consulting/case-studies/hub?tab=success-stories';

export function SuccessStoriesPreviewSection() {
  const { t } = useTranslation('home');
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-h2 mb-4">{t('successStoriesPreview.title')}</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto">
            {t('successStoriesPreview.subtitle')}
          </p>
        </div>
        <SuccessStoriesPreview
          clients={[...HOMEPAGE_SUCCESS_STORY_CLIENTS]}
          variant="full"
          viewAllHref={HUB_SUCCESS_STORIES_TAB}
          viewAllLabel={t('successStoriesPreview.exploreSuccessStories')}
        />
      </div>
    </section>
  );
}

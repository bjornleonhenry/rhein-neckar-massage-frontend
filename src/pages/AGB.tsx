
import { useTranslation } from '@/hooks/useTranslation';

const AGB = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">{t('agb.title')}</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.1.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.1.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.2.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.2.content')}
              </p>
              <div className="text-gray-300 space-y-2 ml-4">
                <p>{t('agb.section.2.company')}</p>
                <p>{t('agb.section.2.address')}</p>
                <p>{t('agb.section.2.city')}</p>
                <p>{t('agb.section.2.country')}</p>
                <p>{t('agb.section.2.email')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.3.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.3.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.3.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.4.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.4.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.4.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.5.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.5.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.5.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.6.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.6.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.7.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.7.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.7.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.8.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.8.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.9.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.9.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.9.content2')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('agb.section.9.content3')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('agb.section.10.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.section.10.content')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AGB;

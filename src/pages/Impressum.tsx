
import { useTranslation } from '@/hooks/useTranslation';

const Impressum = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">{t('impressum.title')}</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section1.title')}</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong>{t('impressum.section1.operator')}:</strong></p>
                <p>{t('impressum.section1.name')}</p>
                <p>{t('impressum.section1.street')}</p>
                <p>{t('impressum.section1.city')}</p>
                <p>{t('impressum.section1.country')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section2.title')}</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong>{t('impressum.section2.phone')}:</strong> {t('impressum.section2.phone_value')}</p>
                <p><strong>{t('impressum.section2.email')}:</strong> {t('impressum.section2.email_value')}</p>
                <p><strong>{t('impressum.section2.website')}:</strong> {t('impressum.section2.website_value')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section3.title')}</h2>
              <p className="text-gray-300">
                {t('impressum.section3.description')}
              </p>
              <p className="text-gray-300">{t('impressum.section3.vat_id')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section4.title')}</h2>
              <div className="text-gray-300 space-y-2">
                <p>{t('impressum.section4.name')}</p>
                <p>{t('impressum.section4.street')}</p>
                <p>{t('impressum.section4.city')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section5.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('impressum.section5.description')}
                <a href="https://ec.europa.eu/consumers/odr/" className="text-rose-400 hover:text-rose-300 underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-300">
                {t('impressum.section5.email_note')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section6.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('impressum.section6.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section7.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('impressum.section7.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section8.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('impressum.section8.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('impressum.section9.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('impressum.section9.description')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;

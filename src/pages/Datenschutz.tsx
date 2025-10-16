
import { useTranslation } from '@/hooks/useTranslation';

const Datenschutz = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-8">{t('datenschutz.title')}</h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section1.title')}</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">{t('datenschutz.section1.subtitle')}</h3>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section1.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section2.title')}</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">{t('datenschutz.section2.subtitle1')}</h3>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section2.content1')}
              </p>
              
              <h3 className="text-xl font-medium text-gray-300 mb-3">{t('datenschutz.section2.subtitle2')}</h3>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section2.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section3.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section3.content1')}
              </p>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section3.content2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section4.title')}</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">{t('datenschutz.section4.subtitle')}</h3>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section4.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section5.title')}</h2>
              <h3 className="text-xl font-medium text-gray-300 mb-3">{t('datenschutz.section5.subtitle')}</h3>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section5.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section6.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section6.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-4">{t('datenschutz.section7.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('datenschutz.section7.content')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;

import { Link } from 'react-router-dom';
import { AmbienteImageCarousel } from './AmbienteImageCarousel';
import { useTranslation } from '@/hooks/useTranslation';

const AmbientePreview = () => {
  const { t, isLoading } = useTranslation();

  if (isLoading) {
    return null;
  }
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <AmbienteImageCarousel />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white mb-4">{t('ambiente.section.title')}</h2>
          <p className="text-lg text-gray-300 mb-6">
            {t('ambiente.section.description')}
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center text-gray-300 text-base"><span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>{t('ambiente.features.whirlpool')}</li>
            <li className="flex items-center text-gray-300 text-base"><span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>{t('ambiente.features.bed')}</li>
            <li className="flex items-center text-gray-300 text-base"><span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>{t('ambiente.features.shower')}</li>
          </ul>
          <Link
            to="/ambiente"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-lg shadow-md"
          >
            {t('ambiente.button.discover')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AmbientePreview;

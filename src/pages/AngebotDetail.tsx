import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Euro, Star, Check, Heart, Zap, Users, Crown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Angebot {
  id: number;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image?: string;
  services?: string[] | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Helper function to parse services into an array
const parseServices = (services: string[] | string): string[] => {
  if (Array.isArray(services)) {
    return services;
  }
  if (typeof services === 'string') {
    try {
      if (services.startsWith('[')) {
        return JSON.parse(services);
      }
      return services.split(',').map((s: string) => s.trim()).filter((s: string) => s);
    } catch {
      return [];
    }
  }
  return [];
};

const AngebotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [angebots, setAngebots] = useState<Angebot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to resolve API base at runtime
  const getApiBase = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buildTime = (import.meta as any).env?.VITE_API_BASE as string | undefined;
      if (buildTime && buildTime !== 'undefined') return buildTime.replace(/\/$/, '');
    } catch {
      // ignore
    }
    // Allow injecting at runtime via a global
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const runtime = (window as any).__API_BASE || (window as any).__RUNTIME_CONFIG?.VITE_API_BASE;
    if (runtime) return String(runtime).replace(/\/$/, '');
    // Fallback to same-origin /api
    return `${window.location.origin.replace(/\/$/, '')}/api`;
  };

  useEffect(() => {
    const fetchAngebots = async () => {
      try {
        const apiBase = getApiBase();
        // Fetch all angebots by setting a high per_page value
        const response = await fetch(`${apiBase}/angebots?per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAngebots(data.data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchAngebots();
  }, []);

  // Find the specific angebot by ID
  const angebot = angebots.find(a => a.id === parseInt(id || '0'));

  // Get icon based on category
  const getIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'erotik':
        return <Heart className="w-12 h-12" />;
      case 'wellness':
        return <Zap className="w-12 h-12" />;
      case 'paar':
        return <Users className="w-12 h-12" />;
      case 'vip':
        return <Crown className="w-12 h-12" />;
      default:
        return <Star className="w-12 h-12" />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">{t('common.loading') || 'Laden...'}</p>
        </div>
      </div>
    );
  }

  if (error || !angebot) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="text-center">
          <p className="text-red-400 mb-4">{t('angebot.error.not_found') || 'Service nicht gefunden'}</p>
          <Link to="/angebot" className="text-rose-400 hover:text-rose-300">
            {t('common.back') || 'Zurück'}
          </Link>
        </div>
      </div>
    );
  }

  const services = parseServices(angebot.services || []);

  return (
    <div className="pt-0 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/angebot" 
            className="inline-flex items-center text-rose-400 hover:text-rose-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('common.back_to_overview') || 'Zurück zur Übersicht'}
          </Link>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card with Icon and Title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 border border-rose-900/30 rounded-xl p-8"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-rose-900/20 p-6 rounded-2xl flex-shrink-0">
                    <div className="text-rose-400">
                      {getIcon(angebot.category)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      {angebot.title}
                    </motion.h1>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex items-center gap-4 text-gray-300"
                    >
                      <span className="px-3 py-1 bg-rose-900/30 text-rose-300 rounded-full text-sm font-medium">
                        {angebot.category}
                      </span>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-6 mb-6 p-6 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-rose-400" />
                    <span className="font-semibold mr-2">{t('angebot.duration') || 'Dauer'}:</span>
                    {angebot.duration_minutes} {t('angebot.minutes') || 'Minuten'}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Euro className="w-5 h-5 mr-2 text-rose-400" />
                    <span className="font-semibold mr-2">{t('angebot.price') || 'Preis'}:</span>
                    {angebot.price}€
                  </div>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-gray-300 leading-relaxed text-lg"
                >
                  {angebot.description}
                </motion.p>
              </motion.div>

              {/* Services Included */}
              {services.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gray-900 border border-rose-900/30 rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-rose-400" />
                    {t('angebot.included_services') || 'Enthaltene Leistungen'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + idx * 0.05 }}
                        className="flex items-start text-gray-300 bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Check className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Important Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gray-900 border border-rose-900/30 rounded-xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t('angebot.important_info') || 'Wichtige Informationen'}
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start">
                    <Check className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                    {t('angebot.info.discretion') || '100% Diskretion garantiert'}
                  </p>
                  <p className="flex items-start">
                    <Check className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                    {t('angebot.info.professional') || 'Professionelle und einfühlsame Behandlung'}
                  </p>
                  <p className="flex items-start">
                    <Check className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                    {t('angebot.info.hygiene') || 'Höchste Hygiene-Standards'}
                  </p>
                  <p className="flex items-start">
                    <Check className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                    {t('angebot.info.appointment') || 'Terminbuchung erforderlich'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 sticky top-24"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('angebot.book_service') || 'Service buchen'}
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">{t('angebot.duration') || 'Dauer'}</div>
                    <div className="text-white text-lg font-semibold">
                      {angebot.duration_minutes} {t('angebot.minutes') || 'Minuten'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">{t('angebot.price') || 'Preis'}</div>
                    <div className="text-rose-400 text-2xl font-bold">
                      {angebot.price}€
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 text-sm">
                  {t('angebot.book_description') || 'Buchen Sie jetzt Ihr unvergessliches Erlebnis. Diskret und professionell.'}
                </p>
                
                <Link
                  to="/buchen"
                  className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-center mb-4 flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t('angebot.book_now') || 'Jetzt buchen'}
                </Link>
                
                <p className="text-gray-400 text-xs text-center">
                  {t('angebot.booking_note') || '100% diskret und sicher'}
                </p>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-center text-gray-400 text-sm">
                    <Star className="w-4 h-4 text-rose-400 fill-rose-400 mr-2" />
                    {t('angebot.verified_service') || 'Verifizierter Service'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AngebotDetail;

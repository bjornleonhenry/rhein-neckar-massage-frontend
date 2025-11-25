import { Link } from 'react-router-dom';
import { Clock, Users, Zap, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ButtonHover } from '@/components/ui/button-hover';
import { CardHover } from '@/components/ui/card-hover';
import { useTranslation } from '@/hooks/useTranslation';
import { useFetch } from '@/lib/useFetch';
import { useState, useEffect } from 'react';

interface Angebot {
  id: number;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image?: string;
  services?: string[];
  is_active: boolean;
  options?: Array<{
    id: number;
    title: string;
    price: number;
    duration_minutes: number;
    is_active: boolean;
  }>;
}

const Services = () => {
  const { t, isLoading: translationLoading } = useTranslation();
  const { data: servicesData, loading: apiLoading, error } = useFetch<{ data: Angebot[] }>('/angebots');
  const [services, setServices] = useState<Angebot[]>([]);

  useEffect(() => {
    if (servicesData?.data) {
      // Filter for active services (though API should already do this)
      const activeServices = servicesData.data.filter(service => service.is_active);
      setServices(activeServices);
    }
  }, [servicesData]);

  if (translationLoading || apiLoading) {
    return (
      <section className="py-20 bg-gradient-to-r from-rose-900/30 to-purple-900/30 border-b border-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading services:', error);
    // Fallback to empty services or show error state
    return null;
  }

  // Helper function to get icon based on category or fallback to default
  const getServiceIcon = (category: string, index: number) => {
    const icons = [<Heart className="w-8 h-8" />, <Zap className="w-8 h-8" />, <Users className="w-8 h-8" />, <Clock className="w-8 h-8" />];
    switch (category.toLowerCase()) {
      case 'massage':
      case 'thai':
        return <Heart className="w-8 h-8" />;
      case 'oil':
      case 'erotik':
        return <Zap className="w-8 h-8" />;
      case 'paar':
        return <Users className="w-8 h-8" />;
      case 'vip':
        return <Clock className="w-8 h-8" />;
      default:
        return icons[index % icons.length];
    }
  };

  // Helper function to format duration
  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return `ab ${price}€`;
  };

  return (
  <section
    id="services"
    className="py-20 bg-gradient-to-r from-rose-900/30 to-purple-900/30 border-b border-rose-900/20"
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">{t('services.section.title')}</h2>
            <p className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('services.section.description')}
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.2}>
              <CardHover intensity="low">
                <div
                  className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 shadow-lg group hover:border-rose-600/50 h-full"
                >
              <div className="bg-rose-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-800/30 transition-colors">
                <div className="text-rose-400">
                  {getServiceIcon(service.category, index)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed" style={{ maxHeight: '74px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{service.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDuration(service.duration_minutes)}
                </div>
                  <div className="text-lg font-bold text-rose-400">{formatPrice(service.price)}</div>
                </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={1}>
          <div className="mt-12 flex justify-center">
            <Link to="/angebot" className="w-full md:w-1/2 lg:w-1/4">
              <ButtonHover className="w-full px-8 py-4 rounded-lg">
                {t('services.button.discover')}
              </ButtonHover>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;

import { Link } from 'react-router-dom';
import { Clock, Users, Zap, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ButtonHover } from '@/components/ui/button-hover';
import { CardHover } from '@/components/ui/card-hover';
import { useTranslation } from '@/hooks/useTranslation';

const Services = () => {
  const { t, isLoading } = useTranslation();

  if (isLoading) {
    return null;
  }
  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Erotische Thai-Massage",
      description: "Verführerische thailändische Massage mit sinnlichen Techniken zur tiefen Entspannung und erotischen Energiebalance.",
      duration: "60-90 Min",
      price: "ab 120€"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Aphrodisische Öl-Erotik",
      description: "Leidenschaftliche Ölmassage mit erregenden Aromaölen für ultimative Lust und sinnliches Wohlbefinden.",
      duration: "60-90 Min",
      price: "ab 150€"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Wilde Paar-Ekstase",
      description: "Heißes und leidenschaftliches Paar-Erlebnis in unserem privaten Lust-Raum für gemeinsame sinnliche Verführung.",
      duration: "90-120 Min",
      price: "ab 300€"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "VIP Lust-Paket",
      description: "Luxuriöses Erotik-Erlebnis mit verschiedenen Verführungen und exklusivem sinnlichem Service.",
      duration: "120-180 Min",
      price: "ab 250€"
    }
  ];

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
            <ScrollReveal key={index} delay={index * 0.2}>
              <CardHover intensity="low">
                <div
                  className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 shadow-lg group hover:border-rose-600/50 h-full"
                >
              <div className="bg-rose-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-800/30 transition-colors">
                <div className="text-rose-400">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed" style={{ maxHeight: '74px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{service.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration}
                </div>
                  <div className="text-lg font-bold text-rose-400">{service.price}</div>
                </div>
                </div>
              </CardHover>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={1}>
          <div className="mt-12 flex justify-center">
            <Link to="/leistungen" className="w-full md:w-1/2 lg:w-1/4">
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

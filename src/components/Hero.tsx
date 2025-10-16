import { Link } from 'react-router-dom';
import { Calendar, Star, Shield } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import { useTranslation } from '@/hooks/useTranslation';
import { CardHover } from '@/components/ui/card-hover';
import { ButtonHover } from '@/components/ui/button-hover';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const Hero = () => {
  const { t, isLoading } = useTranslation();

  const withDefault = (key: string, def: string) => {
    const v = t(key);
    return v === key ? def : v;
  };

  if (isLoading) {
    return (
      <section id="home" className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20 py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-10 bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
  <section id="home" className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20 py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="hidden md:block">
              <TextEffect
                className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                preset="slide"
                per="word"
              >
                {withDefault('hero.title', '')}
              </TextEffect>
            </div>
            <p className="hidden md:block text-base md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              {withDefault('home.description', 'Entdecken Sie unsere leidenschaftlichen und sinnlichen Göttinnen der Erotik, die Ihre wildesten Fantasien wahr werden lassen.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
              {import.meta.env.VITE_HIDE_BOOKING !== 'true' && (
                <Link to="/buchen">
                  <ButtonHover className="px-8 py-4 rounded-lg">
                    {withDefault('hero.cta.book', 'Termin vereinbaren')}
                  </ButtonHover>
                </Link>
              )}
              <Link to="/angebot">
                <ButtonHover variant="secondary" className="px-8 py-4 rounded-lg">
                  {withDefault('hero.cta.services', 'Erotik-Services entdecken')}
                </ButtonHover>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center text-xs sm:text-sm">
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-800 p-3 rounded-full shadow-md mb-2 border border-rose-900/30 hover:border-amber-400 transition-colors duration-300">
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{withDefault('hero.feature.technique', 'Sinnliche Erotik-Techniken')}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-800 p-3 rounded-full shadow-md mb-2 border border-rose-900/30 hover:border-rose-400 transition-colors duration-300">
                    <Shield className="w-6 h-6 text-rose-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{withDefault('hero.feature.discretion', 'Verführerische Diskretion')}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-800 p-3 rounded-full shadow-md mb-2 border border-rose-900/30 hover:border-purple-400 transition-colors duration-300">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{withDefault('hero.feature.schedule', 'Flexible Lust-Termine')}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
           
          <div className="relative">
            <CardHover intensity="medium">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="images/assets/1.webp"
                  alt="Sinnliche Erotik-Massage Behandlung"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-purple-900/20 to-transparent"></div>
              </div>
            </CardHover>
            <div className="absolute -bottom-6 -left-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-rose-900/30">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <img src="assets/test1.jpg?auto=compress&cs=tinysrgb&w=100" alt="Zufriedener Kunde" className="w-10 h-10 rounded-full border-2 border-rose-400" />
                  <img src="assets/test2.jpg?auto=compress&cs=tinysrgb&w=100" alt="Zufriedener Kunde" className="w-10 h-10 rounded-full border-2 border-rose-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{withDefault('hero.testimonials.title', 'Erotische Kundenerfahrungen')}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;

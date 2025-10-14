import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { useFetch } from '@/lib/useFetch';
import { useTranslation } from '@/hooks/useTranslation';

const Mieterinnen = () => {
  const navigate = useNavigate();
  const staticGirls: never[] = [];

  const { data, loading } = useFetch<any>('/profiles');
  const apiGirls = data?.data || [];
  
  // Transform API data to match component expectations
  const transformedApiGirls = Array.isArray(apiGirls) ? apiGirls.map((profile: any) => ({
    id: profile.id,
    name: profile.name,
    age: profile.age,
    origin: profile.origin || "Heidelberg, Deutschland",
    image: profile.main_image_url || profile.image || "images/users/1.webp?auto=compress&cs=tinysrgb&w=600",
    specialties: profile.services || profile.massages || ["Erotische Massage", "Verführung"],
    available: true,
    description: profile.description || "Verführerische Göttin mit sinnlichen Techniken.",
    languages: profile.languages || ["Deutsch", "Englisch"],
    workingHours: profile.schedule || "Mo-Fr: 14:00-22:00",
    rating: 4.8 // Default rating since it's not in profiles table
  })) : [];
  
  const girls = transformedApiGirls.length > 0 ? transformedApiGirls : staticGirls;

  const { t, isLoading } = useTranslation();

  const withDefault = (key: string, def: string) => {
    const v = t(key);
    return v === key ? def : v;
  };

  if (isLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
              <p className="text-gray-300 mt-4"></p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
            <h1 className="text-5xl font-bold text-white mb-6">{withDefault('mieterinnen.title', 'Unsere Verführerischen Masseurinnen')}</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {withDefault('mieterinnen.description', 'Entdecken Sie unsere leidenschaftlichen und sinnlichen Göttinnen der Erotik. Jede von ihnen ist eine Meisterin der Verführung, bereit Ihre wildesten Fantasien zu erfüllen und Ihnen unvergessliche Nächte voller Lust zu bereiten.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {girls.map((girl: any, index: number) => (
              <div
                key={index}
                className="bg-gray-900 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group hover:border-rose-600/50 cursor-pointer"
                onClick={(e: React.MouseEvent) => {
                  // Prevent navigation if clicking on the Buchen button
                  if (!(e.target as HTMLElement).closest('a')) {
                    const profileId = girl.id ? girl.id.toString() : encodeURIComponent(girl.name);
                    navigate(`/mieterinnen/${profileId}`);
                  }
                }}
              >
                <div className="relative">
                  <img
                    src={girl.image}
                    alt=""
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  {/* Removed Verfügbar/Beschäftigt badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white mb-0">{girl.name}</h3>
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-white text-sm font-semibold hidden">{girl.rating}</span>
                    </div>
                    <p className="text-rose-300 hidden">{girl.origin}</p>
                  </div>
                </div>
                
                <div className="p-6 hidden">
                  <p className="text-gray-300 mb-4 leading-relaxed">{girl.description}</p>
                  
                   <div className="mb-4">
                     <h4 className="text-white font-semibold mb-2">{t('mieterinnen.specialties.title')}</h4>
                    <div className="flex flex-wrap gap-2">
                        {(girl.specialties || []).map((specialty: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-rose-900/30 text-rose-300 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                          ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300 mb-4">
                     <div className="flex items-center">
                       <Clock className="w-4 h-4 mr-2 text-rose-400" />
                       <span>{t('mieterinnen.working_hours.title')} {girl.workingHours}</span>
                     </div>
                     <div className="flex items-center">
                       <span className="w-4 h-4 mr-2 text-rose-400">🗣️</span>
                       <span>{t('mieterinnen.languages.title')} {(girl.languages || []).join(', ')}</span>
                     </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {false && (
                      <Link 
                        to={`/buchen?girl=${encodeURIComponent(girl.name)}`}
                        className="w-full bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors text-center"
                      >
                        {withDefault('mieterinnen.cta.book', 'Termin buchen')}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mieterinnen;

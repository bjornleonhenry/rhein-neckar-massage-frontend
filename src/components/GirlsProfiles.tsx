import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { CardHover } from './ui/card-hover';
import { useFetch } from '@/lib/useFetch';
import { useTranslation } from '@/hooks/useTranslation';
// Removed animation imports

type GirlsProfilesProps = {
  hideActions?: boolean;
};

const GirlsProfiles = ({ hideActions = false }: GirlsProfilesProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  type Girl = {
    id?: string | number;
    name: string;
    age?: number;
    origin?: string;
    image?: string;
    specialties?: string[];
    available?: boolean;
    description?: string;
  };

  const staticGirls: Girl[] = [
    {
      name: "Lila",
      age: 24,
      origin: "Heidelberg, Deutschland",
      image: "images/users/10.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Tantra", "Erotische Massage", "Verführung"],
      available: true,
      description: t('girls.lila.description')
    },
    {
      name: "Maya",
      age: 26,
      origin: "Heidelberg, Deutschland",
      image: "images/users/11.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotik Massage", "Öl Massage", "VIP Service"],
      available: true,
      description: t('girls.maya.description')
    },
    {
      name: "Nira",
      age: 23,
      origin: "Heidelberg, Deutschland",
      image: "images/users/12.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Paar Massage", "Erotische Wellness", "Verführung"],
      available: false,
      description: t('girls.nira.description')
    },
    {
      name: "Kira",
      age: 25,
      origin: "Heidelberg, Deutschland",
      image: "images/users/13.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Tantra", "Erotische Meditation", "Sinnliche Energie"],
      available: true,
      description: t('girls.kira.description')
    },
    {
      name: "Siri",
      age: 27,
      origin: "Heidelberg, Deutschland",
      image: "images/users/14.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Hot Stone", "Erotische Massage", "Sinnliche Berührungen"],
      available: true,
      description: t('girls.siri.description')
    },
    {
      name: "Ploy",
      age: 22,
      origin: "Heidelberg, Deutschland",
      image: "images/users/15.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotik Massage", "Sinnliche Körperbehandlung", "Verführung"],
      available: true,
      description: t('girls.ploy.description')
    },
    {
      name: "Anya",
      age: 25,
      origin: "Heidelberg, Deutschland",
      image: "images/users/16.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["VIP Service", "Luxus Erotik", "Diskrete Verführung"],
      available: false,
      description: t('girls.anya.description')
    },
    {
      name: "Nin",
      age: 24,
      origin: "Heidelberg, Deutschland",
      image: "images/users/19.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Aphrodisische Aromatherapie", "Erotische Entspannung", "Sinnliche Wellness"],
      available: true,
      description: t('girls.nin.description')
    }
  ];

  const { data } = useFetch<any>('/profiles');
  const apiGirls = data?.data || [];
  
  // Transform API data to match component expectations
  const transformedApiGirls: Girl[] = Array.isArray(apiGirls) ? apiGirls.map((profile: any) => ({
    name: profile.name,
    age: profile.age,
    origin: profile.origin || "Heidelberg, Deutschland",
    image: profile.main_image_url || profile.image || "images/users/10.webp?auto=compress&cs=tinysrgb&w=600",
    specialties: profile.services || profile.massages || ["Erotische Massage", "Verführung"],
    available: true, // Default to available
    description: profile.description || t('girls.description_default')
  })) : [];
  
  const girls = transformedApiGirls.length > 0 ? transformedApiGirls : staticGirls;

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">{t('girls.title')}</h2>
          <p className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('girls.description')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {girls.map((girl: Girl, index: number) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                // Prevent navigation if clicking on the Buchen button
                if (!(e.target as HTMLElement).closest('a')) {
                  const profileId = girl.id ? girl.id.toString() : encodeURIComponent(girl.name);
                  navigate(`/mieterinnen/${profileId}`);
                }
              }}
            >
              <CardHover intensity="medium" className="bg-gray-900 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg group hover:border-rose-600/50 flex flex-col h-full">
              <div className="relative overflow-hidden">
                <img
                  src={girl.image ?? '/assets/default-profile.jpg'}
                  alt={girl.name ?? 'Profilbild'}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white cursor-pointer">{girl.name}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
              <div
                  className="flex flex-wrap gap-2 mb-4 flex-1 max-h-16 overflow-hidden items-start"
                >
                  {(Array.isArray(girl.specialties) ? girl.specialties : []).map((specialty: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-rose-900/30 text-rose-300 text-xs rounded-full cursor-pointer transition-all duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{girl.description ?? 'Beschreibung kommt bald.'}</p>

                {!hideActions && (
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center cursor-pointer">
                      <Star className="w-4 h-4 text-amber-400 mr-1" />
                      <span className="text-gray-300 text-sm">4.9</span>
                    </div>
                    <Link
                      to={`/buchen?girl=${encodeURIComponent(girl.name)}`}
                      className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors inline-block"
                    >
                      {t('girls.book')}
                    </Link>
                  </div>
                )}
              </div>
            </CardHover>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/mieterinnen"
            className="bg-rose-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-rose-700 transition-all duration-300 shadow-lg inline-block"
          >
            {t('girls.discover_all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GirlsProfiles;

import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Star } from 'lucide-react';
import { useFetch, API } from '../lib/useFetch';
import { useTranslation } from '@/hooks/useTranslation';

interface Ambient {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
  capacity: number;
  size?: string;
  features: string[] | string;
  amenities: string[] | string;
  image?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Helper function to parse features into an array
const parseFeatures = (features: string[] | string): string[] => {
  if (Array.isArray(features)) {
    return features;
  }
  if (typeof features === 'string') {
    try {
      // Try parsing as JSON first
      if (features.startsWith('[')) {
        return JSON.parse(features);
      }
      // Otherwise split by comma
      return features.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    } catch {
      return [];
    }
  }
  return [];
};

const Ambiente = () => {
  const { data, loading, error } = useFetch<{ data: Ambient[] }>(API.ambients);
  const { t } = useTranslation();

  // Filter to only show active ambients
  const rooms = (data?.data || []).filter(ambient => ambient.is_active === true);

  const amenities = [
    { icon: <Shield className="w-6 h-6" />, title: t('ambiente.amenities.discretion.title'), description: t('ambiente.amenities.discretion.description') },
    { icon: <Sparkles className="w-6 h-6" />, title: t('ambiente.amenities.equipment.title'), description: t('ambiente.amenities.equipment.description') },
    { icon: <Heart className="w-6 h-6" />, title: t('ambiente.amenities.atmosphere.title'), description: t('ambiente.amenities.atmosphere.description') },
    { icon: <Star className="w-6 h-6" />, title: t('ambiente.amenities.service.title'), description: t('ambiente.amenities.service.description') }
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
              <p className="text-gray-300 mt-4"> </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-red-400">{t('ambiente.error.load')} {error.message}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-0 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
            <h1 className="text-5xl font-bold text-white mb-6">{t('ambiente.title')}</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('ambiente.description')}
            </p>
          </div>

          {/* Amenities */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 mb-16">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-gray-800 border border-rose-900/30 rounded-xl p-6 text-center hover:border-rose-600/50 transition-colors">
                <div className="bg-rose-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-rose-400">
                    {amenity.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{amenity.title}</h3>
                <p className="text-gray-300 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
          
          {/* Rooms */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div 
                key={room.id || index} 
                className="bg-gray-900 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group hover:border-rose-600/50 flex flex-col"
              >
                <Link to={`/ambiente/${room.id}`} className="relative block cursor-pointer">
                  <img
                    src={room.image || '/placeholder-room.jpg'}
                    alt={room.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    <p className="text-rose-300 text-sm">{room.size || 'N/A'} • {room.capacity} {room.capacity === 1 ? t('ambiente.capacity.person') : t('ambiente.capacity.persons')}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    {t('ambiente.view_details') || 'Details ansehen'}
                  </div>
                </Link>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">{room.description}</p>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="text-white font-semibold mb-2">{t('ambiente.equipment.title')}</h4>
                    <div className="space-y-1">
                      {parseFeatures(room.features).slice(0, 4).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-rose-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                      {parseFeatures(room.features).length > 4 && (
                        <Link to={`/ambiente/${room.id}`} className="text-sm text-rose-400 hover:text-rose-300 ml-4">
                          +{parseFeatures(room.features).length - 4} {t('ambiente.more') || 'weitere'}
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link 
                      to={`/ambiente/${room.id}`}
                      className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center block text-sm"
                    >
                      {t('ambiente.details') || 'Details'}
                    </Link>
                    <Link 
                      to="/buchen" 
                      className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-center block text-sm"
                    >
                      {t('ambiente.reserve_room') || 'Buchen'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">{t('ambiente.special_atmosphere.title')}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t('ambiente.special_atmosphere.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-rose-400">{rooms.length}</div>
                  <div className="text-gray-300 text-sm">{t('ambiente.stats.rooms')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-400">100%</div>
                  <div className="text-gray-300 text-sm">{t('ambiente.stats.discretion')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-400">24/7</div>
                  <div className="text-gray-300 text-sm">{t('ambiente.stats.availability')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ambiente;

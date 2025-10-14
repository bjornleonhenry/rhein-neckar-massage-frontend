import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Star } from 'lucide-react';
import { useFetch, API } from '../lib/useFetch';

interface Ambient {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
  capacity: number;
  size?: string;
  features: string[];
  amenities: string[];
  image?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Ambiente = () => {
  const { data, loading, error } = useFetch<{ data: Ambient[] }>(API.ambients);

  const rooms = data?.data || [];

  const amenities = [
    { icon: <Shield className="w-6 h-6" />, title: "Absolute Diskretion", description: "Separate Eingänge und höchste Privatsphäre" },
    { icon: <Sparkles className="w-6 h-6" />, title: "Luxuriöse Ausstattung", description: "Hochwertige Materialien und edle Einrichtung" },
    { icon: <Heart className="w-6 h-6" />, title: "Romantische Atmosphäre", description: "Stimmungsvolle Beleuchtung und Dekoration" },
    { icon: <Star className="w-6 h-6" />, title: "Premium Service", description: "Erstklassiger Service und Aufmerksamkeit" }
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full">
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

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-red-400">Fehler beim Laden der Daten: {error.message}</p>
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
            <h1 className="text-5xl font-bold text-white mb-6">Unser Ambiente</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Entdecken Sie unsere exklusiv gestalteten Räume, die eine perfekte Atmosphäre für 
              Entspannung, Sinnlichkeit und unvergessliche Momente schaffen.
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
                <div className="relative">
                  <img
                    src={room.image || '/placeholder-room.jpg'}
                    alt={room.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    <p className="text-rose-300 text-sm">{room.size || 'N/A'} • {room.capacity} {room.capacity === 1 ? 'Person' : 'Personen'}</p>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-300 mb-4 leading-relaxed">{room.description}</p>
                  
                  <div className="mb-4 flex-1">
                    <h4 className="text-white font-semibold mb-2">Ausstattung:</h4>
                    <div className="space-y-1">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-rose-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to="/buchen" 
                    className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-center block mt-auto"
                  >
                    Raum reservieren
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Besondere Atmosphäre</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Jeder unserer Räume wurde sorgfältig gestaltet, um eine einzigartige Atmosphäre zu schaffen. 
                Von der luxuriösen VIP Suite bis zum traditionellen Thai Raum - wir bieten das perfekte 
                Ambiente für jeden Geschmack und jede Art von Entspannung.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-rose-400">{rooms.length}</div>
                  <div className="text-gray-300 text-sm">Exklusive Räume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-400">100%</div>
                  <div className="text-gray-300 text-sm">Diskrete Atmosphäre</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-400">24/7</div>
                  <div className="text-gray-300 text-sm">Verfügbarkeit</div>
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

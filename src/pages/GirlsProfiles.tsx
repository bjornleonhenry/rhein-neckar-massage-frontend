import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { CardHover } from '@/components/ui/card-hover';
import { useFetch } from '@/lib/useFetch';
// Removed animation imports

const GirlsProfiles = () => {
  const staticGirls = [
    {
      name: "",
      age: "",
      origin: "",
      image: "",
      specialties: [""],
      available: true,
      description: ""
    }
  ];

  const { data } = useFetch<any>('/profiles');
  const apiGirls = data?.data || [];
  
  // Transform API data to match component expectations
  const transformedApiGirls = apiGirls.map((profile: any) => ({
    name: profile.name,
    age: profile.age,
    origin: profile.origin || "",
    image: profile.main_image_url || profile.image || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialties: profile.services || profile.massages || ["Erotik Massage", "Entspannung"],
    available: true, // Default to available
    description: profile.description || "Sinnliche und erfahrene Masseurin mit authentischen Techniken."
  }));
  
  const girls = transformedApiGirls.length > 0 ? transformedApiGirls : staticGirls;

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
          <h2 className="text-4xl font-bold text-white mb-4">Unsere Masseurinnen</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lernen Sie unsere erfahrenen und sinnlichen Masseurinnen kennen, die Ihnen unvergessliche Momente bereiten.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {girls.map((girl: any, index: number) => (
            <CardHover key={index} intensity="medium" className="bg-gray-900 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg group hover:border-rose-600/50 flex flex-col h-full">
              <div className="relative overflow-hidden">
                <img
                  src={girl.image}
                  alt={girl.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 h-7 flex items-center ${girl.available ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-red-600 text-white hover:bg-red-500'}`}
                    style={{ minHeight: '1.75rem' }}>
                    {girl.available ? 'Verfügbar' : 'Beschäftigt'}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white cursor-pointer">{girl.name}</h3>
                  <p className="text-rose-300 text-sm">{girl.age} Jahre • {girl.origin}</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{girl.description}</p>
                <div
                  className="flex flex-wrap gap-2 mb-4 flex-1 max-h-10 overflow-hidden items-start"
                >
                  {girl.specialties.map((specialty: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-rose-900/30 text-rose-300 text-xs rounded-full cursor-pointer transition-all duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center cursor-pointer">
                    <Star className="w-4 h-4 text-amber-400 mr-1" />
                    <span className="text-gray-300 text-sm">Premium</span>
                  </div>
                  <Link
                    to={`/buchen?girl=${encodeURIComponent(girl.name)}`}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors inline-block"
                  >
                    Buchen
                  </Link>
                </div>
              </div>
            </CardHover>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/mieterinnen"
            className="bg-rose-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-rose-700 transition-all duration-300 shadow-lg inline-block"
          >
            Alle Masseurinnen anzeigen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GirlsProfiles;

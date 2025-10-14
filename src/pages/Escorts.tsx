import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, MapPin, Phone } from 'lucide-react';

const Escorts = () => {
  const escorts = [
    {
      name: "Luna",
      age: 25,
      origin: "Heidelberg, Deutschland",
      image: "images/users/3.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotische Begleitung", "Sinnliche Gespräche", "Verführerische Dates", "Romantische Nächte"],
      available: true,
      description: "Elegante Verführerin für leidenschaftliche Nächte und sinnliche Abenteuer. Luna ist Ihre perfekte Begleitung für unvergessliche Stunden voller Lust und Ekstase.",
      languages: ["Deutsch", "Englisch", "Französisch"],
      workingHours: "Mo-Sa: 19:00-02:00",
      rating: 4.9
    },
    {
      name: "Bella",
      age: 24,
      origin: "Heidelberg, Deutschland",
      image: "images/users/4.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotische Dinner Dates", "Sinnliche Events", "Lustvolle Reisen", "VIP Begleitung"],
      available: true,
      description: "Charmante und leidenschaftliche Göttin mit einer unbändigen Lust nach sinnlichen Erlebnissen. Bella entführt Sie in eine Welt der puren Begierde und erotischen Versuchung.",
      languages: ["Deutsch", "Englisch", "Italienisch"],
      workingHours: "Di-So: 20:00-04:00",
      rating: 5.0
    },
    {
      name: "Sofia",
      age: 26,
      origin: "Heidelberg, Deutschland",
      image: "images/users/6.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotische Städtereisen", "Sinnliche Events", "Verführerisches Shopping", "Lustvolle Wellness"],
      available: false,
      description: "Leidenschaftliche und feurige Begleiterin mit einem unbändigen Verlangen nach sinnlichen Abenteuern. Sofia verwandelt jede Reise in ein erotisches Fest der Sinne.",
      languages: ["Deutsch", "Englisch", "Spanisch"],
      workingHours: "Mi-Mo: 18:00-24:00",
      rating: 4.8
    },
    {
      name: "Emma",
      age: 23,
      origin: "Heidelberg, Deutschland",
      image: "images/users/10.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Business Erotik", "Sinnliche Konferenzen", "Private Lust-Events", "Erotisches Networking"],
      available: true,
      description: "Intelligente und diskrete Verführerin für sinnliche Geschäftstermine und leidenschaftliche Privatstunden. Emma erweckt Ihre verborgensten Fantasien.",
      languages: ["Deutsch", "Englisch", "Italienisch"],
      workingHours: "Mo-Fr: 17:00-23:00",
      rating: 4.9
    },
    {
      name: "Lara",
      age: 27,
      origin: "Heidelberg, Deutschland",
      image: "images/users/11.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Romantische Erotik", "Sinnliche Ausflüge", "Verführerische Wellness", "Lustvolle Entspannung"],
      available: true,
      description: "Natürliche Schönheit mit einer unersättlichen Begierde nach sinnlichen Abenteuern. Lara schafft eine Atmosphäre voller Lust und erotischer Spannung.",
      languages: ["Deutsch", "Englisch"],
      workingHours: "Do-Mo: 19:00-01:00",
      rating: 4.7
    },
    {
      name: "Nina",
      age: 22,
      origin: "Heidelberg, Deutschland",
      image: "images/users/12.webp?auto=compress&cs=tinysrgb&w=600",
      specialties: ["Erotische Party Begleitung", "Sinnliche Clubs", "Lustvolle Events", "Ungezügelter Spaß"],
      available: true,
      description: "Junge und leidenschaftliche Begleiterin mit einer unbändigen Lust nach sinnlichen Abenteuern. Nina bringt pure Energie und ungezügelte Leidenschaft in jede Nacht.",
      languages: ["Deutsch", "Englisch", "Niederländisch"],
      workingHours: "Fr-Sa: 22:00-04:00",
      rating: 4.8
    }
  ];

  return (
    <div className="pt-0">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
            <h1 className="text-5xl font-bold text-white mb-6">Unsere Verführerischen Escorts</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Entdecken Sie unsere leidenschaftlichen und sinnlichen Göttinnen der Begleitung. Jede von ihnen ist
              eine Meisterin der Verführung, bereit Ihre wildesten Fantasien zu erfüllen und Ihnen unvergessliche Nächte voller Lust zu bereiten.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {escorts.map((escort, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group hover:border-rose-600/50"
              >
                <div className="relative">
                  <img
                    src={escort.image}
                    alt={escort.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      escort.available
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {escort.available ? 'Verfügbar' : 'Beschäftigt'}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-bold text-white">{escort.name}</h3>
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-white text-sm font-semibold">{escort.rating}</span>
                    </div>
                    <p className="text-rose-300">{escort.age} Jahre • {escort.origin}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-4 leading-relaxed">{escort.description}</p>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Spezialitäten:</h4>
                    <div className="flex flex-wrap gap-2">
                      {escort.specialties.map((specialty, idx) => (
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
                      <span>{escort.workingHours}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-rose-400">🗣️</span>
                      <span>{escort.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {import.meta.env.VITE_HIDE_BOOKING !== 'true' && (
                      <Link
                        to={`/buchen?escort=${encodeURIComponent(escort.name)}`}
                        className="flex-1 bg-rose-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors text-center"
                      >
                        Termin buchen
                      </Link>
                    )}
                    <button className="px-4 py-2 border border-rose-600 text-rose-400 rounded-lg text-sm font-semibold hover:bg-rose-600 hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
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

export default Escorts;

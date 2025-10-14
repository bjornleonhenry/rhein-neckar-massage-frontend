import React, { useState, useEffect } from 'react';
import { Star, Heart, MessageCircle, Calendar, User } from 'lucide-react';
import { API } from '../lib/useFetch';
import { useTranslation } from '@/hooks/useTranslation';

interface GuestbookEntry {
  id: number;
  name: string;
  date: string;
  rating: number;
  service: string;
  message: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

const Gaestebuch = () => {
  const [newEntry, setNewEntry] = useState({
    name: '',
    rating: 5,
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // State for loading guestbook entries
  const [guestbookEntries, setGuestbookEntries] = useState<any[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const { t, isLoading } = useTranslation();

  // Load guestbook entries on component mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        setApiLoading(true);
        setApiError(null);

  const response = await fetch(API.gaestebuchs);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform API data to match the expected format
        const transformedEntries = data.data.map((entry: GuestbookEntry) => ({
          name: entry.name || 'Anonymous',
          date: new Date(entry.date).toLocaleDateString('de-DE'),
          rating: entry.rating,
          service: entry.service,
          message: entry.message,
          verified: entry.verified
        }));

        // Filter to only show verified entries
        const verifiedEntries = transformedEntries.filter((entry: any) => entry.verified === true || entry.verified === 1 || entry.verified === "1");

        setGuestbookEntries(verifiedEntries);
      } catch (error) {
        console.error('Error loading guestbook entries:', error);
        setApiError('Fehler beim Laden der Bewertungen');
      } finally {
        setApiLoading(false);
      }
    };

    loadEntries();
  }, []);

  const services = [
    "Erotik Massage",
    "Tantra Massage", 
    "VIP Service",
    "Paar Erlebnis",
    "Body-to-Body",
    "Girlfriend Experience",
    "Thai Massage",
    "Öl Massage"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
  const response = await fetch(API.gaestebuchs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newEntry.name || 'Anonymous',
          date: new Date().toISOString(),
          rating: newEntry.rating,
          service: newEntry.service,
          message: newEntry.message,
          verified: false // New submissions start as unverified
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Guestbook entry created:', result);

      // Reset form
      setNewEntry({ name: '', rating: 5, message: '', service: '' });
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);

      // Refresh the entries
  const refreshResponse = await fetch(API.gaestebuchs);
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const transformedEntries = refreshData.data.map((entry: GuestbookEntry) => ({
          name: entry.name || 'Anonymous',
          date: new Date(entry.date).toLocaleDateString('de-DE'),
          rating: entry.rating,
          service: entry.service,
          message: entry.message,
          verified: entry.verified
        }));
        // Filter to only show verified entries
        const verifiedEntries = transformedEntries.filter((entry: any) => entry.verified === true);
        setGuestbookEntries(verifiedEntries);
      }

    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
      setSubmitError('Es gab einen Fehler beim Absenden Ihrer Bewertung. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {(isLoading || apiLoading) && (
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
      )}

      {(!isLoading && !apiLoading) && (
        <div className="pt-0">
          <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
            <h1 className="text-5xl font-bold text-white mb-6">Gästebuch</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Lesen Sie die Erfahrungen unserer geschätzten Kunden und teilen Sie Ihre eigenen Erlebnisse mit uns.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Guestbook Entries */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <MessageCircle className="w-6 h-6 text-rose-400 mr-2" />
                Kundenbewertungen
              </h2>
              
              <div className="space-y-6">
                {apiError && (
                  <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6 text-center">
                    <p className="text-red-400">Fehler beim Laden der Bewertungen: {apiError}</p>
                  </div>
                )}

                {!apiError && guestbookEntries.length === 0 && (
                  <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 text-center">
                    <p className="text-gray-300">Noch keine Bewertungen vorhanden.</p>
                  </div>
                )}

                {guestbookEntries.map((entry: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 hover:border-rose-600/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-rose-900/20 p-2 rounded-full">
                          <User className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-white">{entry.name}</h4>
                            {entry.verified && (
                              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                                Verifiziert
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                            <span>•</span>
                            <span>{entry.service}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < entry.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">{entry.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Heart className="w-5 h-5 text-rose-400 mr-2" />
                  Ihre Bewertung
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitSuccess && (
                    <div className="p-3 bg-green-600/20 border border-green-600/30 rounded-lg">
                      <p className="text-sm text-green-400">
                        ✅ Vielen Dank für Ihre Bewertung! Sie wird nach Prüfung veröffentlicht.
                      </p>
                    </div>
                  )}

                  {submitError && (
                    <div className="p-3 bg-red-600/20 border border-red-600/30 rounded-lg">
                      <p className="text-sm text-red-400">
                        ❌ {submitError}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      value={newEntry.name}
                      onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      placeholder="Ihr Name oder Initialen"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service
                    </label>
                    <select
                      value={newEntry.service}
                      onChange={(e) => setNewEntry({...newEntry, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      required
                    >
                      <option value="">Service wählen</option>
                      {services.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bewertung
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewEntry({...newEntry, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              star <= newEntry.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-600 hover:text-amber-400'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ihre Erfahrung
                    </label>
                    <textarea
                      rows={4}
                      value={newEntry.message}
                      onChange={(e) => setNewEntry({...newEntry, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                      placeholder="Teilen Sie Ihre Erfahrung mit uns..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Bewertung abgeben'}
                  </button>
                </form>
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Ihre Bewertung wird nach Prüfung veröffentlicht. Wir behalten uns vor, 
                    unangemessene Inhalte zu entfernen. Alle Bewertungen werden vertraulich behandelt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
      )}
    </>
  );
};

export default Gaestebuch;

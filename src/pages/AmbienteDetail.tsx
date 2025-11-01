import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Maximize, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  images?: string[] | string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Helper function to parse features/amenities into an array
const parseArray = (data: string[] | string): string[] => {
  if (Array.isArray(data)) {
    return data;
  }
  if (typeof data === 'string') {
    try {
      if (data.startsWith('[')) {
        return JSON.parse(data);
      }
      return data.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    } catch {
      return [];
    }
  }
  return [];
};

const AmbienteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<{ data: Ambient[] }>(API.ambients);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Find the specific ambient by ID
  const ambient = data?.data?.find(a => a.id === parseInt(id || '0'));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">{t('common.loading') || 'Laden...'}</p>
        </div>
      </div>
    );
  }

  if (error || !ambient) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="text-center">
          <p className="text-red-400 mb-4">{t('ambiente.error.not_found') || 'Raum nicht gefunden'}</p>
          <Link to="/ambiente" className="text-rose-400 hover:text-rose-300">
            {t('common.back') || 'Zurück'}
          </Link>
        </div>
      </div>
    );
  }

  // Parse images array
  const allImages = parseArray(ambient.images || []);
  if (ambient.image && !allImages.includes(ambient.image)) {
    allImages.unshift(ambient.image);
  }
  const images = allImages.length > 0 ? allImages : [ambient.image || '/placeholder-room.jpg'];

  const features = parseArray(ambient.features);
  const amenities = parseArray(ambient.amenities);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pt-0 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/ambiente" 
            className="inline-flex items-center text-rose-400 hover:text-rose-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('common.back_to_overview') || 'Zurück zur Übersicht'}
          </Link>

          {/* Main Image Carousel */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl group">
            <div className="relative h-[500px]">
              <img
                src={images[currentImageIndex]}
                alt={`${ambient.name} - Bild ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openLightbox(currentImageIndex)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-8">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-rose-500 scale-105'
                      : 'border-transparent hover:border-rose-400/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Info */}
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{ambient.name}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                    {ambient.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-2 text-rose-400" />
                    {ambient.capacity} {ambient.capacity === 1 ? t('ambiente.capacity.person') : t('ambiente.capacity.persons')}
                  </div>
                  {ambient.size && (
                    <div className="flex items-center text-gray-300">
                      <Maximize className="w-5 h-5 mr-2 text-rose-400" />
                      {ambient.size}
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 mr-2 text-rose-400 fill-rose-400" />
                    {ambient.rating.toFixed(1)}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {ambient.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t('ambiente.equipment.title') || 'Ausstattung'}
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t('ambiente.amenities.title') || 'Annehmlichkeiten'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('ambiente.book_room') || 'Raum buchen'}
                </h3>
                <p className="text-gray-300 mb-6">
                  {t('ambiente.book_description') || 'Reservieren Sie diesen exklusiven Raum für Ihr unvergessliches Erlebnis.'}
                </p>
                <Link
                  to="/buchen"
                  className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-center block mb-4"
                >
                  {t('ambiente.reserve_now') || 'Jetzt reservieren'}
                </Link>
                <p className="text-gray-400 text-sm text-center">
                  {t('ambiente.booking_note') || '100% diskret und sicher'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-7xl w-full">
            <img
              src={images[currentImageIndex]}
              alt={`${ambient.name} - Bild ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbienteDetail;

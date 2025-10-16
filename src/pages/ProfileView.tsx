import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Calendar, Heart, Clock, Ruler, Scale, ShoppingBag, User, Sparkles, Eye, Sun, Info } from 'lucide-react';
import { useFetch } from '@/lib/useFetch';
import { Button } from '@/components/ui/button';
import { CardHover } from '@/components/ui/card-hover';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const ProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentMainImage, setCurrentMainImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const { data: mieterinData, loading, error } = useFetch<any>(`/profiles/${id}`);
  
  const girl = mieterinData?.data ? {
    ...mieterinData.data,
    origin: "Heidelberg, Deutschland",
    available: true
  } : null;

  // Use current main image state or fallback to the original main image
  const displayMainImage = currentMainImage || girl?.main_image_url || girl?.image;

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">{t('profile.loading')}</div></div>;
  if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-red-400">Error: {error.message}</div></div>;
  if (!girl) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">{t('profile.notfound')}</div></div>;

  return (
    <div className="min-h-screen bg-gray-900 mt-11 lg:mt-9">
      {/* Header */}
      <div className="bg-gray-800 border-b border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('profile.back')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Images */}
          <div className="lg:col-span-2">
            <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  src={displayMainImage || '/assets/default-profile.jpg'}
                  alt={girl.name ?? 'Profilbild'}
                  className="w-full h-[900px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h1 className="text-4xl font-bold text-white mb-2">{girl.name}</h1>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{girl.origin}</span>
                  </div>
                </div>
                {girl.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold hidden">
                      {t('profile.availability.available')}
                    </span>
                  </div>
                )}
              </div>
            </CardHover>

            {/* Additional Images */}
            {girl.image_urls && girl.image_urls.length > 1 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-2">{t('profile.images.more')}</h3>
                <p className="text-gray-400 text-sm mb-4">{t('profile.images.click')}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {girl.image_urls
                    .filter((url: string) => url !== displayMainImage)
                    .map((imageUrl: string, index: number) => (
                    <CardHover key={index} intensity="low" className="bg-gray-800 border border-rose-900/30 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={imageUrl}
                        alt={`${girl.name} - Bild ${index + 2}`}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setCurrentMainImage(imageUrl)}
                      />
                    </CardHover>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{t('profile.personal.title')}</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-rose-400" />
                  <span>{girl.age} {t('profile.personal.age')}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-rose-400" />
                  <span>{girl.origin}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 mr-3 text-amber-400" />
                  <span>{girl.rating ? `${girl.rating} ${t('profile.reviews.stars')}` : `4.9 ${t('profile.reviews.stars')}`}</span>
                </div>
                {girl.workingHours && (
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{girl.workingHours}</span>
                  </div>
                )}
                {girl.languages && girl.languages.length > 0 && (
                  <div className="flex items-center text-gray-300">
                    <span className="w-5 h-5 mr-3 text-rose-400 text-center">🗣️</span>
                    <span>{Array.isArray(girl.languages) ? girl.languages.join(', ') : (girl.languages || 'Deutsch, Englisch')}</span>
                  </div>
                )}
              </div>
            </CardHover>

            {/* Physical Attributes */}
            <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{t('profile.physical.title')}</h2>
              <div className="space-y-3">
                {girl.height && (
                  <div className="flex items-center text-gray-300">
                    <Ruler className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.height')}: {girl.height} cm</span>
                  </div>
                )}
                {girl.weight && (
                  <div className="flex items-center text-gray-300">
                    <Scale className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.weight')}: {girl.weight} kg</span>
                  </div>
                )}
                {girl.bust_size && (
                  <div className="flex items-center text-gray-300">
                    <Heart className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.bust')}: {girl.bust_size}</span>
                  </div>
                )}
                {girl.body_type && (
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.build.label')}: {girl.body_type}</span>
                  </div>
                )}
                {girl.clothing_size && (
                  <div className="flex items-center text-gray-300">
                    <ShoppingBag className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.clothing')}: {girl.clothing_size}</span>
                  </div>
                )}
                {girl.shoe_size && (
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.shoe')}: {girl.shoe_size}</span>
                  </div>
                )}
                {girl.hair && (
                  <div className="flex items-center text-gray-300">
                    <Sparkles className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.hair.label')}: {girl.hair}</span>
                  </div>
                )}
                {girl.eyes && (
                  <div className="flex items-center text-gray-300">
                    <Eye className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.eyes.label')}: {girl.eyes}</span>
                  </div>
                )}
                {girl.skin && (
                  <div className="flex items-center text-gray-300">
                    <Sun className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.skin')}: {girl.skin}</span>
                  </div>
                )}
                {girl.intimate_area && (
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.intimate')}: {girl.intimate_area}</span>
                  </div>
                )}
                {girl.body_jewelry && (
                  <div className="flex items-center text-gray-300">
                    <Sparkles className="w-5 h-5 mr-3 text-rose-400" />
                    <span>{t('profile.physical.jewelry')}: {girl.body_jewelry}</span>
                  </div>
                )}
              </div>
            </CardHover>

            {/* Description */}
            <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{t('profile.personal.about')}</h2>
              <p className="text-gray-300 leading-relaxed">{girl.description ?? t('profile.description.default')}</p>
            </CardHover>

            {/* Services & Options */}
            <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{t('profile.services.title')}</h2>
              <div className="space-y-4">
                {girl.intercourse_options && girl.intercourse_options.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.intercourse')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {girl.intercourse_options.map((option: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-900/30 text-orange-300 text-xs rounded-full border border-orange-700/30"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {girl.services_for && girl.services_for.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.for')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {girl.services_for.map((service: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-900/30 text-green-300 text-xs rounded-full border border-green-700/30"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {girl.services && girl.services.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.services')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {girl.services.map((service: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-700/30"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {girl.massages && girl.massages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.massages')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {girl.massages.map((massage: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full border border-indigo-700/30"
                        >
                          {massage}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {girl.meetings && girl.meetings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.meetings')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {girl.meetings.map((meeting: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-700/30"
                        >
                          {meeting}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Legacy specialties field */}
                {girl.specialties && girl.specialties.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-rose-300 mb-2">{t('profile.services.specialties')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(girl.specialties) ? girl.specialties : []).map((specialty: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-rose-900/30 text-rose-300 text-xs rounded-full border border-rose-700/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardHover>

            {/* Schedule */}
            {girl.schedule && (
              <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">{t('profile.availability.title')}</h2>
                <div className="text-gray-300 whitespace-pre-line">{girl.schedule}</div>
              </CardHover>
            )}

            {/* Additional Info */}
            {girl.additional_info && (
              <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">{t('profile.additional.title')}</h2>
                <div className="text-gray-300 whitespace-pre-line">{girl.additional_info}</div>
              </CardHover>
            )}

            {/* Other Information */}
            {girl.other && (
              <CardHover intensity="medium" className="bg-gray-800 border border-rose-900/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">{t('profile.other.title')}</h2>
                <div className="flex items-center text-gray-300">
                  <Info className="w-5 h-5 mr-3 text-rose-400" />
                  <span>{girl.other}</span>
                </div>
              </CardHover>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                {import.meta.env.VITE_HIDE_BOOKING !== 'true' && (
                  <Link
                    to={`/buchen?girl=${encodeURIComponent(girl.name)}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg font-semibold">
                      <Heart className="w-5 h-5 mr-2" />
                      {t('profile.actions.book')}
                    </Button>
                  </Link>
                )}
              <Button
                variant="outline"
                className="flex-1 border-rose-600 text-rose-400 hover:bg-rose-600 hover:text-white py-3 text-lg"
                onClick={() => navigate(-1)}
              >
                {t('profile.back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

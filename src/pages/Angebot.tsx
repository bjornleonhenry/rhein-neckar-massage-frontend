import { Heart, Zap, Users, Crown, Clock, Star, Plus, Trash2, Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '../components/ui/text-effect';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { Stagger } from '../components/ui/stagger';
import { CardHover } from '../components/ui/card-hover';
import { Magnetic } from '../components/ui/magnetic';
import { ButtonHover } from '../components/ui/button-hover';
import { Floating } from '../components/ui/floating';
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';

// API base URL is read from Vite env: VITE_API_BASE
// Falls back to local development URL when not provided.
const API_BASE = (import.meta.env.VITE_API_BASE as string);
const API_ANGEBOTS = `${API_BASE}/angebots`;

interface Angebot {
  id: number;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image?: string;
  services?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Leistungen = () => {
  const [angebots, setAngebots] = useState<Angebot[]>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [editingAngebot, setEditingAngebot] = useState<Angebot | null>(null);

  const { isLoading, t } = useTranslation();

  const [newAngebot, setNewAngebot] = useState({
    title: '',
    description: '',
    price: '',
    duration_minutes: '',
    category: '',
    image: '',
    services: [] as string[],
    is_active: true
  });

  const handleEditClick = (angebot: Angebot) => {
    setEditingAngebot(angebot);
    setNewAngebot({
      title: angebot.title,
      description: angebot.description,
      price: angebot.price.toString(),
      duration_minutes: angebot.duration_minutes.toString(),
      category: angebot.category,
      image: angebot.image ?? '',
      services: angebot.services ?? [],
      is_active: angebot.is_active
    });
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingAngebot(null);
    setNewAngebot({
      title: '',
      description: '',
      price: '',
      duration_minutes: '',
      category: '',
      image: '',
      services: [] as string[],
      is_active: true
    });
    setShowForm(false);
  };

  // Load angebots on component mount
  useEffect(() => {
    const loadAngebots = async () => {
      try {
        setApiLoading(true);
        setApiError(null);

  const response = await fetch(`${API_ANGEBOTS}?per_page=100`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Debug log to help trace response shape in different environments
        console.debug('API /angebots response:', data);
        // Backend might return either an array directly or an object with a `data` field.
        // Be resilient to both shapes.
        if (Array.isArray(data)) {
          setAngebots(data);
        } else if (data && Array.isArray(data.data)) {
          setAngebots(data.data);
        } else {
          setAngebots([]);
        }
      } catch (error) {
        console.error('Error loading angebots:', error);
        setApiError(t('angebot.error.load'));
      } finally {
        setApiLoading(false);
      }
    };

    loadAngebots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const method = editingAngebot ? 'PUT' : 'POST';
      const url = editingAngebot
        ? `${API_ANGEBOTS}/${editingAngebot.id}`
        : API_ANGEBOTS;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newAngebot.title,
          description: newAngebot.description,
          price: parseFloat(newAngebot.price),
          duration_minutes: parseInt(newAngebot.duration_minutes),
          category: newAngebot.category,
          image: newAngebot.image || null,
          services: newAngebot.services,
          is_active: newAngebot.is_active
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedAngebot = await response.json();

      if (editingAngebot) {
        setAngebots(prev => prev.map(a => a.id === editingAngebot.id ? savedAngebot.data : a));
      } else {
        setAngebots(prev => [savedAngebot.data, ...prev]);
      }

      setSubmitSuccess(true);
      handleCancelEdit();
    } catch (error) {
      console.error('Error submitting angebot:', error);
      setSubmitError(t('angebot.error.save'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t('angebot.delete.confirm'))) {
      return;
    }

    try {
  const response = await fetch(`${API_ANGEBOTS}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setAngebots(prev => prev.filter(angebot => angebot.id !== id));
    } catch (error) {
      console.error('Error deleting angebot:', error);
      setApiError(t('angebot.error.delete'));
    }
  };

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'massage':
      case 'erotik':
        return <Heart className="w-8 h-8" />;
      case 'tantra':
        return <Zap className="w-8 h-8" />;
      case 'paar':
        return <Users className="w-8 h-8" />;
      case 'vip':
        return <Crown className="w-8 h-8" />;
      default:
        return <Star className="w-8 h-8" />;
    }
  };

  const services = Array.isArray(angebots) ? angebots
    .filter(angebot => {
      // Only show active angebots
      const isActiveVal = (angebot as any).is_active ?? (angebot as any).isActive ?? false;
      return isActiveVal === true;
    })
    .map(angebot => {
      // tolerate backend field naming differences (snake_case vs camelCase)
      const durationVal = (angebot as any).duration_minutes ?? (angebot as any).durationMinutes ?? null;
      const isActiveVal = (angebot as any).is_active ?? (angebot as any).isActive ?? false;
      let featuresVal: string[] = [];
      if (Array.isArray((angebot as any).services)) {
        featuresVal = (angebot as any).services;
      } else if (typeof (angebot as any).services === 'string' && (angebot as any).services.trim() !== '') {
        // some endpoints return a string; try to split by commas or fallback to the whole string
        featuresVal = (angebot as any).services.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      return {
        icon: getIcon(angebot.category ?? ''),
        title: angebot.title,
        description: angebot.description,
        duration: durationVal !== null && durationVal !== undefined ? `${durationVal} ${t('angebot.duration')}` : '',
        price: `${angebot.price}€`,
        features: featuresVal,
        popular: isActiveVal,
        id: angebot.id
      };
    }) : [];

  const additionalServices = [
    t('angebot.additional_services.1'),
    t('angebot.additional_services.2'),
    t('angebot.additional_services.3'),
    t('angebot.additional_services.4'),
    t('angebot.additional_services.5'),
    t('angebot.additional_services.6')
  ];

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
          <ScrollReveal>
            <div className="text-center mb-16">
               <TextEffect
                 className="text-5xl font-bold text-white mb-6"
                 preset="slide"
                 per="word"
               >
                 {t('angebot.title')}
               </TextEffect>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                {t('angebot.description')}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                onClick={() => setShowForm(!showForm)}
                className={`hidden mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors ${showForm ? 'hidden' : ''}`}
              >
                <Plus className="w-5 h-5 inline mr-2" />
                {t('angebot.button.add_new')}
              </motion.button>
            </div>
          </ScrollReveal>

          {/* Add New Angebot Form */}
          {showForm && (
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{editingAngebot ? t('angebot.edit.title') : t('angebot.create.title')}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">{t('angebot.form.title')}</label>
                      <input
                        type="text"
                        value={newAngebot.title}
                        onChange={(e) => setNewAngebot(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">{t('angebot.form.category')}</label>
                      <input
                        type="text"
                        value={newAngebot.category}
                        onChange={(e) => setNewAngebot(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">{t('angebot.form.description')}</label>
                    <textarea
                      value={newAngebot.description}
                      onChange={(e) => setNewAngebot(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white mb-2">{t('angebot.form.price')}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newAngebot.price}
                        onChange={(e) => setNewAngebot(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">{t('angebot.form.duration')}</label>
                      <input
                        type="number"
                        value={newAngebot.duration_minutes}
                        onChange={(e) => setNewAngebot(prev => ({ ...prev, duration_minutes: e.target.value }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">{t('angebot.form.image')}</label>
                      <input
                        type="text"
                        value={newAngebot.image}
                        onChange={(e) => setNewAngebot(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={newAngebot.is_active}
                      onChange={(e) => setNewAngebot(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="mr-2"
                    />
                    <label htmlFor="is_active" className="text-white">{t('angebot.form.active')}</label>
                  </div>
                  {submitError && (
                    <div className="text-red-400 text-sm">{submitError}</div>
                  )}
                  {submitSuccess && (
                    <div className="text-green-400 text-sm">{t('angebot.success.save')}</div>
                  )}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? t('angebot.loading.save') : t('button.save')}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm transition-colors"
                    >
                      {t('button.cancel')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </ScrollReveal>
          )}

          {/* Loading and Error States */}
          {apiError && (
            <div className="text-center text-red-400 mb-8">
              {apiError}
            </div>
          )}

          {/* Services Grid */}
          {!apiError && services.length > 0 && (
            <Stagger
              staggerDelay={0.15}
              containerDelay={0.3}
              direction="up"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {services.map((service, index) => (
                <CardHover key={service.id || index} intensity="medium">
                  <Magnetic strength={0.2}>
                    <motion.div
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.3 }
                      }}
                      className={`bg-gray-900 border rounded-xl p-6 shadow-lg group relative flex flex-col h-full transform-gpu backface-hidden will-change-transform ${
                        service.popular
                          ? 'border-rose-600/50 hover:border-rose-500'
                          : 'border-rose-900/30 hover:border-rose-600/50'
                      }`}
                    >
                      {service.popular && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="absolute top-6 right-6 z-10 hidden"
                        >
                          <Floating intensity="low" duration={3}>
                            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Beliebt
                            </span>
                          </Floating>
                        </motion.div>
                      )}

                      <motion.button
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => service.id && handleEditClick(angebots.find(a => a.id === service.id)!)}
                        className="hidden absolute top-6 left-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil className="w-4 h-4 text-blue-400 hover:text-blue-300" />
                      </motion.button>

                      {/* Delete button for admin */}
                      <motion.button
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => service.id && handleDelete(service.id)}
                        className="hidden absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                      </motion.button>

                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-rose-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-800/30 transition-colors"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="text-rose-400 hidden"
                        >
                          {service.icon}
                        </motion.div>
                      </motion.div>

                      <Link to={`/angebot/${service.id}`}>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          className="text-xl font-semibold text-white mb-3 cursor-pointer hover:text-rose-300 transition-colors"
                        >
                          {service.title}
                        </motion.h3>
                      </Link>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-300 mb-4 leading-relaxed text-sm overflow-hidden text-ellipsis line-clamp-3"
                        style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      >
                        {service.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="mb-4 flex-grow"
                      >
                        <h4 className="text-white font-semibold mb-2 text-sm">{t('angebot.form.services')}</h4>
                        <div className="space-y-1">
                          {Array.isArray(service.features) && service.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 1.2 + index * 0.1 + idx * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ x: 5 }}
                              className="flex items-center text-xs text-gray-300 cursor-pointer"
                            >
                              <motion.div
                                whileHover={{ scale: 1.5 }}
                                className="w-1.5 h-1.5 bg-rose-400 rounded-full mr-2"
                              />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <div className="mt-auto">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex justify-between items-center pt-4 border-t border-gray-700"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center text-sm text-gray-400 cursor-pointer"
                          >
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-gray-400">{service.duration && service.duration.trim() !== '' ? service.duration : 'k.A.'}</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="text-lg font-bold text-rose-400 cursor-pointer"
                          >
                            {service.price}
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="mt-4 grid grid-cols-2 gap-2"
                        >
                        <Link to={`/angebot/${service.id}`} className="w-full">
                          <ButtonHover className="w-full py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600">
                            {t('angebot.details') || 'Details'}
                          </ButtonHover>
                        </Link>
                        <Link to="/buchen" className="w-full">
                          <ButtonHover className="w-full py-2 rounded-lg text-sm">
                            {t('angebot.book_now')}
                          </ButtonHover>
                        </Link>
                      </motion.div>
                      </div>
                    </motion.div>
                  </Magnetic>
                </CardHover>
              ))}
            </Stagger>
          )}

          {/* No services message */}
          {!apiError && services.length === 0 && (
            <div className="text-center text-gray-300 mb-16">
              <p>{t('angebot.no_services')}</p>
            </div>
          )}

          {/* Additional Services */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 mb-16">
               <motion.h3
                 whileHover={{ scale: 1.05 }}
                 className="text-2xl font-bold text-white mb-6 text-center cursor-pointer"
               >
                 {t('angebot.additional_services.title')}
               </motion.h3>
              <Stagger
                staggerDelay={0.1}
                containerDelay={0.4}
                direction="up"
                className="grid md:grid-cols-3 gap-4"
              >
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center text-gray-300 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 text-rose-400 mr-3" />
                    </motion.div>
                    <span>{service}</span>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </ScrollReveal>

          {/* Pricing Info */}
          <ScrollReveal direction="up" delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 text-center hover:border-rose-400/50 transition-all duration-300"
            >
               <motion.h3
                 whileHover={{ scale: 1.05 }}
                 className="text-2xl font-bold text-white mb-4 cursor-pointer"
               >
                 {t('angebot.pricing.title')}
               </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                 className="text-gray-300 mb-6 leading-relaxed"
               >
                 {t('angebot.pricing.description')}
               </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6"
              >
                {[
                  { title: t('angebot.pricing.deposit.title'), desc: t('angebot.pricing.deposit.description') },
                  { title: t('angebot.pricing.cancellation.title'), desc: t('angebot.pricing.cancellation.description') },
                  { title: t('angebot.pricing.discretion.title'), desc: t('angebot.pricing.discretion.description') }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(244, 63, 94, 0.2)"
                    }}
                    className="bg-gray-900 p-4 rounded-lg cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-rose-400 font-bold text-lg mb-2"
                    >
                      {item.title}
                    </motion.div>
                    <div className="text-gray-300 text-sm">{item.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
      )}
    </>
  );
};

export default Leistungen;

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '../components/ui/text-effect';
import { ButtonHover } from '../components/ui/button-hover';
import { useTranslation } from '@/hooks/useTranslation';

const Kontakt = () => {
  const { t, isLoading } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const openingHours = [
    { day: t('kontakt.hours.1.day'), hours: t('kontakt.hours.1.time') },
    { day: t('kontakt.hours.2.day'), hours: t('kontakt.hours.2.time') },
    { day: t('kontakt.hours.3.day'), hours: t('kontakt.hours.3.time') }
  ];

  const services = [
    t('kontakt.form.service.1'),
    t('kontakt.form.service.2'),
    t('kontakt.form.service.3'),
    t('kontakt.form.service.4'),
    t('kontakt.form.service.5'),
    t('kontakt.form.service.6'),
    t('kontakt.form.service.7'),
    t('kontakt.form.service.8')
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const apiBase = import.meta.env.VITE_API_BASE;
      const response = await fetch(`${apiBase}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        });
      } else {
        setSubmitError(result.message || t('kontakt.form.error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(t('kontakt.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto"></div>
              <p className="text-gray-300 mt-4">{t('kontakt.loading')}</p>
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
            <TextEffect
              className="text-5xl font-bold text-white mb-6"
              preset="slide"
              per="word"
            >
              {t('kontakt.title')}
            </TextEffect>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              {t('kontakt.description')}
            
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 shadow-lg mb-8 hover:border-rose-400/50 transition-all duration-300"
            >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6"
                >
                  {t('kontakt.info.title')}
                </motion.h3>              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    className="bg-rose-900/20 p-3 rounded-full"
                  >
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{t('kontakt.info.address.title')}</h4>
                    <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('kontakt.info.address.value') }}></p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    className="bg-rose-900/20 p-3 rounded-full"
                  >
                    <Phone className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{t('kontakt.info.phone.title')}</h4>
                    <p className="text-gray-300">{t('kontakt.info.phone.value')}</p>
                    <p className="text-gray-400 text-sm">{t('kontakt.info.phone.note')}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    className="bg-rose-900/20 p-3 rounded-full"
                  >
                    <Mail className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{t('kontakt.info.email.title')}</h4>
                    <p className="text-gray-300">{t('kontakt.info.email.value')}</p>
                    <p className="text-gray-400 text-sm">{t('kontakt.info.email.note')}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 shadow-lg mb-8 hover:border-rose-400/50 transition-all duration-300"
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-6 flex items-center"
              >
                <motion.div
                  className="mr-2"
                >
                  <Clock className="w-6 h-6 text-rose-400" />
                </motion.div>
                {t('kontakt.hours.title')}
              </motion.h3>

              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                  >
                    <span className="font-medium text-white">{schedule.day}</span>
                    <span className="text-gray-300">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 p-4 bg-rose-900/10 rounded-lg border border-rose-900/30"
              >
                <p className="text-rose-300 text-sm">
                  <strong>{t('kontakt.hours.note.strong')}:</strong> {t('kontakt.hours.note.text')}
                </p>
              </motion.div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 shadow-lg hover:border-rose-400/50 transition-all duration-300"
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-6"
              >
                {t('kontakt.location.title')}
              </motion.h3>
              <motion.div
                className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                  >
                    <MapPin className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-300">{t('kontakt.location.placeholder')}</p>
                  <p className="text-gray-400 text-sm">{t('kontakt.location.address')}</p>
                </div>
              </motion.div>
              <div className="mt-4 space-y-1">
                <p className="text-gray-400 text-sm">• Diskrete Eingänge verfügbar</p>
                <p className="text-gray-400 text-sm">• Parkplätze in der Nähe</p>
                <p className="text-gray-400 text-sm">• Öffentliche Verkehrsmittel: 5 Min zu Fuß</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 shadow-lg hover:border-rose-400/50 transition-all duration-300"
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-6 flex items-center"
              >
                <motion.div
                >
                  <Calendar className="w-6 h-6 text-rose-400 mr-2" />
                </motion.div>
                {t('kontakt.form.title')}
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      {t('kontakt.form.name.label')} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      placeholder={t('kontakt.form.name.placeholder')}
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      {t('kontakt.form.phone.label')} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      placeholder={t('kontakt.form.phone.placeholder')}
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t('kontakt.form.email.label')}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder={t('kontakt.form.email.placeholder')}
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t('kontakt.form.service.label')} *
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    required
                  >
                    <option value="">{t('kontakt.form.service.placeholder')}</option>
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </motion.select>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      {t('kontakt.form.date.label')}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      {t('kontakt.form.time.label')}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t('kontakt.form.message.label')}
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                    placeholder={t('kontakt.form.message.placeholder')}
                  />
                </motion.div>

                <motion.div
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t('kontakt.form.privacy')}
                  </p>
                </motion.div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg"
                  >
                    <p className="text-green-400 text-center">
                      ✓ {t('kontakt.form.success')}
                    </p>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-red-400 text-center">
                      ✗ {submitError}
                    </p>
                  </motion.div>
                )}

                <motion.div className="pt-4">
                  <ButtonHover 
                    type="submit"
                    className="w-full py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>{isSubmitting ? t('kontakt.form.submitting') : t('kontakt.form.submit')}</span>
                    </div>
                  </ButtonHover>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;

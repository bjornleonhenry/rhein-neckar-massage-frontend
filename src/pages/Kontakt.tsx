import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '../components/ui/text-effect';
import { ButtonHover } from '../components/ui/button-hover';
import { useTranslation } from '@/hooks/useTranslation';

const Kontakt = () => {
  const { isLoading } = useTranslation();
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
    { day: "Montag - Freitag", hours: "12:00 - 24:00" },
    { day: "Samstag", hours: "14:00 - 02:00" },
    { day: "Sonntag", hours: "16:00 - 24:00" }
  ];

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
      const apiBase = import.meta.env.VITE_API_BASE;
      const response = await fetch(`${apiBase}/api/messages`, {
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
        setSubmitError(result.message || 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
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
              <p className="text-gray-300 mt-4">Lade Kontakt...</p>
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
              Kontakt & Terminbuchung
            </TextEffect>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Vereinbaren Sie noch heute Ihren diskreten Termin für eine exklusive Massage-Erfahrung.
            
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
                Kontaktinformationen
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    className="bg-rose-900/20 p-3 rounded-full"
                  >
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">Adresse</h4>
                    <p className="text-gray-300">
                      Elisabethenstraße 45<br />
                      64283 Heidelberg<br />
                      Deutschland
                    </p>
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
                    <h4 className="font-semibold text-white">Telefon</h4>
                    <p className="text-gray-300">+49 151 00000000</p>
                    <p className="text-gray-400 text-sm">Täglich erreichbar</p>
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
                    <h4 className="font-semibold text-white">E-Mail</h4>
                    <p className="text-gray-300">paygirls@erotischsmassage.com</p>
                    <p className="text-gray-400 text-sm">Antwort innerhalb 24h</p>
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
                Öffnungszeiten
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
                  <strong>Hinweis:</strong> Termine außerhalb der regulären Öffnungszeiten
                  sind nach Absprache möglich. Kontaktieren Sie uns für individuelle Vereinbarungen.
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
                Standort
              </motion.h3>
              <motion.div
                className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                  >
                    <MapPin className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-300">Google Maps Integration</p>
                  <p className="text-gray-400 text-sm">Elisabethenstraße 45, 64283 Heidelberg</p>
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
                Termin vereinbaren
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      Vorname *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      placeholder="Ihr Vorname"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      Telefon *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      placeholder="+49 123 456789"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    E-Mail (optional)
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder="ihre.email@beispiel.de"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    Gewünschte Behandlung *
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    required
                  >
                    <option value="">Service wählen</option>
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
                      Wunschdatum
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
                      Wunschzeit
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
                    Nachricht (optional)
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                    placeholder="Besondere Wünsche oder Anmerkungen..."
                  />
                </motion.div>

                <motion.div
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <p className="text-xs text-gray-400 leading-relaxed">
                    * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                  </p>
                </motion.div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg"
                  >
                    <p className="text-green-400 text-center">
                      ✓ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.
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
                      <span>{isSubmitting ? 'Wird gesendet...' : 'Terminanfrage senden'}</span>
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

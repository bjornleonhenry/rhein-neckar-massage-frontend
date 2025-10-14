import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Contact = () => {
  const { t, isLoading } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (isLoading) {
    return null;
  }

  const openingHours = [
    { day: t('contact.hours.weekdays'), hours: t('contact.hours.monday') },
    { day: t('contact.hours.saturday'), hours: t('contact.hours.saturday.hours') },
    { day: t('contact.hours.sunday'), hours: t('contact.hours.sunday.hours') }
  ];

  const services = [
    t('contact.services.erotik_massage'),
    t('contact.services.tantra_massage'),
    t('contact.services.vip_service'),
    t('contact.services.paar_erlebnis'),
    t('contact.services.body_to_body'),
    t('contact.services.girlfriend_experience'),
    t('contact.services.thai_massage'),
    t('contact.services.oel_massage')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Combine first and last name for the API
      const apiData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      };

      const apiBase = import.meta.env.VITE_API_BASE;
      const response = await fetch(`${apiBase}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
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

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
          <h2 className="text-4xl font-bold text-white mb-4">{t('contact.section.title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.section.description')}
          </p>
        </div>        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8 border border-rose-900/30">
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.info.title')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-900/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t('contact.info.address.title')}</h4>
                    <p className="text-gray-300">
                      {t('contact.info.address.street')}<br />
                      {t('contact.info.address.city')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-900/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t('contact.info.phone.title')}</h4>
                    <p className="text-gray-300">{t('contact.info.phone.number')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-900/20 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t('contact.info.email.title')}</h4>
                    <p className="text-gray-300">{t('contact.info.email.address')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-rose-900/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 text-rose-400 mr-2" />
                {t('contact.hours.title')}
              </h3>
              
              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium text-white">{schedule.day}</span>
                    <span className="text-gray-300">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-rose-900/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 text-rose-400 mr-2" />
              {t('contact.booking.title')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.firstname')}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder={t('contact.form.firstname.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.lastname')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder={t('contact.form.lastname.placeholder')}
                  />
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder={t('contact.form.email.placeholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.service')}</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                >
                  <option value="">{t('contact.form.service.placeholder')}</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                  placeholder={t('contact.form.message.placeholder')}
                />
              </div>
              
              {submitSuccess && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-center">
                    {t('contact.form.success')}
                  </p>
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-center">
                    {submitError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

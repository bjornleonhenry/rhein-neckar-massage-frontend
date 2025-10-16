import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, Star, Phone, Mail, ArrowLeft, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Buchen = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const selectedGirl = searchParams.get('girl');
  
  const [bookingData, setBookingData] = useState({
    girl: selectedGirl || '',
    service: '',
    date: '',
    time: '',
    duration: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    specialRequests: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const girls = [
    { name: "Lila", specialties: ["Tantra", "Thai Massage", "Entspannung"], available: true },
    { name: "Maya", specialties: ["Erotik Massage", "Öl Massage", "VIP Service"], available: true },
    { name: "Nira", specialties: ["Paar Massage", "Wellness", "Entspannung"], available: false },
    { name: "Kira", specialties: ["Tantra", "Meditation", "Spirituell"], available: true },
    { name: "Siri", specialties: ["Hot Stone", "Deep Tissue", "Reflexologie"], available: true },
    { name: "Ploy", specialties: ["Erotik Massage", "Körperbehandlung", "Intimität"], available: true },
    { name: "Anya", specialties: ["VIP Service", "Luxus Behandlung", "Diskretion"], available: false },
    { name: "Nin", specialties: ["Aromatherapie", "Entspannung", "Wellness"], available: true }
  ];

  const services = [
    { name: "Erotik Massage", duration: "60-90 Min", price: "ab 150€" },
    { name: "Tantra Massage", duration: "90-120 Min", price: "ab 200€" },
    { name: "VIP Service", duration: "120-180 Min", price: "ab 300€" },
    { name: "Paar Erlebnis", duration: "90-150 Min", price: "ab 350€" },
    { name: "Body-to-Body", duration: "60-90 Min", price: "ab 180€" },
    { name: "Girlfriend Experience", duration: "120-240 Min", price: "ab 400€" },
    { name: "Thai Massage", duration: "60-90 Min", price: "ab 120€" },
    { name: "Öl Massage", duration: "60-90 Min", price: "ab 140€" }
  ];

  const timeSlots = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  useEffect(() => {
    if (selectedGirl) {
      setBookingData(prev => ({ ...prev, girl: selectedGirl }));
    }
  }, [selectedGirl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(t('buchen.error.submit') + ' ' + (result.message || t('buchen.error.retry')));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('buchen.error.submit_full'));
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <div className="pt-0">
        <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-12">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{t('buchen.success.title')}</h1>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('buchen.success.message')}
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-white font-semibold mb-2">{t('buchen.success.details')}</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>{t('buchen.success.girl')}</strong> {bookingData.girl}</p>
                  <p><strong>{t('buchen.success.service')}</strong> {bookingData.service}</p>
                  <p><strong>{t('buchen.success.date')}</strong> {bookingData.date}</p>
                  <p><strong>{t('buchen.success.time')}</strong> {bookingData.time}</p>
                </div>
              </div>
              <Link 
                to="/" 
                className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors inline-block"
              >
                {t('buchen.success.back_home')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center text-rose-400 hover:text-rose-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('buchen.back_home')}
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">{t('buchen.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('buchen.description')}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNum 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-rose-600' : 'bg-gray-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('buchen.step1.title')}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        {t('buchen.step1.girl_label')}
                      </label>
                      <select
                        name="girl"
                        value={bookingData.girl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      >
                        <option value="">{t('buchen.select.placeholder')}</option>
                        {girls.filter(girl => girl.available).map((girl, idx) => (
                          <option key={idx} value={girl.name}>
                            {girl.name} - {Array.isArray(girl.specialties) ? girl.specialties.join(', ') : (girl.specialties || 'Massage')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        {t('buchen.step1.service_label')}
                      </label>
                      <select
                        name="service"
                        value={bookingData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      >
                        <option value="">{t('buchen.select.placeholder')}</option>
                        {services.map((service, idx) => (
                          <option key={idx} value={service.name}>
                            {service.name} - {service.duration} - {service.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!bookingData.girl || !bookingData.service}
                      className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      {t('buchen.button.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('buchen.step2.title')}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        {t('buchen.step2.date_label')}
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        {t('buchen.step2.time_label')}
                      </label>
                      <select
                        name="time"
                        value={bookingData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      >
                        <option value="">{t('buchen.select.placeholder')}</option>
                        {timeSlots.map((time, idx) => (
                          <option key={idx} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {t('buchen.step2.requests_label')}
                    </label>
                    <textarea
                      rows={3}
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                      placeholder={t('buchen.step2.requests_placeholder')}
                    />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-rose-600 text-rose-400 px-8 py-3 rounded-lg font-semibold hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      {t('buchen.button.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!bookingData.date || !bookingData.time}
                      className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                      {t('buchen.button.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t('buchen.step3.title')}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('buchen.step3.name_label')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('buchen.step3.phone_label')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('buchen.step3.email_label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('buchen.step3.message_label')}
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={bookingData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                      placeholder={t('buchen.step3.message_placeholder')}
                    />
                  </div>

                  <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">{t('buchen.step3.summary_title')}</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><strong>{t('buchen.step3.summary_girl')}</strong> {bookingData.girl}</p>
                      <p><strong>{t('buchen.step3.summary_service')}</strong> {bookingData.service}</p>
                      <p><strong>{t('buchen.step3.summary_date')}</strong> {bookingData.date}</p>
                      <p><strong>{t('buchen.step3.summary_time')}</strong> {bookingData.time}</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {t('buchen.step3.disclaimer')}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-rose-600 text-rose-400 px-8 py-3 rounded-lg font-semibold hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      {t('buchen.button.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={!bookingData.name || !bookingData.phone}
                      className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      {t('buchen.button.submit')}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buchen;

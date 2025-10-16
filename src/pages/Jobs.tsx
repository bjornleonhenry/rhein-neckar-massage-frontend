import React, { useState } from 'react';
import { Heart, Star, Users, Euro, Send, Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Jobs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    age: string;
    nationality: string;
    languages: string;
    email: string;
    phone: string;
    experience: string;
    availability: string;
    specialties: string[];
    motivation: string;
    references: string;
  }>({
    firstName: '',
    lastName: '',
    age: '',
    nationality: '',
    languages: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    specialties: [],
    motivation: '',
    references: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const benefits = [
    {
      icon: <Euro className="w-6 h-6" />,
      title: t('jobs.benefits.1.title'),
      description: t('jobs.benefits.1.description')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('jobs.benefits.2.title'),
      description: t('jobs.benefits.2.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('jobs.benefits.3.title'),
      description: t('jobs.benefits.3.description')
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: t('jobs.benefits.4.title'),
      description: t('jobs.benefits.4.description')
    }
  ];

  const requirements = [
    t('jobs.requirements.1'),
    t('jobs.requirements.2'),
    t('jobs.requirements.3'),
    t('jobs.requirements.4'),
    t('jobs.requirements.5'),
    t('jobs.requirements.6')
  ];

  const specialtyOptions = [
    t('jobs.form.specialty.1'),
    t('jobs.form.specialty.2'),
    t('jobs.form.specialty.3'),
    t('jobs.form.specialty.4'),
    t('jobs.form.specialty.5'),
    t('jobs.form.specialty.6'),
    t('jobs.form.specialty.7'),
    t('jobs.form.specialty.8')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = formData.specialties.includes(specialty)
      ? formData.specialties.filter(s => s !== specialty)
      : [...formData.specialties, specialty];
    
    setFormData({
      ...formData,
      specialties: updatedSpecialties
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.age || 
        !formData.nationality.trim() || !formData.languages.trim() || !formData.email.trim() || 
        !formData.phone.trim() || !formData.motivation.trim()) {
      setSubmitError(t('jobs.form.error.validation'));
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const apiBase = import.meta.env.VITE_API_BASE;
      
      // Convert age to number and prepare data
      const submitData = {
        ...formData,
        age: parseInt(formData.age, 10),
      };

      console.log('Submitting job application:', submitData); // Debug log
      
      const response = await fetch(`${apiBase}/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      console.log('Response:', response.status, result); // Debug log

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          nationality: '',
          languages: '',
          email: '',
          phone: '',
          experience: '',
          availability: '',
          specialties: [],
          motivation: '',
          references: ''
        });
      } else {
        // Show validation errors
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(', ');
          setSubmitError(`Validierungsfehler: ${errorMessages}`);
        } else {
          setSubmitError(t('jobs.form.error.submit'));
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(t('jobs.form.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4 sm:px-6 md:px-0 text-sm hidden md:block">
            <h1 className="text-5xl font-bold text-white mb-6">{t('jobs.title')}</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('jobs.description')}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-900 border border-rose-900/30 rounded-xl p-6 text-center hover:border-rose-600/50 transition-colors">
                <div className="bg-rose-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-rose-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Requirements */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('jobs.requirements.title')}</h3>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('jobs.process.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-gray-300 text-sm">{t('jobs.process.1')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-gray-300 text-sm">{t('jobs.process.2')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-gray-300 text-sm">{t('jobs.process.3')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-gray-300 text-sm">{t('jobs.process.4')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 border border-rose-900/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Heart className="w-6 h-6 text-rose-400 mr-2" />
                  {t('jobs.form.title')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.firstName')}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.lastName')}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.age')}
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="21"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.nationality')}
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.languages')}
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleInputChange}
                      placeholder={t('jobs.form.languages.placeholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('jobs.form.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.experience')}
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    >
                      <option value="">{t('jobs.form.experience.option1')}</option>
                      <option value="keine">{t('jobs.form.experience.option2')}</option>
                      <option value="wenig">{t('jobs.form.experience.option3')}</option>
                      <option value="mittel">{t('jobs.form.experience.option4')}</option>
                      <option value="viel">{t('jobs.form.experience.option5')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.availability')}
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-gray-700 text-white"
                    >
                      <option value="">{t('jobs.form.availability.option1')}</option>
                      <option value="vollzeit">{t('jobs.form.availability.option2')}</option>
                      <option value="teilzeit">{t('jobs.form.availability.option3')}</option>
                      <option value="wochenende">{t('jobs.form.availability.option4')}</option>
                      <option value="flexibel">{t('jobs.form.availability.option5')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.specialties')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {specialtyOptions.map((specialty, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.specialties.includes(specialty)}
                            onChange={() => handleSpecialtyChange(specialty)}
                            className="mr-2 rounded border-gray-600 text-rose-600 focus:ring-rose-500"
                          />
                          <span className="text-gray-300 text-sm">{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.motivation')}
                    </label>
                    <textarea
                      rows={4}
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      placeholder={t('jobs.form.motivation.placeholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('jobs.form.references')}
                    </label>
                    <textarea
                      rows={3}
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      placeholder={t('jobs.form.references.placeholder')}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none bg-gray-700 text-white"
                    />
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {t('jobs.form.privacy')}
                    </p>
                  </div>

                  {submitSuccess && (
                    <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                      <p className="text-green-400 text-center">
                        {t('jobs.form.success')}
                      </p>
                    </div>
                  )}

                  {submitError && (
                    <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 text-center">
                        ✗ {submitError}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rose-600 text-white py-4 rounded-lg font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? t('jobs.form.submit.loading') : t('jobs.form.submit.default')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;

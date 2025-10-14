import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/ui/text-effect';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { CardHover } from '@/components/ui/card-hover';
import { useTranslation } from '@/hooks/useTranslation';

const Testimonials = () => {
  const { t, isLoading } = useTranslation();

  const [testimonials, setTestimonials] = useState<any[]>([]);

  // fetch testimonials from local json-server (if running)
  useEffect(() => {
    let mounted = true;
    fetch('/testimonials')
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        if (mounted && Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {
        // keep defaultTestimonials
      });
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return null;
  }

  const defaultTestimonials = [
    {
      name: t('testimonials.michael.name'),
      location: t('testimonials.michael.location'),
      text: t('testimonials.michael.text'),
      rating: 5,
      image: "assets/test3.jpg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: t('testimonials.stefan.name'),
      location: t('testimonials.stefan.location'),
      text: t('testimonials.stefan.text'),
      rating: 5,
      image: "assets/test4.jpg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: t('testimonials.alexander.name'),
      location: t('testimonials.alexander.location'),
      text: t('testimonials.alexander.text'),
      rating: 5,
      image: "assets/test5.jpg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  // Use default testimonials if none loaded from API
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (isLoading) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <TextEffect
              className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
              preset="slide"
              per="word"
            >
              {t('testimonials.section.title')}
            </TextEffect>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              {t('testimonials.section.description')}
            </motion.p>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {displayTestimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <CardHover intensity="medium">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gray-900 rounded-xl p-8 relative hover:shadow-2xl transition-all duration-300 border border-rose-900/30 hover:border-rose-400/50 h-full"
                >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Quote className="w-8 h-8 text-rose-900/40" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-400 hover:border-rose-300 transition-colors duration-300"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"
                    />
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex mb-4"
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-300 leading-relaxed"
                >
                  "{testimonial.text}"
                </motion.p>
                </motion.div>
              </CardHover>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

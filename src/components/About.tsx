import { Award, Users, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/ui/text-effect';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { t, isLoading } = useTranslation();

  if (isLoading) {
    return null;
  }

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: "10+", label: t('about.stats.experience') },
    { icon: <Users className="w-6 h-6" />, value: "300+", label: t('about.stats.customers') },
    { icon: <Clock className="w-6 h-6" />, value: "24/7", label: t('about.stats.booking') },
    { icon: <MapPin className="w-6 h-6" />, value: "5", label: t('about.stats.rooms') }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <TextEffect
                className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6"
                preset="slide"
                per="word"
              >
                {t('home.hero.badge')}
              </TextEffect>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-sm sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed"
              >
                {t('home.hero.intro').split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)}
              </motion.p>
            
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(244, 63, 94, 0.1)"
                    }}
                    className="bg-gray-800 p-4 rounded-lg shadow-sm border border-rose-900/30 hover:border-rose-400/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-rose-400"
                      >
                        {stat.icon}
                      </motion.div>
                      <div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-2xl font-bold text-white"
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ScrollReveal>

        <ScrollReveal direction="right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: "https://bilder1.ladies-cdn.de/Bilder/030/12997030-F0.JPG?auto=compress&cs=tinysrgb&w=400",
                    alt: "Sinnliche Erotik-Massage Behandlung",
                    delay: 0.2,
                    className: ""
                  },
                  {
                    src: "https://bilder1.ladies-cdn.de/Bilder/478/11232478-F0.JPG?auto=compress&cs=tinysrgb&w=400",
                    alt: "Verführerische Erotik-Atmosphäre",
                    delay: 0.4,
                    className: "mt-8"
                  },
                  {
                    src: "https://bilder1.ladies-cdn.de/Bilder/000/13341000-F0.JPG?auto=compress&cs=tinysrgb&w=400",
                    alt: "Privater Lust-Behandlungsraum",
                    delay: 0.6,
                    className: "-mt-8"
                  },
                  {
                    src: "https://bilder1.ladies-cdn.de/Bilder/706/12746706-F0.JPG?auto=compress&cs=tinysrgb&w=400",
                    alt: "Sinnliche Erotik-Atmosphäre",
                    delay: 0.8,
                    className: ""
                  }
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: image.delay }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                    }}
                    className={`relative overflow-hidden rounded-lg shadow-lg ${image.className} group cursor-pointer`}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <p className="text-white font-medium text-sm">{image.alt}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;

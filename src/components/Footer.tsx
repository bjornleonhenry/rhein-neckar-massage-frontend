import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/ui/text-effect';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useTranslation } from '@/hooks/useTranslation';

const Footer = () => {
  const { t, currentLanguage, changeLanguage, isLoading } = useTranslation();

  if (isLoading) {
    return null;
  }

  return (
    <footer className="bg-black text-white pt-12 pb-8 border-t border-rose-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-2 gap-8 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 lg:col-span-1"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold mb-4 cursor-pointer"
              >
                <TextEffect
                  className="inline-block"
                  preset="fade"
                  per="word"
                >
                  Rhein<span className="text-rose-400"> Neckar </span>Massage
                </TextEffect>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                {t('footer.description')}
              </motion.p>
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {[
                  { icon: <MapPin className="w-5 h-5" />, delay: 0.1 },
                  { icon: <Phone className="w-5 h-5" />, delay: 0.2 },
                  { icon: <Mail className="w-5 h-5" />, delay: 0.3 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + item.delay }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      backgroundColor: "#dc2626"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-rose-600 p-2 rounded-full cursor-pointer transition-all duration-300"
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-1 lg:flex lg:justify-end lg:gap-12 xl:gap-16 space-y-8 sm:space-y-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
              <motion.h4
                whileHover={{ scale: 1.05 }}
                className="text-lg font-semibold mb-4 cursor-pointer"
              >
                Navigation
              </motion.h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  { to: "/", label: t('nav.home') },
                  { to: "/mieterinnen", label: t('nav.mieterinnen') },
                  { to: "/angebot", label: t('nav.angebot') },
                  { to: "/ambiente", label: t('nav.ambiente') },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={item.to} className="hover:text-rose-400 transition-colors block">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.h4
                whileHover={{ scale: 1.05 }}
                className="text-lg font-semibold mb-4 cursor-pointer"
              >
                {currentLanguage === 'de' ? 'Verbindung' : 'Connection'}
              </motion.h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  { to: "/gaestebuch", label: t('nav.gaestebuch') },
                  { to: "/jobs", label: t('nav.jobs') },
                  { to: "/kontakt", label: t('nav.message') },
                  // Booking link is optional based on env flag
                  ...(import.meta.env.VITE_HIDE_BOOKING !== 'true' ? [{ to: "/buchen", label: t('nav.booking') }] : []),
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    {item.to ? (
                      <Link to={item.to} className="hover:text-rose-400 transition-colors block">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.to} className="hover:text-rose-400 transition-colors block">
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h4
                whileHover={{ scale: 1.05 }}
                className="text-lg font-semibold mb-4 cursor-pointer"
              >
                {currentLanguage === 'de' ? 'Kontakt' : 'Contact'}
              </motion.h4>
              <div className="space-y-3 text-gray-300">
                {[
                  { icon: <MapPin className="w-4 h-4" />, text: t('footer.address'), delay: 0.1 },
                  { icon: <Phone className="w-4 h-4" />, text: "+49 151 00000000", delay: 0.2 },
                  { icon: <Mail className="w-4 h-4" />, text: "kontakt@rhein-neckar-massage.de", delay: 0.3 },
                  { icon: <Clock className="w-4 h-4" />, text: currentLanguage === 'de' ? "Mo-Fr: 12:00-24:00" : "Mon-Fri: 12:00-24:00", delay: 0.4 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + item.delay }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="mr-2 text-rose-400"
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            </div>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                whileHover={{ scale: 1.02 }}
                className="text-gray-300 text-sm cursor-pointer"
              >
                {t('footer.copyright')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex space-x-6 mt-4 md:mt-0"
              >
                {[
                  { href: "datenschutz", label: t('footer.privacy') },
                  { href: "impressum", label: t('footer.imprint') },
                  { href: "agb", label: t('footer.terms') }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      color: "#f43f5e"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-rose-400 text-sm transition-all duration-300 cursor-pointer"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>

              {/* Language Switcher */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mt-4 md:mt-0"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="text-rose-400"
                >
                  <Globe className="w-4 h-4" />
                </motion.div>
                <div className="flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => changeLanguage('de')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentLanguage === 'de'
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    DE
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentLanguage === 'en'
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    EN
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;

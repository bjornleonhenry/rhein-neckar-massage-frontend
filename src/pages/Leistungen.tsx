import { Heart, Zap, Users, Crown, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TextEffect } from '../components/ui/text-effect';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import { Stagger } from '../components/ui/stagger';
import { CardHover } from '../components/ui/card-hover';
import { Magnetic } from '../components/ui/magnetic';
import { ButtonHover } from '../components/ui/button-hover';
import { Floating } from '../components/ui/floating';

const Leistungen = () => {
  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Verführungsmassage",
      description: "Verführerische Ganzkörpermassage mit sinnlichen Berührungen und erotischen Techniken für ultimatives Lustempfinden.",
      duration: "60-90 Min",
      price: "ab 150€",
      features: ["Ganzkörperverwöhnung", "Erotische Stimulation", "Aphrodisische Öle", "Verführerische Atmosphäre"],
      popular: true
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Tantrische Erotik",
      description: "Mystische und sinnliche Tantra-Massage die Körper und Seele in Ekstase versetzt und verborgene Lust erweckt.",
      duration: "90-120 Min",
      price: "ab 200€",
      features: ["Erotische Energiearbeit", "Lustvolle Meditation", "Chakra Stimulation", "Sexuelle Erleuchtung"],
      popular: false
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Wilde Paar-Ekstase",
      description: "Heißes und leidenschaftliches Paar-Erlebnis mit zwei sinnlichen Göttinnen für unvergessliche Dreier-Lust.",
      duration: "90-150 Min",
      price: "ab 350€",
      features: ["Zwei Verführerinnen", "Privater Lust-Raum", "Champagner & Aphrodisiaka", "Orgastische Atmosphäre"],
      popular: false
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "VIP Lust-Palast",
      description: "Luxuriöses und exklusives Erotik-Erlebnis mit allen Sinnen in unserer privaten VIP Lust-Suite.",
      duration: "120-180 Min",
      price: "ab 300€",
      features: ["VIP Erotik-Suite", "Aphrodisische Premiumöle", "Privat Whirlpool", "Persönliche Sklavin"],
      popular: true
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Thai Erotik-Massage",
      description: "Authentische thailändische Massage mit sinnlichen und erotischen Elementen für tiefe Entspannung und Lust.",
      duration: "60-90 Min",
      price: "ab 120€",
      features: ["Erotische Techniken", "Sinnliche Druckpunkte", "Verführerisches Stretching", "Lustvolle Energiebalance"],
      popular: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Aphrodisische Öl-Erotik",
      description: "Sinnliche Ganzkörperverwöhnung mit erregenden Aromaölen für ultimative Lust und sinnliche Hingabe.",
      duration: "60-90 Min",
      price: "ab 140€",
      features: ["Aphrodisische Aromatherapie", "Ganzkörperstimulation", "Erotische Musik", "Heiße sinnliche Öle"],
      popular: false
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Body-to-Body Ekstase",
      description: "Intensive Haut-an-Haut-Massage mit direkten sinnlichen Berührungen für ein überwältigendes Erotik-Erlebnis.",
      duration: "60-90 Min",
      price: "ab 180€",
      features: ["Direkter Hautkontakt", "Sinnliche Stimulation", "Warme erregende Öle", "Intime Verführungsatmosphäre"],
      popular: true
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Schön Erotik-Erlebnis",
      description: "Authentisches und leidenschaftliches Liebeserlebnis mit emotionaler Bindung und sinnlicher Hingabe.",
      duration: "120-240 Min",
      price: "ab 400€",
      features: ["Persönliche Verführung", "Emotionale Erotik", "Romantisches Dinner mit Sex", "Overnight Lust-Nächte"],
      popular: false
    }
  ];

  const additionalServices = [
    "Outcall Erotik-Service (Hotelbesuche)",
    "Overnight Lust-Begleitung",
    "Verführerische Dinner Dates",
    "Erotische Wellness Packages",
    "Lust-Geschenkgutscheine",
    "Diskrete Firmen-Events mit Erotik"
  ];

  return (
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
                Unsere Leistungen
              </TextEffect>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Tauchen Sie ein in unsere Welt der sinnlichen Verführung und erotischen Lust.
                Entdecken Sie unser vielfältiges Angebot an leidenschaftlichen Massagen und exklusiven Erotik-Services.
                Jede Behandlung wird individuell auf Ihre verborgensten Wünsche und Sehnsüchte abgestimmt.
              </motion.p>
            </div>
          </ScrollReveal>

          <Stagger
            staggerDelay={0.15}
            containerDelay={0.3}
            direction="up"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <CardHover key={index} intensity="medium">
                <Magnetic strength={0.2}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    className={`bg-gray-900 border rounded-xl p-6 shadow-lg group relative flex flex-col h-full min-h-[420px] max-h-[420px] ${
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
                        className="absolute top-6 right-6 z-10"
                      >
                        <Floating intensity="low" duration={3}>
                          <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Beliebt
                          </span>
                        </Floating>
                      </motion.div>
                    )}
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
                        className="text-rose-400"
                      >
                        {service.icon}
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="text-xl font-semibold text-white mb-3 cursor-pointer"
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-gray-300 mb-4 leading-relaxed text-sm max-h-12 min-h-[3rem] overflow-hidden text-ellipsis line-clamp-2"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                      {service.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="mb-4 flex-1"
                    >
                      <h4 className="text-white font-semibold mb-2 text-sm">Inkludiert:</h4>
                      <div className="space-y-1">
                        {service.features.map((feature, idx) => (
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
                        {service.duration}
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
                      className="mt-4"
                    >
                      <ButtonHover className="w-full py-2 rounded-lg text-sm">
                        Jetzt buchen
                      </ButtonHover>
                    </motion.div>
                  </motion.div>
                </Magnetic>
              </CardHover>
            ))}
          </Stagger>

          {/* Additional Services */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-gray-800 border border-rose-900/30 rounded-xl p-8 mb-16 hover:border-rose-400/50 transition-all duration-300">
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-white mb-6 text-center cursor-pointer"
              >
                Erotische Zusatz-Services
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
                Preise & Buchung
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                Alle Preise verstehen sich als Grundpreise für unsere erotischen Verführungen. Spezielle Wünsche,
                Fetische und besondere Extras werden individuell berechnet. Für eine persönliche und diskrete
                Beratung Ihrer verborgensten Sehnsüchte kontaktieren Sie uns.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6"
              >
                {[
                  { title: "Vorauszahlung", desc: "50% bei Buchung" },
                  { title: "Stornierung", desc: "24h vorher kostenfrei" },
                  { title: "Diskretion", desc: "100% garantiert" }
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
  );
};

export default Leistungen;

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { TextEffect } from '@/components/ui/text-effect';
import { useTranslation } from '@/hooks/useTranslation';

const Header = () => {
  const { t } = useTranslation();
  // Scroll to top on navigation
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const navSpacerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  // always hide the top bar by default and mark as dismissed so it never reappears
  const [showTopBar, setShowTopBar] = useState(false);
  const topBarDismissed = useRef(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function updateNavTop() {
      const topBarEl = topBarRef.current;
      const navEl = navRef.current;
      const spacerEl = navSpacerRef.current;
      if (navEl) {
        const height = topBarEl && showTopBar ? Math.ceil(topBarEl.getBoundingClientRect().height) : 0;
        // make nav fixed and position it just below the top bar (or top of page if hidden)
        navEl.style.position = 'fixed';
        navEl.style.left = '0';
        navEl.style.right = '0';
        navEl.style.width = '100%';
        navEl.style.top = `${height}px`;
        navEl.style.zIndex = '9999';
        // set spacer height to the nav's height to avoid layout jump
        if (spacerEl) {
          const navHeight = Math.ceil(navEl.getBoundingClientRect().height);
          spacerEl.style.height = `${navHeight + height}px`;
        }
      }
    }

    updateNavTop();
    window.addEventListener('resize', updateNavTop);
    return () => window.removeEventListener('resize', updateNavTop);
  }, [showTopBar]);

  // scroll listener: hide top bar on scroll down, always hide on small widths
  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY || window.pageYOffset;
      const isMobile = window.innerWidth < 768;

      // Always hide on mobile and mark dismissed so it doesn't reappear
      if (isMobile) {
        if (showTopBar) setShowTopBar(false);
        topBarDismissed.current = true;
        lastScrollY.current = current;
        return;
      }

      // If already dismissed, don't show again
      if (topBarDismissed.current) {
        lastScrollY.current = current;
        return;
      }

      const delta = current - lastScrollY.current;
      if (Math.abs(delta) < 10) return; // ignore tiny scrolls

      if (current > lastScrollY.current && current > 50) {
        // scrolling down -> hide and mark dismissed
        if (showTopBar) setShowTopBar(false);
        topBarDismissed.current = true;
      }

      lastScrollY.current = current;
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showTopBar]);

  return (
    <>
  {/* Top Contact Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
  className={`bg-gradient-to-r from-rose-900/30 to-purple-900/30 py-1 border-b border-rose-900/20 w-full sticky top-0 z-50 transition-transform duration-300 ease-out ${showTopBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        ref={topBarRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-end text-sm text-rose-200 w-full"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>{t('nav.phone')}</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

  {/* spacer for fixed nav height (updated dynamically) - positioned absolute so it doesn't affect document flow */}
  <div ref={navSpacerRef} aria-hidden="true" className="absolute left-0 right-0 top-0 h-0 pointer-events-none" />

  {/* Main Navigation - Sticky */}
  <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  className="bg-gray-900/95 backdrop-blur-sm shadow-lg sticky z-40 border-b border-rose-900/20 w-full"
  ref={navRef}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center py-4 w-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/home" className="flex items-center">
                <TextEffect
                  className="text-xl md:text-2xl font-bold text-white"
                  preset="fade"
                  per="word"
                >
                 <div className="flex items-center">
                  <span className="mr-1"><img src="/assets/heart.svg" alt="18+" style={{ width: 25, height: 25 }} /></span>
                  Rhein<span className="text-rose-400"> Neckar </span>Massage </div>
                </TextEffect>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:flex space-x-6 lg:space-x-10"
            >
              {[
                { to: '/', label: t('nav.home') },
                { to: '/mieterinnen', label: t('nav.mieterinnen') },
                { to: '/angebot', label: t('nav.angebot') },
                { to: '/gaestebuch', label: t('nav.gaestebuch') },
                { to: '/ambiente', label: t('nav.ambiente') },
                { to: '/kontakt', label: t('nav.kontakt') }
              ].map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={item.to}
                    className={`transition-all duration-300 relative text-sm lg:text-base px-3 py-2 whitespace-nowrap ${
                      isActive(item.to)
                        ? 'text-rose-400'
                        : 'text-gray-300 hover:text-rose-400'
                    }`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                    {isActive(item.to) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-400"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="lg:hidden text-gray-300 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-900/20"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden w-full"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pb-4 w-full"
                >
                  <div className="flex flex-col space-y-2 w-full">
                    {[
                { to: '/', label: t('nav.home') },
                { to: '/mieterinnen', label: t('nav.mieterinnen') },
                { to: '/angebot', label: t('nav.angebot') },
                { to: '/gaestebuch', label: t('nav.gaestebuch') },
                { to: '/ambiente', label: t('nav.ambiente') },
                { to: '/kontakt', label: t('nav.kontakt') }
                    ].map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="w-full"
                      >
                        <Link
                          to={item.to}
                          className="text-gray-300 hover:text-rose-400 transition-colors py-2 block w-full px-4 whitespace-nowrap"
                          onClick={handleNavClick}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
};

export default Header;

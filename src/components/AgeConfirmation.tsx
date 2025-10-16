import React from 'react';

import { motion } from 'motion/react';
import { Floating } from './ui/floating';
import { useTranslation } from '@/hooks/useTranslation';


const AgeConfirmation: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const { t } = useTranslation();
  const handleConfirm = () => {
    onConfirm();
    localStorage.setItem('ageConfirmed', 'true');
  };

    const handleReturn = () => {
      window.location.href = 'https://www.google.com';
    };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/video/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(0,0,0,0.7)',
          padding: '56px 48px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#fff',
          minWidth: '320px',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
        }}
      >
          <div style={{ margin: '0.5rem 0 2.2rem 0', display: 'flex', justifyContent: 'center' }}>
            <Floating intensity="low" duration={3}>
              <img
                src="/assets/18plus.svg"
                alt="18+"
                style={{ width: '200px', height: '200px' }}
              />
            </Floating>
          </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('age.title')}</h1>
        <p style={{ marginBottom: '0.2rem' }}>
          {t('age.description1')}
        </p>
        <p style={{ marginBottom: '2.5rem' }}>
          {t('age.description2')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            style={{
              padding: '10px 30px',
              fontSize: '1.2rem',
              background: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleReturn}
          >
            {t('age.return')}
          </button>
          <button
            style={{
              padding: '10px 30px',
              fontSize: '1.2rem',
              background: '#e11d48',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleConfirm}
          >
            {t('age.confirm')}
          </button>
        </div>
  </motion.div>
    </div>
  );
};

export default AgeConfirmation;

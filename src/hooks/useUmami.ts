import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useUmami = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(location.pathname);
    }
  }, [location]);

  const trackEvent = (event: string, data?: object) => {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(event, data);
    }
  };

  const identify = (id: string, data?: object) => {
    if (window.umami && typeof window.umami.identify === 'function') {
      window.umami.identify(id, data);
    }
  };

  return { trackEvent, identify };
};
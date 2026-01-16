import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll on client side, not during SSR
    if (typeof window === 'undefined') return;
    
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

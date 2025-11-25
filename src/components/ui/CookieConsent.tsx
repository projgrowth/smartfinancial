import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-background/98 backdrop-blur-xl text-foreground border-t border-primary/20 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] z-50 shadow-[0_-4px_20px_hsl(var(--primary)/0.1)] animate-fade-in"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-live="polite"
      style={{
        animation: 'slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      }}
    >
      <div className="container-wide flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <h2 id="cookie-consent-title" className="sr-only">Cookie consent</h2>
          <p id="cookie-consent-description" className="text-sm font-medium">
            We use cookies to improve your experience. By continuing to use our site, you agree to our{' '}
            <Link to="/privacy" className="text-primary underline hover:text-primary/80 font-semibold">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={acceptCookies}
            size="sm"
            variant="default"
            className="shadow-md hover:shadow-lg"
          >
            Accept
          </Button>
          <Button
            onClick={acceptCookies}
            size="sm"
            variant="ghost"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
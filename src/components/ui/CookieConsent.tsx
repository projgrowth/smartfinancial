import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 bg-charcoal text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            We use cookies to improve your experience. By continuing to use our site, you agree to our{' '}
            <a href="/privacy" className="text-blue-200 hover:text-blue-100 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={acceptCookies}
            size="sm"
            className="bg-white text-charcoal hover:bg-gray-100"
          >
            Accept
          </Button>
          <Button
            onClick={acceptCookies}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
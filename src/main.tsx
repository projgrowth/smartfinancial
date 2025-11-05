
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { enforceCanonicalDomain, initUrlMonitoring, monitorClipboardUrls, initSecurityMonitoring } from './utils/urlMonitoring';
import { measureCLS, monitorInteractionShifts } from './utils/performanceMonitoring';

// Initialize URL monitoring to detect iOS redirect issues
enforceCanonicalDomain();
initUrlMonitoring();
initSecurityMonitoring();
monitorClipboardUrls();

// Performance monitoring in development mode
if (import.meta.env.DEV) {
  measureCLS();
  monitorInteractionShifts();
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

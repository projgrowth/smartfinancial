
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { enforceCanonicalDomain, initUrlMonitoring, monitorClipboardUrls, initSecurityMonitoring } from './utils/urlMonitoring';

// Initialize URL monitoring to detect iOS redirect issues
enforceCanonicalDomain();
initUrlMonitoring();
initSecurityMonitoring();
monitorClipboardUrls();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

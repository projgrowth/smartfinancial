
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AccessibilityProvider } from '@/components/ui/AccessibilityProvider';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </HelmetProvider>
  </React.StrictMode>
);

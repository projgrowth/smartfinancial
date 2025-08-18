
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SkipLink from "@/components/SkipLink";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import './index.css';
import CookieConsent from "@/components/ui/CookieConsent";
import Layout from "@/components/Layout";
import HashScroll from "@/components/HashScroll";
import { AppProvider } from "@/context/AppContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { analytics, trackPageView } from "@/utils/analytics";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Education = lazy(() => import("./pages/Education"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

// Handle scroll restoration and analytics
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page view for analytics
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
};


// Create a persistent query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary onError={(error, errorInfo) => analytics.trackError(error, 'app_boundary')}>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SkipLink />
          <BrowserRouter>
            <ScrollToTop />
            <HashScroll />
            <Suspense fallback={<LoadingIndicator />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

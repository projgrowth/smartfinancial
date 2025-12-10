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
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages
const Index = lazy(() => import("./pages/index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const SegmentPage = lazy(() => import("./pages/SegmentPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ResourcesPage = lazy(() => import("./pages/Resources"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 } },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
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
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* Segment Pages */}
                <Route path="/owners" element={<SegmentPage />} />
                <Route path="/executives" element={<SegmentPage />} />
                <Route path="/legacy" element={<SegmentPage />} />
                <Route path="/:segmentSlug" element={<SegmentPage />} />
                {/* Service Pages */}
                <Route path="/services/:serviceSlug" element={<ServicePage />} />
                {/* Resources */}
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:resourceSlug" element={<ResourceDetail />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

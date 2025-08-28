// =============================================================================
// OPTIMIZED INDEX PAGE - Phase 2: Performance Optimization
// Lazy-loaded components for improved performance
// =============================================================================

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import ServiceCards from '../components/ServiceCards';
import Process from '../components/Process';
import { 
  LazyTestimonials, 
  LazyFinancialCalculator,
  LazyEnhancedNewsletter,
  LazyFAQSection,
  LazyCaseStudies,
  LazyTeamDetails
} from '../components/LazyLoad';
import CTA from '../components/CTA';
import { seoContent } from '../data/content';

const OptimizedIndexPage = () => {
  const { title, description, keywords } = seoContent.default;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://smartfinancialplanning.com" />
      </Helmet>

      {/* Above-the-fold content - loads immediately */}
      <Hero />
      <IntroSection />
      <ServiceCards />
      <Process />

      {/* Below-the-fold content - loads lazily */}
      <LazyTestimonials />
      <LazyFinancialCalculator />
      <LazyEnhancedNewsletter />
      <LazyFAQSection />
      <LazyCaseStudies />
      <LazyTeamDetails />
      <CTA />
    </>
  );
};

export default OptimizedIndexPage;
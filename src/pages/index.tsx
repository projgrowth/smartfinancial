import React, { useEffect, Suspense } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import Process from '@/components/Process';
import ServiceCards from '@/components/ServiceCards';
const FinancialCalculator = React.lazy(() => import('@/components/FinancialCalculator'));
const TeamDetails = React.lazy(() => import('@/components/TeamDetails'));
const MeetingScheduler = React.lazy(() => import('@/components/MeetingScheduler'));
const FAQSection = React.lazy(() => import('@/components/FAQSection'));
const Newsletter = React.lazy(() => import('@/components/Newsletter'));
const CTA = React.lazy(() => import('@/components/CTA'));

import { preloadCriticalImages } from '@/utils/imageOptimization';
import { advisors } from '@/data/team';

// Minimal inline fallback
const MinimalFallback = () => (
  <div className="section-md bg-background animate-pulse">
    <div className="container-default h-32" />
  </div>
);

const Index = () => {
  useEffect(() => {
    const criticalImages = [
      '/lovable-uploads/razell-smart-new.jpg',
      '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
      '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
      '/lovable-uploads/joseph-schreiner-new.jpg'
    ];
    preloadCriticalImages(criticalImages);
    
    import('@/components/FinancialCalculator');
    import('@/components/TeamDetails');
    import('@/components/MeetingScheduler');
    import('@/components/FAQSection');
    import('@/components/Newsletter');
    import('@/components/CTA');
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: 'Home', item: origin },
      { "@type": "ListItem", position: 2, name: 'Financial Planning Services', item: `${origin}#services` },
      { "@type": "ListItem", position: 3, name: 'Our Team', item: `${origin}#team` }
    ]
  } as const;
  const teamJsonLd = advisors.map(a => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: a.title,
    image: origin ? `${origin}${a.imageUrl}` : a.imageUrl,
    worksFor: { "@type": "Organization", name: 'Smart Financial Planning', url: origin || undefined },
    url: `${origin}#team`
  }));

  return (
    <>
      <SEO 
        title="Smart Financial Planning — Your wealth. Elevated."
        description="Tailored financial strategies for ambitious professionals. Build, protect, and grow your wealth."
        jsonLd={[breadcrumbJsonLd, ...teamJsonLd]}
      />
      
      <Hero />
      <IntroSection />
      <Process />
      <ServiceCards />
      
      <section id="calculators" className="section-contain" aria-label="Financial calculators">
        <Suspense fallback={<MinimalFallback />}>
          <FinancialCalculator />
        </Suspense>
      </section>
      
      <section id="team" className="section-contain" aria-label="Team members">
        <Suspense fallback={<MinimalFallback />}>
          <TeamDetails />
        </Suspense>
      </section>
      
      <Suspense fallback={<MinimalFallback />}>
        <MeetingScheduler />
      </Suspense>
      
      <section id="faq" className="section-contain" aria-label="Frequently asked questions">
        <Suspense fallback={<MinimalFallback />}>
          <FAQSection />
        </Suspense>
      </section>
      
      <section id="newsletter" aria-label="Newsletter signup">
        <Suspense fallback={<MinimalFallback />}>
          <Newsletter variant="enhanced" />
        </Suspense>
      </section>
      
      <section id="cta" aria-label="Call to action">
        <Suspense fallback={<MinimalFallback />}>
          <CTA />
        </Suspense>
      </section>
    </>
  );
};

export default Index;

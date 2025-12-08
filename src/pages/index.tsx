
import React, { useEffect, useState, Suspense } from 'react';
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

import { Skeleton } from '@/components/ui/skeleton';
import { FinancialTerm } from '@/components/FinancialTermGlossary';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { preloadCriticalImages } from '@/utils/imageOptimization';
import { advisors } from '@/data/team';
import { ServiceCardSkeleton, CaseStudySkeleton, FAQSkeleton, CalculatorSkeleton, SectionSkeleton } from '@/components/ui/skeleton-loaders';

const Index = () => {
  useEffect(() => {
    // Preload critical team images that match current team data
    const criticalImages = [
      '/lovable-uploads/razell-smart-new.jpg',
      '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
      '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
      '/lovable-uploads/joseph-schreiner-new.jpg'
    ];
    preloadCriticalImages(criticalImages);
    
    // Preload lazy components immediately to reduce layout shift
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
      
      <section id="education-resources" className="section-md bg-accent/5 relative" aria-labelledby="educational-resources-heading">
          <div className="container-default">
            <PremiumCard variant="info" size="lg" className="max-w-4xl mx-auto border-border/50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-unified-lg">
                <div className="lg:max-w-[60%] space-component-sm">
                  <h3 id="educational-resources-heading" className="heading-sm text-card-foreground mb-3">
                    Financial Education for Lake Nona & Orlando Professionals
                  </h3>
                  <p className="text-body text-card-foreground/80 mb-4">
                    We believe in empowering our Lake Nona and Orlando clients through education. Understanding concepts like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Tax-Loss Harvesting">tax-loss harvesting</FinancialTerm> can help Central Florida professionals make more informed decisions about their financial future.
                  </p>
                  <Link to="/education">
                    <Button variant="outline" className="group">
                      <span className="mr-2">Visit Our Knowledge Center</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden lg:block lg:max-w-[40%] bg-accent/10 p-4 rounded-lg">
                  <h4 className="heading-xs text-card-foreground mb-2">Featured Financial Concept:</h4>
                  <h5 className="heading-xs text-primary">Orlando Market Insights</h5>
                  <p className="text-body-sm text-card-foreground/70 mt-2">
                    Understanding Central Florida's unique economic landscape, from tourism impacts to tech sector growth in Lake Nona, helps shape better investment strategies for local professionals.
                  </p>
                  <Link to="/education" className="text-primary hover:text-primary/80 text-body-sm font-medium mt-3 inline-block touch-target focus-enhanced">
                    Learn more about local market trends
                  </Link>
                </div>
              </div>
          </PremiumCard>
        </div>
      </section>
      
      <section id="calculators" className="section-contain" aria-label="Financial calculators">
        <Suspense fallback={
        <section className="section-xl bg-background">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
            <div className="grid-two-col gap-unified-lg">
              <CalculatorSkeleton />
              <CalculatorSkeleton />
            </div>
          </div>
        </section>
      }>
        <FinancialCalculator />
        </Suspense>
      </section>
      
      <section id="team" className="section-contain" aria-label="Team members">
        <Suspense fallback={
          <section className="section-md bg-background">
            <div className="container-default">
              <div className="text-center mb-12">
                <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </div>
              <div className="grid-three-col gap-unified-lg">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
              </div>
            </div>
          </section>
        }>
        <TeamDetails />
        </Suspense>
      </section>
      
      <Suspense fallback={<SectionSkeleton height="h-40" />}>
        <MeetingScheduler />
      </Suspense>
      
      <section id="faq" className="section-contain" aria-label="Frequently asked questions">
        <Suspense fallback={
        <section className="section-xl bg-background">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
            <FAQSkeleton />
          </div>
        </section>
      }>
        <FAQSection />
        </Suspense>
      </section>
      
      <section id="newsletter" aria-label="Newsletter signup">
        <Suspense fallback={<SectionSkeleton height="h-32" />}>
        <Newsletter variant="enhanced" />
        </Suspense>
      </section>
      
      <section id="cta" aria-label="Call to action">
        <Suspense fallback={<SectionSkeleton height="h-24" />}>
          <CTA />
        </Suspense>
      </section>
    </>
  );
};

export default Index;

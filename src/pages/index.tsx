
import React, { useEffect, useState, Suspense } from 'react';
import SEO from '@/components/SEO';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
const FinancialCalculator = React.lazy(() => import('../components/FinancialCalculator'));
const TeamDetails = React.lazy(() => import('../components/TeamDetails'));
const MeetingScheduler = React.lazy(() => import('../components/MeetingScheduler'));
const FAQSection = React.lazy(() => import('../components/FAQSection'));
const Newsletter = React.lazy(() => import('../components/Newsletter'));
const CTA = React.lazy(() => import('../components/CTA'));
import PremiumBackground from '../components/PremiumBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { FinancialTerm } from '@/components/FinancialTermGlossary';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSectionTransition from '../components/AnimatedSectionTransition';
import { preloadCriticalImages } from '../utils/imageOptimization';
import StickyCTA from '../components/StickyCTA';
import { advisors } from '@/data/team';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical team images
    const criticalImages = [
      '/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png',
      '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
      '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
      '/lovable-uploads/3dda3ab1-0f6f-4e70-bff1-ce75f2161c6f.png'
    ];
    preloadCriticalImages(criticalImages);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // SEO handled via component below


  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-accent/5 via-background/80 to-accent/10" aria-live="polite" aria-busy="true">
        <div className="container-site space-component-lg">
          <Skeleton className="heading-lg container-narrow mx-auto space-component-sm" />
          <Skeleton className="text-body-lg container-narrow mx-auto space-component-md" />
          <Skeleton className="h-10 w-48 mx-auto space-component-xl" />
          <div className="grid-three-col gap-unified-lg">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full lg:block hidden" />
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen w-full overflow-x-hidden">
      <PremiumBackground />
      <SEO 
        title="Smart Financial Planning — Your wealth. Elevated."
        description="Tailored financial strategies for ambitious professionals. Build, protect, and grow your wealth."
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/` : undefined}
        imageUrl={typeof window !== 'undefined' ? `${window.location.origin}/lovable-uploads/144559fd-7765-4c3f-8256-fbde965750ab.png` : '/lovable-uploads/144559fd-7765-4c3f-8256-fbde965750ab.png'}
        jsonLd={[breadcrumbJsonLd, ...teamJsonLd]}
      />
      
      <main id="main-content" role="main">
        <Hero />
        <IntroSection />
        
        <AnimatedSectionTransition 
          style="wave" 
          colorScheme="white-to-dark" 
          position="bottom" 
          height={60}
          showIcon={true}
          iconType="chevron"
          onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
        />
        
        <Process />
        <ServiceCards />
        
        <section className="section-md bg-accent/5 relative" aria-labelledby="educational-resources-heading">
          <div className="container-site">
            <div className="container-narrow mx-auto bg-card rounded-lg space-component-lg shadow-sm border border-border/50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-site-lg">
                <div className="lg:max-w-[60%] space-component-sm">
                  <h3 id="educational-resources-heading" className="heading-sm text-card-foreground">
                    Financial Education for Lake Nona & Orlando Professionals
                  </h3>
                  <p className="text-body text-card-foreground/80 space-component-xs">
                    We believe in empowering our Lake Nona and Orlando clients through education. Understanding concepts like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Tax-Loss Harvesting">tax-loss harvesting</FinancialTerm> can help Central Florida professionals make more informed decisions about their financial future.
                  </p>
                  <Link to="/education">
                    <Button variant="outline" className="group">
                      <span className="mr-2">Visit Our Knowledge Center</span>
                      <ArrowRight className="icon-sm transition-transform duration-normal group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden lg:block lg:max-w-[40%] bg-accent/10 space-component-md rounded-lg">
                  <h4 className="heading-xs text-card-foreground">Featured Financial Concept:</h4>
                  <h5 className="heading-xs text-primary space-component-xs">Orlando Market Insights</h5>
                  <p className="text-body-sm text-card-foreground/70">
                    Understanding Central Florida's unique economic landscape, from tourism impacts to tech sector growth in Lake Nona, helps shape better investment strategies for local professionals.
                  </p>
                  <Link to="/education" className="text-primary hover:text-primary/80 text-body-sm font-medium inline-block touch-target focus-enhanced space-component-xs">
                    Learn more about local market trends
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-40 w-full" /></div>}>
          <FinancialCalculator />
        </Suspense>
        
        <AnimatedSectionTransition 
          style="chevron" 
          colorScheme="light-to-dark" 
          position="bottom" 
          height={50}
        />
        
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-64 w-full" /></div>}>
          <TeamDetails />
        </Suspense>
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-40 w-full" /></div>}>
          <MeetingScheduler />
        </Suspense>
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-40 w-full" /></div>}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-32 w-full" /></div>}>
          <Newsletter variant="enhanced" />
        </Suspense>
        <Suspense fallback={<div className="container-unified section-md"><Skeleton className="h-24 w-full" /></div>}>
          <CTA />
        </Suspense>
      </main>
      
      
    </div>
  );
};

export default Index;

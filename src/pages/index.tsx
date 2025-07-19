
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
import CaseStudies from '../components/CaseStudies';
import Advisors from '../components/Advisors';
import TeamDetails from '../components/TeamDetails';
import FAQSection from '../components/FAQSection';
import FinancialCalculator from '../components/FinancialCalculator';
import MeetingScheduler from '../components/MeetingScheduler';
import EnhancedNewsletter from '../components/EnhancedNewsletter';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import PremiumBackground from '../components/PremiumBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { FinancialTerm } from '@/components/FinancialTermGlossary';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSectionTransition from '../components/AnimatedSectionTransition';
import { preloadCriticalImages } from '../utils/imageOptimization';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical team images
    const criticalImages = [
      '/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png',
      '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
      '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png'
    ];
    preloadCriticalImages(criticalImages);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Enhanced SEO and performance setup
    document.title = "Financial Planning Lake Nona Orlando | Smart Financial Planning";
    
    // Add structured data for breadcrumbs
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://smartfinancialplanning.com"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Financial Planning Services",
          "item": "https://smartfinancialplanning.com#services"
        },
        {
          "@type": "ListItem",
          "position": 3, 
          "name": "Our Team",
          "item": "https://smartfinancialplanning.com#team"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-sky-50/30 via-white/80 to-blue-50/30" aria-live="polite" aria-busy="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
          <Skeleton className="h-8 md:h-12 w-3/4 max-w-lg mx-auto mb-6 md:mb-8" />
          <Skeleton className="h-4 md:h-6 w-2/3 max-w-md mx-auto mb-8 md:mb-12" />
          <Skeleton className="h-8 md:h-10 w-36 md:w-48 mx-auto mb-12 md:mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Skeleton className="h-48 md:h-64 w-full" />
            <Skeleton className="h-48 md:h-64 w-full" />
            <Skeleton className="h-48 md:h-64 w-full lg:block hidden" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <PremiumBackground />
      <Navbar />
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
        
        <section className="relative py-8 md:py-12 bg-blue-50/30" aria-labelledby="educational-resources-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 md:p-6 lg:p-8 shadow-sm border border-blue-100/50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="lg:max-w-[60%]">
                  <h3 id="educational-resources-heading" className="font-heading text-lg md:text-xl font-medium text-charcoal mb-2 md:mb-3">
                    Financial Education for Lake Nona & Orlando Professionals
                  </h3>
                  <p className="text-charcoal/70 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                    We believe in empowering our Lake Nona and Orlando clients through education. Understanding concepts like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Tax-Loss Harvesting">tax-loss harvesting</FinancialTerm> can help Central Florida professionals make more informed decisions about their financial future.
                  </p>
                  <Link to="/education">
                    <Button variant="outline" className="group border-blue-200 hover:bg-blue-50 hover:text-blue-700 text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                      <span>Visit Our Knowledge Center</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden lg:block lg:max-w-[40%] bg-blue-500/10 p-4 rounded-lg">
                  <h4 className="font-medium text-charcoal text-sm mb-2">Featured Financial Concept:</h4>
                  <h5 className="font-medium text-blue-600">Orlando Market Insights</h5>
                  <p className="text-sm text-charcoal/70 mt-1 leading-relaxed">
                    Understanding Central Florida's unique economic landscape, from tourism impacts to tech sector growth in Lake Nona, helps shape better investment strategies for local professionals.
                  </p>
                  <Link to="/education" className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2 inline-block">
                    Learn more about local market trends
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FinancialCalculator />
        
        <AnimatedSectionTransition 
          style="chevron" 
          colorScheme="light-to-dark" 
          position="bottom" 
          height={50}
        />
        
        <TeamDetails />
        <MeetingScheduler />
        <FAQSection />
        <EnhancedNewsletter />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

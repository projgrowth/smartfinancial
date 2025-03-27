
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
import CaseStudies from '../components/CaseStudies';
import Advisors from '../components/Advisors';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import PremiumBackground from '../components/PremiumBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { FinancialTerm } from '@/components/FinancialTermGlossary';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const loadFonts = () => {
      const spaceGroteskLink = document.createElement('link');
      spaceGroteskLink.rel = 'stylesheet';
      spaceGroteskLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
      spaceGroteskLink.setAttribute('media', 'print');
      spaceGroteskLink.setAttribute('onload', "this.media='all'");
      document.head.appendChild(spaceGroteskLink);

      const interLink = document.createElement('link');
      interLink.rel = 'stylesheet';
      interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      interLink.setAttribute('media', 'print');
      interLink.setAttribute('onload', "this.media='all'");
      document.head.appendChild(interLink);

      return () => {
        document.head.removeChild(spaceGroteskLink);
        document.head.removeChild(interLink);
      };
    };

    return loadFonts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-sky-50/30 via-white/80 to-blue-50/30">
        <div className="container-custom mx-auto py-24">
          <Skeleton className="h-12 w-3/4 max-w-lg mx-auto mb-8" />
          <Skeleton className="h-6 w-2/3 max-w-md mx-auto mb-12" />
          <Skeleton className="h-10 w-48 mx-auto mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <PremiumBackground />
      <Navbar />
      <main id="main-content">
        <Hero />
        <IntroSection />
        <Process />
        <ServiceCards />
        
        {/* Educational Resource Teaser */}
        <section className="relative py-12 bg-blue-50/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 md:p-8 shadow-sm border border-blue-100/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:max-w-[60%]">
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                    Expand Your Financial Knowledge
                  </h3>
                  <p className="text-charcoal/70 mb-4">
                    We believe in empowering our clients through education. Understanding concepts like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Tax-Loss Harvesting">tax-loss harvesting</FinancialTerm> can help you make more informed decisions about your financial future.
                  </p>
                  <Link to="/education">
                    <Button variant="outline" className="group border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      <span>Visit Our Knowledge Center</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block md:max-w-[40%] bg-blue-500/10 p-4 rounded-lg">
                  <h4 className="font-medium text-charcoal text-sm mb-2">Featured Financial Concept:</h4>
                  <h5 className="font-medium text-blue-600">Compound Interest</h5>
                  <p className="text-sm text-charcoal/70 mt-1">
                    Often called the eighth wonder of the world, compound interest allows your money to grow exponentially over time as you earn interest on both your principal and accumulated interest.
                  </p>
                  <Link to="/education" className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2 inline-block">
                    Learn more financial concepts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CaseStudies key="case-studies" />
        <Advisors />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

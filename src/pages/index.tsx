
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
import CaseStudies from '../components/CaseStudies';
import TeamDetails from '../components/TeamDetails';
import FAQSection from '../components/FAQSection';
import FinancialCalculator from '../components/FinancialCalculator';
import MeetingScheduler from '../components/MeetingScheduler';
import EnhancedNewsletter from '../components/EnhancedNewsletter';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import EnhancedCTA from '../components/EnhancedCTA';
import Footer from '../components/Footer';
import PremiumBackground from '../components/PremiumBackground';
import { Skeleton } from '@/components/ui/skeleton';
import { FinancialTerm } from '@/components/FinancialTermGlossary';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSectionTransition from '../components/AnimatedSectionTransition';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false); // Removed artificial loading delay

  useEffect(() => {
    // Set page title for SEO
    document.title = "Financial Planning Lake Nona Orlando | Smart Financial Planning";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-sky-50/30 via-white/80 to-blue-50/30" aria-live="polite" aria-busy="true">
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
        
        <section className="relative py-12 bg-blue-50/30" aria-labelledby="educational-resources-heading">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 md:p-8 shadow-sm border border-blue-100/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:max-w-[60%]">
                  <h3 id="educational-resources-heading" className="font-heading text-xl font-medium text-charcoal mb-3">
                    Financial Education for Lake Nona & Orlando Professionals
                  </h3>
                  <p className="text-charcoal/70 mb-4">
                    We believe in empowering our Lake Nona and Orlando clients through education. Understanding concepts like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Tax-Loss Harvesting">tax-loss harvesting</FinancialTerm> can help Central Florida professionals make more informed decisions about their financial future.
                  </p>
                  <Link to="/education">
                    <Button variant="outline" className="group border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      <span>Visit Our Knowledge Center</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block md:max-w-[40%] bg-blue-500/10 p-4 rounded-lg">
                  <h4 className="font-medium text-charcoal text-sm mb-2">Featured Financial Concept:</h4>
                  <h5 className="font-medium text-blue-600">Orlando Market Insights</h5>
                  <p className="text-sm text-charcoal/70 mt-1">
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
        
        <CaseStudies key="case-studies" />
        
        <AnimatedSectionTransition 
          style="curved" 
          colorScheme="dark-to-light" 
          position="bottom" 
          height={50}
        />
        
        <TeamDetails />
        <MeetingScheduler />
        <EnhancedTestimonials />
        <FAQSection />
        <EnhancedNewsletter />
        <EnhancedCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

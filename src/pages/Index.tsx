
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
import Advisors from '../components/Advisors';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import PremiumBackground from '../components/PremiumBackground';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and stop showing loading state after everything is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Short timeout for better perceived performance

    // Add intersection observer for animation on scroll with better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Add Google Fonts to head - optimized loading
  useEffect(() => {
    // Load fonts with better performance practices
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
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-sky-50/30 via-white/80 to-amber-50/30">
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
      <Hero />
      <IntroSection />
      <Process />
      <ServiceCards />
      <Advisors />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;

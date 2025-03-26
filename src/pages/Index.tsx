
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import Process from '../components/Process';
import ServiceCards from '../components/ServiceCards';
import Advisors from '../components/Advisors';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Add intersection observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
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
    };
  }, []);

  // Add Google Fonts to head
  useEffect(() => {
    const spaceGroteskLink = document.createElement('link');
    spaceGroteskLink.rel = 'stylesheet';
    spaceGroteskLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
    document.head.appendChild(spaceGroteskLink);

    // Inter is already included in index.css, but this ensures it's loaded
    const interLink = document.createElement('link');
    interLink.rel = 'stylesheet';
    interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(interLink);

    return () => {
      document.head.removeChild(spaceGroteskLink);
      document.head.removeChild(interLink);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
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

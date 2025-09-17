import React from 'react';
import SEO from '@/components/SEO';
import NewHero from '@/components/NewHero';
import NewServices from '@/components/NewServices';
import NewProcess from '@/components/NewProcess';
import NewTeam from '@/components/NewTeam';
import NewContact from '@/components/NewContact';

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Smart Financial Planning | Tailored Wealth Strategies for Ambitious Professionals"
        description="Comprehensive financial planning services for ambitious professionals in Central Florida. Wealth management, retirement planning, and risk management strategies."
        canonicalUrl={typeof window !== 'undefined' ? window.location.origin : undefined}
      />

      <main>
        <NewHero />
        
        {/* About Section - Simple intro */}
        <section id="about" className="section-md bg-background">
          <div className="container-unified">
            <div className="text-center space-component-lg max-w-4xl mx-auto">
              <h2 className="heading-lg">More Than Cookie-Cutter Solutions</h2>
              <p className="text-body-xl">
                At Smart Financial Planning, we understand that ambitious professionals need personalized strategies, 
                not generic advice. Our comprehensive approach addresses every aspect of your financial life, 
                from wealth building to risk management and legacy planning.
              </p>
              <p className="text-body-lg">
                Founded in Central Florida, we serve clients who demand excellence and expect results. 
                Our team combines deep expertise with personalized service to help you achieve your most important financial goals.
              </p>
            </div>
          </div>
        </section>

        <NewServices />
        <NewProcess />
        <NewTeam />
        <NewContact />
      </main>
    </div>
  );
};

export default NewIndex;
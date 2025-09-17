import React from 'react';
import SEO from '@/components/SEO';
import NewHero from '@/components/NewHero';
import NewServices from '@/components/NewServices';
import NewProcess from '@/components/NewProcess';
import NewTeam from '@/components/NewTeam';
import NewContact from '@/components/NewContact';
const NewIndex = () => {
  return <div className="min-h-screen bg-background">
      <SEO title="Smart Financial Planning | Tailored Wealth Strategies for Ambitious Professionals" description="Comprehensive financial planning services for ambitious professionals in Central Florida. Wealth management, retirement planning, and risk management strategies." canonicalUrl={typeof window !== 'undefined' ? window.location.origin : undefined} />

      <main>
        <NewHero />
        
        {/* About Section - Simple intro */}
        

        <NewServices />
        <NewProcess />
        <NewTeam />
        <NewContact />
      </main>
    </div>;
};
export default NewIndex;
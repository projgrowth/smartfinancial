import React, { Suspense } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import ServiceCards from '@/components/ServiceCards';

const FinancialCalculator = React.lazy(() => import('@/components/FinancialCalculator'));
const TeamDetails = React.lazy(() => import('@/components/TeamDetails'));
const MeetingScheduler = React.lazy(() => import('@/components/MeetingScheduler'));
const FAQSection = React.lazy(() => import('@/components/FAQSection'));
const CTA = React.lazy(() => import('@/components/CTA'));

import { advisors } from '@/data/team';

const MinimalFallback = () => (
  <div className="section-md bg-background animate-pulse">
    <div className="container-default h-32" />
  </div>
);

const Index = () => {
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

  // FAQPage schema for rich search results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services do you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive financial planning, investment management, retirement planning, tax optimization strategies, estate planning, and risk management solutions tailored specifically for high-achieving professionals and business owners."
        }
      },
      {
        "@type": "Question",
        name: "How do you charge for your services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use a transparent fee structure based on the complexity of your financial situation and the services required. We offer both fee-only planning and asset-based management fees."
        }
      },
      {
        "@type": "Question",
        name: "What is your investment philosophy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our investment approach focuses on evidence-based strategies aligned with your specific goals and risk tolerance. We emphasize diversification, cost efficiency, tax optimization, and disciplined rebalancing."
        }
      },
      {
        "@type": "Question",
        name: "Do I need a minimum investment to work with you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We typically work with clients who have investable assets of $500,000 or more, or high-income professionals on track to reach that threshold within 2-3 years."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Smart Financial Planning — Your wealth. Elevated."
        description="Tailored financial strategies for ambitious professionals. Build, protect, and grow your wealth."
        jsonLd={[breadcrumbJsonLd, faqJsonLd, ...teamJsonLd]}
      />
      
      <Hero />
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
      
      <section id="cta" aria-label="Call to action">
        <Suspense fallback={<MinimalFallback />}>
          <CTA />
        </Suspense>
      </section>
    </>
  );
};

export default Index;
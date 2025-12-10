/**
 * Segment Page Component
 * Template for HNW client segment landing pages
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { segments } from '@/content/segments';
import { services } from '@/content/services';
import { siteSettings } from '@/config/siteSettings';

const SegmentPage: React.FC = () => {
  const { segmentSlug } = useParams<{ segmentSlug: string }>();
  const location = window.location.pathname;
  
  // Get segment from URL - handle both /owners and /:segmentSlug patterns
  const slug = segmentSlug || location.replace('/', '');
  const segment = segments.find(s => s.slug === slug);

  if (!segment) {
    return <Navigate to="/404" replace />;
  }

  const relevantServices = services.filter(s => 
    segment.relevantServices.includes(s.id)
  );

  const scrollToSchedule = () => {
    document.getElementById('segment-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title={`${segment.title} — ${siteSettings.firmName}`}
        description={segment.description}
      />

      {/* Hero Section */}
      <section className="section-xl section-bg-subtle pt-32">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center space-component-md">
            <ScrollReveal distance="8px">
              <span className="text-xs font-medium uppercase tracking-wider text-accent mb-4 block">
                {segment.title}
              </span>
              <h1 className="heading-display-md mb-6">{segment.headline}</h1>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-muted-foreground mb-8">
                {segment.subheadline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} distance="4px">
              <Button
                variant="shimmer"
                size="lg"
                onClick={scrollToSchedule}
                className="group"
              >
                <span className="flex items-center gap-2">
                  {segment.ctaText}
                  <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
                </span>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-lg bg-background">
        <div className="container-default">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-12">Challenges You Face</h2>
          </ScrollReveal>

          <div className="grid-two-col gap-unified-md">
            {segment.painPoints.map((pain, index) => (
              <ScrollReveal key={pain.title} delay={index * 100} distance="6px">
                <div className="bg-card border border-border/40 rounded-lg p-6">
                  <h3 className="heading-sm mb-2 text-accent">{pain.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{pain.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-lg section-bg-subtle">
        <div className="container-default">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-12">What You'll Achieve</h2>
          </ScrollReveal>

          <div className="grid-two-col gap-unified-md max-w-4xl mx-auto">
            {segment.outcomes.map((outcome, index) => (
              <ScrollReveal key={outcome.title} delay={index * 100} distance="6px">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-1">{outcome.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{outcome.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Services */}
      <section className="section-lg bg-background">
        <div className="container-default">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-4">How We Help</h2>
            <p className="text-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Our services tailored to address your specific needs.
            </p>
          </ScrollReveal>

          <div className="grid-two-col gap-unified-md">
            {relevantServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100} distance="6px">
                <div className="bg-card border border-border/40 rounded-lg p-6 hover:shadow-lg transition-shadow duration-150">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="heading-sm mb-2">{service.title}</h3>
                  <p className="text-body-sm text-muted-foreground mb-4">{service.description}</p>
                  <a 
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section-lg section-bg-subtle">
        <div className="container-narrow">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-12">Real Results</h2>
          </ScrollReveal>

          <ScrollReveal delay={100} distance="6px">
            <CaseStudyCard 
              caseStudy={segment.caseStudy}
              ctaText={segment.ctaText}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="segment-cta" className="section-bg-premium-dark section-lg">
        <div className="container-default">
          <div className="glass-effect-dark rounded-2xl section-md shadow-lg max-w-4xl mx-auto text-center space-component-md">
            <ScrollReveal distance="8px">
              <h2 className="heading-lg text-white mb-4">
                Ready to Elevate Your Wealth Strategy?
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-2">
                We work with clients who have {siteSettings.qualification.minimumAssetsText} or are {siteSettings.qualification.alternateQualification}.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} distance="4px">
              <Button
                variant="secondary"
                size="lg"
                className="group"
                onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  {segment.ctaText}
                  <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
                </span>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default SegmentPage;

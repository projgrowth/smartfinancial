/**
 * Service Detail Page
 * Individual service pages with outcomes and CTAs
 */

import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { services } from '@/content/services';
import { siteSettings } from '@/config/siteSettings';

const ServicePage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = services.find(s => s.slug === serviceSlug);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO 
        title={`${service.title} — ${siteSettings.firmName}`}
        description={service.description}
      />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background">
        <div className="container-default">
          <Link 
            to="/#services" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-lg section-bg-subtle">
        <div className="container-default">
          <div className="max-w-3xl">
            <ScrollReveal distance="8px">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h1 className="heading-display-sm mb-6">{service.title}</h1>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-muted-foreground mb-8">
                {service.longDescription}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} distance="4px">
              <Button
                variant="shimmer"
                size="lg"
                onClick={() => document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                <span className="flex items-center gap-2">
                  {siteSettings.cta.primary}
                  <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
                </span>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-lg bg-background">
        <div className="container-default">
          <div className="grid-two-col gap-unified-lg items-start">
            <div>
              <ScrollReveal distance="8px">
                <h2 className="heading-lg mb-6">What's Included</h2>
              </ScrollReveal>

              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <ScrollReveal key={index} delay={index * 100} distance="6px">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <p className="text-body text-foreground">{feature.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div>
              <ScrollReveal distance="8px">
                <h2 className="heading-lg mb-6">Expected Outcomes</h2>
              </ScrollReveal>

              <div className="space-y-4">
                {service.outcomes.map((outcome, index) => (
                  <ScrollReveal key={index} delay={index * 100} distance="6px">
                    <div className="bg-card border border-border/40 rounded-lg p-4">
                      <p className="text-body text-foreground">{outcome}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="section-lg section-bg-subtle">
        <div className="container-narrow text-center">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg mb-8">Ideal For</h2>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4">
            {service.idealFor.map((client, index) => (
              <ScrollReveal key={index} delay={index * 100} distance="6px">
                <span className="inline-block bg-card border border-border/40 rounded-full px-5 py-2 text-body-sm">
                  {client}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="service-cta" className="section-bg-premium-dark section-lg">
        <div className="container-default">
          <div className="glass-effect-dark rounded-2xl section-md shadow-lg max-w-4xl mx-auto text-center space-component-md">
            <ScrollReveal distance="8px">
              <h2 className="heading-lg text-white mb-4">
                Ready to Get Started?
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-2">
                Schedule a strategy session to discuss how {service.title.toLowerCase()} can help you achieve your goals.
              </p>
              <p className="text-body-sm text-white/60 mb-8">
                We work with clients who have {siteSettings.qualification.minimumAssetsText} or are {siteSettings.qualification.alternateQualification}.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} distance="4px">
              <Button
                variant="secondary"
                size="lg"
                className="group"
                onClick={() => window.location.href = '/#schedule'}
              >
                <span className="flex items-center gap-2">
                  {siteSettings.cta.primary}
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

export default ServicePage;

/**
 * Resources Page
 * Thought leadership and lead magnets
 */

import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';
import LeadMagnet from '@/components/LeadMagnet';
import { resources, leadMagnets } from '@/content/resources';
import { siteSettings } from '@/config/siteSettings';

const ResourcesPage: React.FC = () => {
  return (
    <>
      <SEO 
        title={`Resources — ${siteSettings.firmName}`}
        description="Expert insights on wealth management, tax strategy, and financial planning for high-net-worth individuals and business owners."
      />

      {/* Hero Section */}
      <section className="section-xl section-bg-subtle pt-32">
        <div className="container-default">
          <div className="max-w-3xl mx-auto text-center space-component-md">
            <ScrollReveal distance="8px">
              <h1 className="heading-display-md mb-6">Insights & Resources</h1>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-muted-foreground">
                Expert perspectives on the financial challenges facing business owners, executives, and affluent families.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lead Magnets */}
      <section className="section-lg bg-background">
        <div className="container-default">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-4">Free Guides</h2>
            <p className="text-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Actionable resources to help you navigate complex financial decisions.
            </p>
          </ScrollReveal>

          <div className="grid-three-col gap-unified-md">
            {leadMagnets.map((magnet, index) => (
              <ScrollReveal key={magnet.id} delay={index * 100} distance="6px">
                <LeadMagnet
                  title={magnet.title}
                  description={magnet.description}
                  fileName={magnet.fileName}
                  variant="card"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-lg section-bg-subtle">
        <div className="container-default">
          <ScrollReveal distance="8px">
            <h2 className="heading-lg text-center mb-4">Latest Articles</h2>
            <p className="text-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Insights and strategies from our team of advisors.
            </p>
          </ScrollReveal>

          <div className="grid-two-col gap-unified-lg">
            {resources.map((resource, index) => (
              <ScrollReveal key={resource.id} delay={index * 100} distance="6px">
                <article className="bg-card border border-border/40 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-150">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.readTime}
                      </span>
                      <span className="uppercase tracking-wider font-medium text-accent">
                        {resource.category}
                      </span>
                    </div>

                    <h3 className="heading-sm mb-2">
                      <Link 
                        to={`/resources/${resource.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {resource.title}
                      </Link>
                    </h3>
                    
                    <p className="text-body-sm text-muted-foreground mb-4">
                      {resource.excerpt}
                    </p>

                    <Link 
                      to={`/resources/${resource.slug}`}
                      className="text-sm font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-bg-premium-dark section-lg">
        <div className="container-default">
          <div className="glass-effect-dark rounded-2xl section-md shadow-lg max-w-4xl mx-auto text-center space-component-md">
            <ScrollReveal distance="8px">
              <h2 className="heading-lg text-white mb-4">
                Have Questions?
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
                Schedule a conversation with our team to discuss your specific situation.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} distance="4px">
              <Link to="/#schedule">
                <button className="mt-6 bg-white text-charcoal px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2 group">
                  {siteSettings.cta.primary}
                  <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
                </button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;

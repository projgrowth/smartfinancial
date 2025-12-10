/**
 * Resource Detail Page
 * Individual article/guide pages
 */

import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';
import LeadMagnet from '@/components/LeadMagnet';
import { resources, leadMagnets } from '@/content/resources';
import { siteSettings } from '@/config/siteSettings';

const ResourceDetail: React.FC = () => {
  const { resourceSlug } = useParams<{ resourceSlug: string }>();
  const resource = resources.find(r => r.slug === resourceSlug);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  // Find a relevant lead magnet
  const relevantMagnet = leadMagnets.find(m => 
    m.targetSegments.some(s => resource.targetSegments.includes(s))
  );

  return (
    <>
      <SEO 
        title={`${resource.title} — ${siteSettings.firmName}`}
        description={resource.description}
      />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background">
        <div className="container-default">
          <Link 
            to="/resources" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="section-lg bg-background">
        <div className="container-narrow">
          <header className="mb-12">
            <ScrollReveal distance="8px">
              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {resource.readTime}
                </span>
              </div>

              <h1 className="heading-display-sm mb-6">{resource.title}</h1>
              <p className="text-body-lg text-muted-foreground">
                {resource.description}
              </p>
            </ScrollReveal>
          </header>

          {/* Article Content */}
          <ScrollReveal delay={100} distance="6px">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: resource.content.replace(/\n/g, '<br>').replace(/##\s(.+)/g, '<h2 class="heading-md mt-8 mb-4">$1</h2>').replace(/###\s(.+)/g, '<h3 class="heading-sm mt-6 mb-3">$1</h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }}
            />
          </ScrollReveal>

          {/* Lead Magnet CTA */}
          {relevantMagnet && (
            <div className="mt-12 pt-12 border-t border-border">
              <ScrollReveal distance="8px">
                <h3 className="heading-sm mb-6 text-center">Continue Learning</h3>
                <LeadMagnet
                  title={relevantMagnet.title}
                  description={relevantMagnet.description}
                  fileName={relevantMagnet.fileName}
                  variant="card"
                />
              </ScrollReveal>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ResourceDetail;

/**
 * Testimonials Component
 * Displays anonymized client testimonials with HNW positioning
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '@/content/testimonials';
import ScrollReveal from './ScrollReveal';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => (
  <ScrollReveal delay={index * 100} distance="8px">
    <div className="bg-card border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-150 h-full flex flex-col">
      <Quote className="w-8 h-8 text-accent/40 mb-4 flex-shrink-0" aria-hidden="true" />
      <blockquote className="flex-1">
        <p className="text-body text-foreground italic mb-4">
          "{testimonial.quote}"
        </p>
      </blockquote>
      <footer className="mt-auto pt-4 border-t border-border/30">
        <cite className="not-italic">
          <span className="block text-sm font-medium text-foreground">
            {testimonial.attribution}
          </span>
          {testimonial.context && (
            <span className="block text-xs text-muted-foreground mt-1">
              {testimonial.context}
            </span>
          )}
        </cite>
      </footer>
    </div>
  </ScrollReveal>
);

interface TestimonialsProps {
  filter?: string[];
  limit?: number;
  showHeading?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  filter, 
  limit = 3,
  showHeading = true 
}) => {
  const filteredTestimonials = filter 
    ? testimonials.filter(t => filter.includes(t.context || ''))
    : testimonials;
  
  const displayedTestimonials = filteredTestimonials.slice(0, limit);

  return (
    <section 
      className="section-lg section-bg-subtle"
      role="region"
      aria-labelledby={showHeading ? "testimonials-heading" : undefined}
    >
      <div className="container-default">
        {showHeading && (
          <div className="text-center mb-12">
            <ScrollReveal distance="8px">
              <h2 id="testimonials-heading" className="heading-lg mb-4">
                What Our Clients Say
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100} distance="6px">
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Hear from business owners, executives, and families who've partnered with us to elevate their wealth.
              </p>
            </ScrollReveal>
          </div>
        )}

        <div className="grid-three-col gap-unified-md">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

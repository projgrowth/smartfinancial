import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import BullIntegration from './BullIntegration';

interface TestimonialData {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  metrics?: {
    portfolioGrowth?: string;
    timeframe?: string;
    savings?: string;
  };
  imageUrl?: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Tech Innovations Corp",
    location: "Lake Nona, FL",
    content: "Working with Smart Financial Planning transformed our approach to wealth building. Their Lake Nona team understands the unique financial needs of tech professionals. We've seen incredible growth in our portfolio while feeling completely confident in our retirement strategy.",
    rating: 5,
    metrics: {
      portfolioGrowth: "32%",
      timeframe: "18 months",
      savings: "$85,000"
    }
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Medical Director",
    company: "Orlando Health Network",
    location: "Orlando, FL",
    content: "As a busy physician, I needed financial planning that worked around my schedule. The team's expertise in physician-specific financial strategies, from student loan optimization to practice planning, has been invaluable. Their Orlando office makes meeting convenient.",
    rating: 5,
    metrics: {
      portfolioGrowth: "28%",
      timeframe: "2 years",
      savings: "$150,000"
    }
  },
  {
    id: 3,
    name: "Jennifer & David Thompson",
    title: "Marketing Executive & Engineer",
    company: "Various",
    location: "Winter Park, FL",
    content: "Smart Financial Planning helped us navigate a complex financial situation involving stock options, real estate investments, and college planning for our twins. Their comprehensive approach and local expertise made all the difference in reaching our goals ahead of schedule.",
    rating: 5,
    metrics: {
      portfolioGrowth: "41%",
      timeframe: "3 years",
      savings: "$220,000"
    }
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-amber-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ))}
  </div>
);

const EnhancedTestimonials = () => {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <BullIntegration 
        variant="watermark" 
        size="md" 
        className="opacity-[0.05] right-8 bottom-8"
      />
      
      <div className="container-custom mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-charcoal mb-4">
              What Our Lake Nona & Orlando Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real clients who trusted us with their financial future
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  
                  <div className="relative mb-4 flex-grow">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                    <p className="text-muted-foreground leading-relaxed italic pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {testimonial.metrics && (
                    <div className="bg-primary/5 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-primary mb-2">Results Achieved:</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">{testimonial.metrics.portfolioGrowth}</div>
                          <div className="text-xs text-muted-foreground">Growth</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-primary">{testimonial.metrics.timeframe}</div>
                          <div className="text-xs text-muted-foreground">Period</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-primary">{testimonial.metrics.savings}</div>
                          <div className="text-xs text-muted-foreground">Tax Savings</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-12">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border">
              <h3 className="text-xl font-heading font-medium text-card-foreground mb-2">
                Join Our Success Stories
              </h3>
              <p className="text-muted-foreground mb-4">
                Ready to see similar results? Schedule your complimentary consultation today.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>$50M+ Assets Managed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>150+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>10+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
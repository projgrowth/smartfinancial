
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { RevealOnScroll, AnimatedGradientText, Floating } from './ui/enhanced-animations';
import { sections } from '../data/content';

const CTA = () => {
  const { title, subtitle, description, cta } = sections.cta;
  
  return (
    <section id="contact" className="section-lg text-primary-foreground relative overflow-hidden gradient-primary backdrop-blur-sm">
      {/* Enhanced animated background elements */}
      <Floating intensity="subtle">
        <div className="absolute left-0 top-0 w-[40%] h-[80%] gradient-overlay-light blur-3xl rounded-full transform -translate-x-1/4"></div>
      </Floating>
      <Floating intensity="medium">
        <div className="absolute right-0 bottom-0 w-[40%] h-[80%] gradient-overlay-dark blur-3xl rounded-full transform translate-x-1/4"></div>
      </Floating>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container-site relative z-10">
        <div className='content-section'>
          <div className="container-narrow mx-auto text-center backdrop-blur-sm content-block rounded-2xl border border-primary-foreground/10 shadow-design-lg bg-primary-foreground/5">
            <AnimatedGradientText variant="shimmer" className="block heading-lg content-group text-primary-foreground">
              {title}
            </AnimatedGradientText>
            <p className="text-body-lg text-primary-foreground/80 content-block container-narrow mx-auto">
              {description}
            </p>
            <Button 
              variant="premium" 
              size="lg"
              asChild
              className="group relative overflow-hidden bg-background text-foreground hover:bg-background/95 shadow-design-md hover:shadow-design-lg transition-all duration-300"
            >
              <a href={cta?.href}>
                <span className="relative z-10 flex items-center">
                  {cta?.text}
                  <ArrowRight className="icon-md group-hover:translate-x-1 transition-transform duration-normal" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

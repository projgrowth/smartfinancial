
import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="section relative overflow-hidden bg-gradient-to-br from-primary/95 to-primary/90 backdrop-blur-sm">
      {/* Enhanced modern glass morphic decoration with subtle animation */}
      <div className="absolute left-0 top-0 w-[40%] h-[80%] bg-gradient-to-br from-accent/15 to-accent/10 blur-3xl rounded-full transform -translate-x-1/4 animate-float"></div>
      <div className="absolute right-0 bottom-0 w-[40%] h-[80%] bg-gradient-to-tl from-accent/15 to-accent/10 blur-3xl rounded-full transform translate-x-1/4 animate-float"></div>
      
      {/* Added subtle dot pattern for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-[0.05]"></div>
      
      <div className="container-unified relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center glass-effect-strong py-12 px-6 sm:px-10 rounded-2xl">
            <h2 className="heading-lg mb-6 text-primary-foreground">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="text-body-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="btn-premium group relative overflow-hidden"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center">
                Schedule Your Strategy Session
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;


import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="section text-white relative overflow-hidden bg-gradient-to-br from-charcoal/95 to-charcoal/90 backdrop-blur-sm">
      {/* Enhanced modern glass morphic decoration with subtle animation */}
      <div className="absolute left-0 top-0 w-[40%] h-[80%] bg-gradient-to-br from-blue-400/15 to-blue-500/10 blur-3xl rounded-full transform -translate-x-1/4 animate-float"></div>
      <div className="absolute right-0 bottom-0 w-[40%] h-[80%] bg-gradient-to-tl from-blue-400/15 to-blue-300/10 blur-3xl rounded-full transform translate-x-1/4 animate-float"></div>
      
      {/* Added subtle dot pattern for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-[0.05]"></div>
      
      <div className="container-unified relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm py-12 px-6 sm:px-10 rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <h2 className="heading-lg mb-6 text-white">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="paragraph text-white/70 mb-10 max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <Button 
              variant="cta"
              size="lg"
              asChild
              className="group"
            >
              <a href="#schedule">
                <span className="relative z-10 flex items-center">
                  Schedule Your Strategy Session
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]"></div>
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;

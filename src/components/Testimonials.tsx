import React, { useState, useEffect } from 'react';
import { RevealOnScroll, AnimatedGradientText } from './ui/enhanced-animations';
import { EnhancedCard, EnhancedCardContent } from './ui/enhanced-card';
import GradientAccent from './GradientAccent';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/content';
interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  isActive: boolean;
}
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  position,
  isActive
}) => {
  return (
    <EnhancedCard 
      variant="premium" 
      tiltEffect={false}
      hoverGlow={true}
      className={`transition-all duration-500 transform ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <EnhancedCardContent className="p-8">
        <div className="mb-6 text-primary/80">
          <Quote size={32} />
        </div>
        <p className="text-muted-foreground space-component-md text-body-lg leading-relaxed">{quote}</p>
        <div>
          <AnimatedGradientText variant="shimmer" className="font-semibold text-foreground">
            {author}
          </AnimatedGradientText>
          <p className="text-body-sm text-muted-foreground/80 space-component-xs">{position}</p>
        </div>
      </EnhancedCardContent>
    </EnhancedCard>
  );
};
const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    setIsPaused(true);
  };

  useEffect(() => {
    const pauseTimeout = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--testimonial-pause-duration')) || 10000;
    const slideInterval = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--testimonial-slide-interval')) || 6000;
    
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), pauseTimeout);
      return () => clearTimeout(timeout);
    }
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
      }
    }, slideInterval);
    
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  return (
    <section id="testimonials" className="section-lg gradient-accent-medium relative overflow-hidden">
      <GradientAccent variant="blue" position="top-left" size="md" intensity="ultra-low" />
      
      <div className="container-site mx-auto relative z-10">
        <RevealOnScroll direction="fade" duration={800}>
          <div className="text-center mb-16">
            <AnimatedGradientText variant="shimmer" className="heading-lg mb-4 block">
              What Our Clients Say
            </AnimatedGradientText>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who've transformed their financial future with our strategic guidance.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative max-w-4xl mx-auto">
          {/* Enhanced Navigation buttons */}
          <RevealOnScroll 
            direction="up" 
            delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200}
          >
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={prevSlide}
                className="btn-outline hover-glow spring-bounce touch-target-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="btn-outline hover-glow spring-bounce touch-target-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </RevealOnScroll>

          {/* Testimonials with enhanced transitions */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <Testimonial
                  quote={testimonial.content}
                  author={testimonial.name}
                  position={`${testimonial.role}${testimonial.company ? `, ${testimonial.company}` : ''}`}
                  isActive={index === currentSlide}
                />
              </div>
            ))}
          </div>

          {/* Enhanced dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 touch-target spring-bounce ${
                  index === currentSlide 
                    ? 'bg-primary scale-125 shadow-lg shadow-primary/30' 
                    : 'bg-primary/30 hover:bg-primary/60 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
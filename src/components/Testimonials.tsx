import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
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
  return <div className={`testimonial p-8 rounded-lg border border-blue-100 bg-white shadow-sm transition-all duration-500 transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="mb-6 text-blue-500 opacity-80">
        <Quote size={32} />
      </div>
      <p className="text-charcoal/80 mb-6 text-lg leading-relaxed">{quote}</p>
      <div>
        <p className="font-semibold text-charcoal">{author}</p>
        <p className="text-sm text-charcoal/60">{position}</p>
      </div>
    </div>;
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
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), 10000);
      return () => clearTimeout(timeout);
    }
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  return (
    <section id="testimonials" className="section-lg bg-gradient-to-br from-blue-50/50 to-white">
      <div className="container-site mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who've transformed their financial future with our strategic guidance.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          <GradientAccent variant="blue" position="top-left" size="md" intensity="ultra-low" />
          
          {/* Navigation buttons */}
          <div className="flex justify-center gap-site-md mb-8">
            <button
              onClick={prevSlide}
              className="btn-outline min-h-[48px] min-w-[48px] !px-3 !py-3"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="btn-outline min-h-[48px] min-w-[48px] !px-3 !py-3"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Testimonials */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ${
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

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] ${
                  index === currentSlide 
                    ? 'bg-accent scale-110' 
                    : 'bg-accent/30 hover:bg-accent/50'
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

import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  isActive: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position, isActive }) => {
  return (
    <div className={`testimonial p-8 rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-500 transform ${
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`}>
      <div className="mb-6 text-blue-500 opacity-80">
        <Quote size={32} />
      </div>
      <p className="text-charcoal/80 mb-6 text-lg leading-relaxed">{quote}</p>
      <div>
        <p className="font-semibold text-charcoal">{author}</p>
        <p className="text-sm text-charcoal/60">{position}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials = [
    {
      quote: "Working with this team feels like having a personal CFO—strategic, responsive, and genuinely tailored to my needs.",
      author: "Dr. Alex Rivera",
      position: "Orthopedic Surgeon"
    },
    {
      quote: "They've elevated the way I view wealth creation and protection. This isn't just planning—it's financial innovation.",
      author: "Claire H.",
      position: "Tech Executive"
    },
    {
      quote: "My financial future has never been clearer. Their strategic approach has transformed how I think about my long-term wealth.",
      author: "Michael T.",
      position: "Business Owner"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), 10000);
      return () => clearTimeout(timeout);
    }
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, testimonials.length]);

  return (
    <section id="testimonials" className="section bg-slate-lightest/30 relative overflow-hidden py-24">
      <GradientAccent variant="blue" position="bottom-right" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            What Our Clients Say
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-16">
            Hear from professionals who've experienced the difference strategic wealth management makes.
          </p>
        </ScrollReveal>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="relative overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`transition-all duration-500 absolute inset-0 ${
                  currentSlide === index ? 'translate-x-0 opacity-100 z-10' : 'translate-x-full opacity-0 -z-10'
                }`}
              >
                <Testimonial
                  quote={testimonial.quote}
                  author={testimonial.author}
                  position={testimonial.position}
                  isActive={currentSlide === index}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-blue-50 text-charcoal transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsPaused(true);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    currentSlide === index 
                      ? 'bg-blue-500 scale-110 shadow-sm' 
                      : 'bg-slate-300 scale-100 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-blue-50 text-charcoal transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

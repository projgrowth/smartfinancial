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
  const testimonials = [{
    quote: "Working with this team feels like having a personal CFO—strategic, responsive, and genuinely tailored to my needs.",
    author: "Dr. Alex Rivera",
    position: "Orthopedic Surgeon"
  }, {
    quote: "They've elevated the way I view wealth creation and protection. This isn't just planning—it's financial innovation.",
    author: "Claire H.",
    position: "Tech Executive"
  }, {
    quote: "My financial future has never been clearer. Their strategic approach has transformed how I think about my long-term wealth.",
    author: "Michael T.",
    position: "Business Owner"
  }];
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
  }, [currentSlide, isPaused, testimonials.length]);
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50/50 to-white">
      <div className="container-custom mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-charcoal mb-4">
              What Our Clients Say
            </h2>
            <p className="paragraph text-charcoal/70 max-w-2xl mx-auto">
              Hear from professionals who've transformed their financial future with our strategic guidance.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          <GradientAccent variant="blue" position="top-left" size="md" intensity="ultra-low" />
          
          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 text-charcoal hover:text-blue-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 text-charcoal hover:text-blue-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Testimonials */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <Testimonial
                  {...testimonial}
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-500 scale-110' 
                    : 'bg-blue-200 hover:bg-blue-300'
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
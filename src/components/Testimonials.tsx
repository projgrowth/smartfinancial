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
  return;
};
export default Testimonials;

import React, { useState, useRef, useEffect } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position }) => {
  return (
    <div className="testimonial glass-card bg-navy-dark/10 backdrop-blur-sm p-8 rounded-lg">
      <div className="mb-6">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20L4 32V20H10ZM22 20L16 32V20H22Z" fill="#E6C683" fillOpacity="0.5"/>
        </svg>
      </div>
      <p className="text-slate mb-6">{quote}</p>
      <div>
        <p className="font-semibold text-navy-dark">{author}</p>
        <p className="text-sm text-slate">{position}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      quote: "Working with Smart Financial Planning feels like having a personal CFO—strategic, responsive, and genuinely tailored to my needs.",
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
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section id="testimonials" className="section bg-slate-lightest/30">
      <div 
        ref={sectionRef}
        className="container-custom animate-on-scroll"
      >
        <h2 className="heading-lg text-navy-dark text-center mb-16">
          What Our Clients Say
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Testimonial
                    quote={testimonial.quote}
                    author={testimonial.author}
                    position={testimonial.position}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-navy-light hover:text-white transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-gold scale-110' : 'bg-slate-light scale-100'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-navy-light hover:text-white transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

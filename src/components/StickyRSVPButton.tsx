import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { Calendar } from 'lucide-react';

export function StickyRSVPButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      const heroHeight = 400;
      const formSection = document.getElementById('rsvp-form');
      
      if (!formSection) {
        setIsVisible(window.scrollY > heroHeight);
        return;
      }

      const formTop = formSection.getBoundingClientRect().top;
      const scrolled = window.scrollY > heroHeight;
      const beforeForm = formTop > 100; // Hide when close to form
      
      setIsVisible(scrolled && beforeForm);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom duration-300">
      <Button
        variant="hero"
        size="lg"
        onClick={() => smoothScrollTo('rsvp-form')}
        className="shadow-2xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-300"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Reserve Your Seat
      </Button>
    </div>
  );
}

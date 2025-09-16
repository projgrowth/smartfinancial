
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from 'lucide-react';
import MicroAnimations from '../ui/micro-animations';

interface SimpleNewsletterFormProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  compact?: boolean;
}

const SimpleNewsletterForm: React.FC<SimpleNewsletterFormProps> = ({
  email,
  setEmail,
  isSubmitting,
  handleSubmit,
  compact = false
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-component-xs">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full px-4 py-2.5 pr-12 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-card/80 placeholder:text-muted-foreground"
        />
        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent pointer-events-none" />
      </div>
      
      <MicroAnimations.ShimmerButton
        className="w-full flex items-center justify-center gap-1.5"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Subscribing..." : "Subscribe Now"} 
        <ArrowRight className="h-4 w-4" />
      </MicroAnimations.ShimmerButton>
      
      <p className={`${compact ? 'text-[10px]' : 'text-body-sm'} text-center text-muted-foreground`}>
        We respect your privacy. Unsubscribe anytime.
      </p>
    </form>
  );
};

export default SimpleNewsletterForm;

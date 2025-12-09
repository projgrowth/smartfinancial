
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from 'lucide-react';
import { sanitizeInput } from '@/utils/security';

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(sanitizeInput(e.target.value))}
          placeholder="Your email address"
          required
          className="form-input pr-12 bg-background/80 placeholder:text-muted-foreground/60"
        />
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent/60 pointer-events-none" />
      </div>
      
      <Button
        type="submit"
        variant="shimmer"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe Now"} 
        <ArrowRight className="h-4 w-4" />
      </Button>
      
      <p className={`${compact ? 'text-xs' : 'text-xs'} text-center text-muted-foreground/80`}>
        We respect your privacy. Unsubscribe anytime.
      </p>
    </form>
  );
};

export default SimpleNewsletterForm;

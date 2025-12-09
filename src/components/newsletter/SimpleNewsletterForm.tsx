
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
  onDark?: boolean;
}

const SimpleNewsletterForm: React.FC<SimpleNewsletterFormProps> = ({
  email,
  setEmail,
  isSubmitting,
  handleSubmit,
  compact = false,
  onDark = false
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(sanitizeInput(e.target.value))}
          placeholder="Your email address"
          required
          className={`w-full px-3 py-2 rounded-md border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent/30 pr-10 ${
            onDark 
              ? 'bg-white/15 border-white/30 text-white placeholder:text-white/50' 
              : 'bg-card border-border placeholder:text-muted-foreground/60'
          }`}
        />
        <Mail className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${onDark ? 'text-white/50' : 'text-accent/60'}`} />
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
    </form>
  );
};

export default SimpleNewsletterForm;

/**
 * Lead Magnet Component
 * Email capture for downloadable resources
 */

import React, { useState } from 'react';
import { Download, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/utils/security';
import { supabase } from '@/integrations/supabase/client';
import { siteSettings } from '@/config/siteSettings';

interface LeadMagnetProps {
  title: string;
  description: string;
  fileName: string;
  variant?: 'inline' | 'card';
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ 
  title, 
  description, 
  fileName,
  variant = 'card' 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store lead in database
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: sanitizeInput(email),
          name: sanitizeInput(name),
          interests: [fileName],
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Check your email for the download link.",
      });

      // Reset form
      setEmail('');
      setName('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`${variant === 'card' ? 'bg-card border border-border/40 rounded-lg p-6' : ''}`}>
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="heading-sm mb-2">You're All Set!</h3>
          <p className="text-body-sm text-muted-foreground">
            Check your email for the download link. It should arrive within a few minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${variant === 'card' ? 'bg-card border border-border/40 rounded-lg p-6' : ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="heading-sm mb-1">{title}</h3>
          <p className="text-body-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid-two-col gap-unified-sm">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full group"
          disabled={isSubmitting}
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? 'Sending...' : 'Get Free Download'}
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

export default LeadMagnet;

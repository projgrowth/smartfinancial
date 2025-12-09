
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import SimpleSuccessMessage from './newsletter/SimpleSuccessMessage';
import SimpleNewsletterForm from './newsletter/SimpleNewsletterForm';
import { sanitizeInput } from '@/utils/security';
import { warn } from '@/utils/logger';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
  onDark?: boolean;
  showWebhook?: boolean;
}

const NEWSLETTER_VERSION = 'v1';

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = "Subscribe to Our Financial Insights",
  description = "Get exclusive financial tips, market insights, and educational resources delivered to your inbox.",
  compact = false,
  className,
  onDark = false,
  showWebhook = true,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedVersion = localStorage.getItem('newsletter_version');
      const isSubscribedStored = localStorage.getItem('newsletter_subscribed') === 'true';
      // Reset subscription state if version changed
      if (storedVersion !== NEWSLETTER_VERSION) {
        localStorage.removeItem('newsletter_subscribed');
        localStorage.setItem('newsletter_version', NEWSLETTER_VERSION);
        return false;
      }
      return isSubscribedStored;
    }
    return false;
  });
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zapier_webhook_newsletter') || '';
    }
    return '';
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zapier_webhook_newsletter', webhookUrl);
    }
  }, [webhookUrl]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isSubscribed) {
      localStorage.setItem('newsletter_subscribed', 'true');
    }
  }, [isSubscribed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Email validation with sanitization
      const sanitizedEmail = sanitizeInput(email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        return;
      }

      // Connect to email marketing service via Zapier webhook if provided
      const sanitizedWebhook = sanitizeInput(webhookUrl.trim());
      
      if (sanitizedWebhook) {
        await fetch(sanitizedWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({ 
            email: sanitizedEmail,
            timestamp: new Date().toISOString(),
            source: 'website_newsletter'
          })
        });
      } else {
        warn('No Zapier webhook configured for newsletter. Add one in the Webhook URL field.');
      }
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      // Show success even if webhook fails
      setIsSubscribed(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`overflow-hidden border border-border/50 shadow-sm ${className}`}>
        <CardContent className="p-6 bg-accent/10">
          <SimpleSuccessMessage />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border border-border/50 shadow-sm ${className}`}>
      <CardContent className={`${compact ? 'p-4' : 'p-6'} ${onDark ? 'bg-background/10' : 'bg-muted/40'}`}>

        <div className={compact ? "space-component-xs" : "space-component-sm"}>
          <div className={`${compact ? '' : 'flex items-center gap-3'}`}>
            {!compact && (
              <div className={`rounded-full ${onDark ? 'bg-primary-foreground/10' : 'bg-accent/20'} p-2 flex-shrink-0`}>
                <Mail className="h-5 w-5 text-accent" />
              </div>
            )}
            <div className="space-y-1">
              <h3 className={`font-heading ${compact ? 'text-base' : 'text-lg'} font-medium text-foreground`}>
                {title}
              </h3>
              <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {description}
              </p>
            </div>
          </div>
          {(showWebhook ?? !compact) && (
            <div className="form-group">
              <label htmlFor="newsletterWebhook" className="form-label text-xs">
                Zapier Webhook URL (optional, site owner)
              </label>
              <input
                id="newsletterWebhook"
                type="url"
                placeholder="https://hooks.zapier.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="form-input"
              />
            </div>
          )}

          <SimpleNewsletterForm
            email={email}
            setEmail={setEmail}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            compact={compact}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;

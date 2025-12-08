
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

        <div className={compact ? "space-y-3" : "space-y-4"}>
          <div className={`${compact ? '' : 'flex items-center space-x-3'}`}>
            {!compact && (
              <div className={`rounded-full ${onDark ? 'bg-primary-foreground/10' : 'bg-accent/20'} p-2 flex-shrink-0`}>
                <Mail className="h-5 w-5 text-accent" />
              </div>
            )}
            <div>
              <h3 className={`font-heading ${compact ? 'text-base' : 'text-lg'} font-medium text-foreground`}>
                {title}
              </h3>
              <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {description}
              </p>
            </div>
          </div>
          { (showWebhook ?? !compact) && (
            <div className="mt-2">
              <label htmlFor="newsletterWebhook" className={`${compact ? 'text-[11px]' : 'text-xs'} font-medium text-muted-foreground block mb-1`}>
                Zapier Webhook URL (optional, site owner)
              </label>
              <input
                id="newsletterWebhook"
                type="url"
                placeholder="https://hooks.zapier.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-background text-foreground transition-colors"
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

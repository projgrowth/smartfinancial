
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import SimpleSuccessMessage from './newsletter/SimpleSuccessMessage';
import SimpleNewsletterForm from './newsletter/SimpleNewsletterForm';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
  onDark?: boolean;
  showWebhook?: boolean;
}

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
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return;
      }

      // Connect to email marketing service via Zapier webhook if provided
      const webhook = webhookUrl.trim();
      
      if (webhook) {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({ 
            email,
            timestamp: new Date().toISOString(),
            source: 'website_newsletter'
          })
        });
      } else {
        console.warn('No Zapier webhook configured for newsletter. Add one in the Webhook URL field.');
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
              <h3 className={`font-heading ${compact ? 'text-body' : 'text-body-lg'} font-medium text-foreground`}>
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
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
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

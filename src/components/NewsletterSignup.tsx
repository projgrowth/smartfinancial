
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import SimpleSuccessMessage from './newsletter/SimpleSuccessMessage';
import SimpleNewsletterForm from './newsletter/SimpleNewsletterForm';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = "Subscribe to Our Financial Insights",
  description = "Get exclusive financial tips, market insights, and educational resources delivered to your inbox.",
  compact = false,
  className
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // This would connect to your email service (Mailchimp, ConvertKit, etc.)
      // For now, we'll log the email and show success
      console.log('Newsletter signup:', { email, timestamp: new Date().toISOString() });
      
      // In production, replace this with your actual API call:
      // await fetch('/api/newsletter-signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`overflow-hidden border-blue-50 shadow-sm ${className}`}>
        <CardContent className="p-6 bg-green-50">
          <SimpleSuccessMessage />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border-blue-50 shadow-sm ${className}`}>
      <CardContent className={`p-${compact ? '4' : '6'} bg-blue-50/50`}>
        <div className={compact ? "space-y-3" : "space-y-4"}>
          <div className={`${compact ? '' : 'flex items-center space-x-3'}`}>
            {!compact && (
              <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className={`font-heading ${compact ? 'text-base' : 'text-lg'} font-medium text-charcoal`}>
                {title}
              </h3>
              <p className={`${compact ? 'text-xs' : 'text-sm'} text-charcoal/70`}>
                {description}
              </p>
            </div>
          </div>
          
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

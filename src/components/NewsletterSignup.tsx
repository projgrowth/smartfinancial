
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import MicroAnimations from './ui/micro-animations';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <Card className={`overflow-hidden border-blue-50 shadow-sm ${className}`}>
        <CardContent className="p-6 bg-green-50">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-heading text-lg font-medium text-green-800">
              Thank You for Subscribing!
            </h3>
            <p className="text-sm text-green-700">
              Your first financial insight will arrive in your inbox shortly.
            </p>
          </div>
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
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2.5 pr-12 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 placeholder:text-charcoal/40"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 pointer-events-none" />
            </div>
            
            <MicroAnimations.ShimmerButton
              className="w-full flex items-center justify-center gap-1.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"} 
              <ArrowRight className="h-4 w-4" />
            </MicroAnimations.ShimmerButton>
            
            <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-center text-charcoal/50`}>
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;

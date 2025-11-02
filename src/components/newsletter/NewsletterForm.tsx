
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import MicroAnimations from '../ui/micro-animations';
import NewsletterStep1 from './NewsletterStep1';
import NewsletterStep2 from './NewsletterStep2';
import NewsletterStep3 from './NewsletterStep3';

interface NewsletterFormProps {
  step: number;
  setStep: (step: number) => void;
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  frequency: string;
  setFrequency: (frequency: string) => void;
  interests: string[];
  handleInterestToggle: (interestId: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  frequencyOptions: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  interestTopics: Array<{
    id: string;
    label: string;
  }>;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  step,
  setStep,
  email,
  setEmail,
  name,
  setName,
  frequency,
  setFrequency,
  interests,
  handleInterestToggle,
  isSubmitting,
  handleSubmit,
  frequencyOptions,
  interestTopics
}) => {
  return (
    <Card className="max-w-2xl mx-auto border-blue-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-blue-500 text-white p-6">
        <CardTitle className="text-xl">Subscribe to Our Financial Insights</CardTitle>
        <CardDescription className="text-blue-100">
          Get personalized financial guidance delivered to your inbox
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          {step === 1 && (
            <NewsletterStep1 
              email={email} 
              setEmail={setEmail} 
              name={name} 
              setName={setName} 
            />
          )}
          
          {step === 2 && (
            <NewsletterStep2 
              frequency={frequency} 
              setFrequency={setFrequency} 
              frequencyOptions={frequencyOptions} 
            />
          )}
          
          {step === 3 && (
            <NewsletterStep3 
              interests={interests} 
              handleInterestToggle={handleInterestToggle} 
              interestTopics={interestTopics} 
            />
          )}
        </CardContent>
        
        <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          
          <Button
            variant="shimmer"
            type="submit"
            disabled={isSubmitting}
            className={`${step > 1 ? '' : 'w-full'} flex items-center justify-center gap-1.5`}
          >
            {isSubmitting 
              ? "Processing..." 
              : step < 3 
                ? "Continue" 
                : "Subscribe Now"
            }
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
      
      <div className="p-4 bg-blue-50/50 text-xs text-center text-muted-foreground/80 border-t border-blue-100">
        We respect your privacy. Unsubscribe anytime. View our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
      </div>
    </Card>
  );
};

export default NewsletterForm;

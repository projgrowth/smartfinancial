
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, CheckCheck } from 'lucide-react';

interface ThankYouMessageProps {
  onReset: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ onReset }) => {
  return (
    <Card className="max-w-2xl mx-auto border-accent/20 shadow-sm overflow-hidden animate-scale-in">
      <CardContent className="p-8 text-center space-component-md">
        <div className="flex justify-center animate-scale-in [animation-delay:100ms]">
          <div className="rounded-full bg-success/10 p-4">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
        </div>
        
        <div className="space-component-xs">
          <CardTitle className="text-2xl">Thank You for Subscribing!</CardTitle>
          <CardDescription className="text-base">
            Your first edition of our financial insights will arrive in your inbox shortly. 
            We're excited to help you on your journey to financial success.
          </CardDescription>
        </div>
        
        <div className="bg-accent/5 rounded-lg p-4 max-w-md mx-auto space-component-xs">
          <h4 className="font-medium text-accent flex items-center justify-center gap-2">
            <CheckCheck className="h-5 w-5" />
            <span>What to expect next:</span>
          </h4>
          <ul className="text-sm text-accent/80 text-left space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>A welcome email with exclusive financial resources</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Regular insights based on your selected preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Invitations to exclusive webinars and events</span>
            </li>
          </ul>
        </div>
        
        <Button
          variant="outline"
          className="border-accent/20 hover:bg-accent/5"
          onClick={onReset}
        >
          Subscribe Another Email
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThankYouMessage;

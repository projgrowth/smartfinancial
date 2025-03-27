
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, CheckCheck } from 'lucide-react';

interface ThankYouMessageProps {
  onReset: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ onReset }) => {
  return (
    <Card className="max-w-2xl mx-auto border-blue-100 shadow-sm overflow-hidden">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        
        <CardTitle className="text-2xl mb-4">Thank You for Subscribing!</CardTitle>
        <CardDescription className="text-base mb-6">
          Your first edition of our financial insights will arrive in your inbox shortly. 
          We're excited to help you on your journey to financial success.
        </CardDescription>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <h4 className="font-medium text-blue-700 mb-2 flex items-center justify-center gap-2">
            <CheckCheck className="h-5 w-5" />
            <span>What to expect next:</span>
          </h4>
          <ul className="text-sm text-blue-700/80 text-left space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>A welcome email with exclusive financial resources</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>Regular insights based on your selected preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
              <span>Invitations to exclusive webinars and events</span>
            </li>
          </ul>
        </div>
        
        <Button
          variant="outline"
          className="border-blue-200 hover:bg-blue-50"
          onClick={onReset}
        >
          Subscribe Another Email
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThankYouMessage;

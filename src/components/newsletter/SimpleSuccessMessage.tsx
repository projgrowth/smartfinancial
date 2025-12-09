
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

interface SimpleSuccessMessageProps {
  onDark?: boolean;
}

const SimpleSuccessMessage: React.FC<SimpleSuccessMessageProps> = ({ onDark = false }) => {
  return (
    <div className="text-center space-component-xs">
      <div className="flex justify-center">
        <div className={`rounded-full p-2 ${onDark ? 'bg-white/20' : 'bg-green-100'}`}>
          <CheckCircle className={`h-6 w-6 ${onDark ? 'text-white' : 'text-green-600'}`} />
        </div>
      </div>
      <h3 className={`font-heading heading-sm ${onDark ? 'text-white' : 'text-green-800'}`}>
        Thank You for Subscribing!
      </h3>
      <p className={`text-sm ${onDark ? 'text-white/80' : 'text-green-700'}`}>
        Your first financial insight will arrive in your inbox shortly.
      </p>
    </div>
  );
};

export default SimpleSuccessMessage;

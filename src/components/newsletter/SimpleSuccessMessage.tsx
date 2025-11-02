
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

const SimpleSuccessMessage: React.FC = () => {
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <h3 className="font-heading heading-sm text-green-800">
        Thank You for Subscribing!
      </h3>
      <p className="text-sm text-green-700">
        Your first financial insight will arrive in your inbox shortly.
      </p>
    </div>
  );
};

export default SimpleSuccessMessage;


import React from 'react';

interface FrequencyOption {
  id: string;
  label: string;
  description: string;
}

interface NewsletterStep2Props {
  frequency: string;
  setFrequency: (frequency: string) => void;
  frequencyOptions: FrequencyOption[];
}

const NewsletterStep2: React.FC<NewsletterStep2Props> = ({ 
  frequency, 
  setFrequency,
  frequencyOptions 
}) => {
  return (
    <div>
      <h3 className="font-medium text-charcoal mb-4">How often would you like to hear from us?</h3>
      <div className="space-y-3">
        {frequencyOptions.map((option) => (
          <div
            key={option.id}
            className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
              frequency === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => setFrequency(option.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{option.label}</h4>
                <p className="text-xs text-charcoal/70">{option.description}</p>
              </div>
              <div className={`h-4 w-4 rounded-full border ${
                frequency === option.id
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {frequency === option.id && (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterStep2;

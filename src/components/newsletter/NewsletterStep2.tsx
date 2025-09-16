
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
      <h3 className="heading-xs space-component-sm">How often would you like to hear from us?</h3>
      <div className="space-component-xs">
        {frequencyOptions.map((option) => (
          <div
            key={option.id}
            className={`space-component-xs border rounded-md cursor-pointer transition-all duration-200 ${
              frequency === option.id
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/50'
            }`}
            onClick={() => setFrequency(option.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-body font-medium">{option.label}</h4>
                <p className="text-body-sm text-muted-foreground">{option.description}</p>
              </div>
              <div className={`h-4 w-4 rounded-full border ${
                frequency === option.id
                  ? 'bg-accent border-accent'
                  : 'border-border'
              }`}>
                {frequency === option.id && (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
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

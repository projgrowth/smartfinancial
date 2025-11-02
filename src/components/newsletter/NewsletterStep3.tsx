
import React from 'react';
import { CheckCheck } from 'lucide-react';

interface InterestTopic {
  id: string;
  label: string;
}

interface NewsletterStep3Props {
  interests: string[];
  handleInterestToggle: (interestId: string) => void;
  interestTopics: InterestTopic[];
}

const NewsletterStep3: React.FC<NewsletterStep3Props> = ({ 
  interests, 
  handleInterestToggle,
  interestTopics
}) => {
  return (
    <div>
      <h3 className="font-medium text-foreground mb-4">What topics interest you? (Select all that apply)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {interestTopics.map((topic) => (
          <div
            key={topic.id}
            className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
              interests.includes(topic.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => handleInterestToggle(topic.id)}
          >
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded flex-shrink-0 border ${
                interests.includes(topic.id)
                  ? 'bg-blue-500 border-blue-500 flex items-center justify-center'
                  : 'border-gray-300'
              }`}>
                {interests.includes(topic.id) && (
                  <CheckCheck className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm">{topic.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterStep3;

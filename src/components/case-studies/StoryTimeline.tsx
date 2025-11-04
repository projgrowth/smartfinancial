
import React from 'react';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

interface TimelineStep {
  phase: string;
  title: string;
  description: string;
  timeframe: string;
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface StoryTimelineProps {
  steps: TimelineStep[];
}

const StoryTimeline: React.FC<StoryTimelineProps> = ({ steps }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-accent" />;
      case 'upcoming':
        return <Target className="w-5 h-5 text-gray-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent/20 to-accent/20"></div>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-accent/20 rounded-full flex items-center justify-center shadow-sm relative z-10">
              {step.icon}
            </div>
            
            <div className="ml-6 flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-medium text-foreground">{step.title}</h4>
                {getStatusIcon(step.status)}
                <span className="text-xs text-accent bg-accent/5 px-2 py-1 rounded-full">
                  {step.timeframe}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-2">
                <span className="text-xs font-medium text-accent bg-accent/5 px-2 py-1 rounded">
                  {step.phase}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryTimeline;

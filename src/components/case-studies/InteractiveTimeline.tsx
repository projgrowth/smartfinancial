
import React, { useState } from 'react';
import { ChevronRight, Calendar, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  details?: string;
}

interface InteractiveTimelineProps {
  phases: TimelinePhase[];
  className?: string;
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ phases, className }) => {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-green-200 to-blue-200"></div>
        
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            <div 
              className={cn(
                "flex items-start cursor-pointer transition-all duration-300 hover:bg-blue-50/50 rounded-lg p-2 -ml-2",
                activePhase === phase.id && "bg-blue-50"
              )}
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
            >
              <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300",
                phase.status === 'completed' ? "bg-green-100 text-green-600" : 
                phase.status === 'current' ? "bg-blue-100 text-blue-600" : 
                "bg-gray-100 text-gray-400"
              )}>
                {phase.icon}
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{phase.title}</h4>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {phase.duration}
                  </span>
                  <ChevronRight className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200",
                    activePhase === phase.id && "rotate-90"
                  )} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
            
            {activePhase === phase.id && phase.details && (
              <div className="ml-16 mt-3 p-4 bg-white rounded-lg border border-blue-100 shadow-sm animate-fade-in">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {phase.details}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTimeline;


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
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-success/20 to-primary/20"></div>
        
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            <div 
              className={cn(
                "flex items-start cursor-pointer transition-all duration-300 hover:bg-accent/10 rounded-lg p-2 -ml-2",
                activePhase === phase.id && "bg-accent/10"
              )}
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
            >
              <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300",
                phase.status === 'completed' ? "bg-success/20 text-success" : 
                phase.status === 'current' ? "bg-primary/20 text-primary" : 
                "bg-muted text-muted-foreground"
              )}>
                {phase.icon}
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{phase.title}</h4>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {phase.duration}
                  </span>
                  <ChevronRight className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    activePhase === phase.id && "rotate-90"
                  )} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
            
            {activePhase === phase.id && phase.details && (
              <div className="ml-16 mt-3 p-4 bg-card rounded-lg border border-border shadow-sm animate-fade-in">
                <p className="text-sm text-foreground leading-relaxed">
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

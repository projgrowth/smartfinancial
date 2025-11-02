
import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryNavigationProps {
  currentStory: number;
  totalStories: number;
  onPrevious: () => void;
  onNext: () => void;
  onHome: () => void;
  storyTitles: string[];
}

const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentStory,
  totalStories,
  onPrevious,
  onNext,
  onHome,
  storyTitles
}) => {
  return (
    <div className="flex items-center justify-between bg-card rounded-lg p-4 shadow-sm border border-border">
      <button
        onClick={onPrevious}
        disabled={currentStory === 0}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          currentStory === 0 
            ? "text-muted-foreground cursor-not-allowed" 
            : "text-primary hover:bg-accent/10 hover:text-primary/80"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous Story
      </button>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          All Stories
        </button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalStories }, (_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentStory ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
      
      <button
        onClick={onNext}
        disabled={currentStory === totalStories - 1}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          currentStory === totalStories - 1
            ? "text-muted-foreground cursor-not-allowed"
            : "text-primary hover:bg-accent/10 hover:text-primary/80"
        )}
      >
        Next Story
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StoryNavigation;

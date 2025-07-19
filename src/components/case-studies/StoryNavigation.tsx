
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
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <button
        onClick={onPrevious}
        disabled={currentStory === 0}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          currentStory === 0 
            ? "text-gray-400 cursor-not-allowed" 
            : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous Story
      </button>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200"
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
                i === currentStory ? "bg-blue-500" : "bg-gray-300"
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
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        )}
      >
        Next Story
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StoryNavigation;

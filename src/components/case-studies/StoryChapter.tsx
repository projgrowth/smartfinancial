
import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryChapterProps {
  chapter: {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    icon: React.ReactNode;
    content?: React.ReactNode;
  };
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const StoryChapter: React.FC<StoryChapterProps> = ({ chapter, isActive, onClick, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'current':
        return 'text-blue-500 bg-blue-50';
      case 'upcoming':
        return 'text-gray-400 bg-gray-50';
      default:
        return 'text-gray-400 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'current':
        return <Clock className="w-4 h-4" />;
      case 'upcoming':
        return <Target className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className={cn(
        "group relative cursor-pointer transition-all duration-300",
        isActive && "transform scale-105"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex items-start gap-4 p-4 rounded-lg border transition-all duration-300",
        isActive ? "bg-blue-50 border-blue-200 shadow-md" : "bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm"
      )}>
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          getStatusColor(chapter.status)
        )}>
          {chapter.icon}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">
              Chapter {index + 1}
            </span>
            {getStatusIcon(chapter.status)}
          </div>
          <h4 className="font-medium text-gray-900 mb-1">{chapter.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {chapter.description}
          </p>
        </div>
      </div>
      
      {isActive && chapter.content && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm animate-fade-in">
          {chapter.content}
        </div>
      )}
    </div>
  );
};

export default StoryChapter;

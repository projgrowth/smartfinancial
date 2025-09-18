
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
        return 'status-success';
      case 'current':
        return 'status-info';
      case 'upcoming':
        return 'status-neutral';
      default:
        return 'status-neutral';
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
        "chapter-card flex items-start card-gap-md",
        isActive ? "chapter-card-active" : ""
      )}>
        <div className={cn(
          "flex-shrink-0 icon-lg rounded-full flex items-center justify-center transition-all duration-300",
          getStatusColor(chapter.status)
        )}>
          {chapter.icon}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center card-gap-sm content-item">
            <span className="text-body-xs font-medium text-muted-foreground">
              Chapter {index + 1}
            </span>
            {getStatusIcon(chapter.status)}
          </div>
          <h4 className="font-medium text-foreground content-item">{chapter.title}</h4>
          <p className="text-body-sm text-content leading-relaxed">
            {chapter.description}
          </p>
        </div>
      </div>
      
      {isActive && chapter.content && (
        <div className="content-item card-padding bg-card rounded-lg border border-accent/20 shadow-design-sm animate-fade-in">
          {chapter.content}
        </div>
      )}
    </div>
  );
};

export default StoryChapter;

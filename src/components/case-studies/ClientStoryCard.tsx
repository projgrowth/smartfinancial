
import React, { useState } from 'react';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle } from "@/components/ui/premium-card";
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, CheckCircle, ChevronDown, BookOpen, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import StoryChapter from './StoryChapter';
import MetricReveal from './MetricReveal';
import FloatingInsights from './FloatingInsights';
import useNavigateSection from '@/hooks/useNavigateSection';

interface ClientStoryCardProps {
  title: string;
  clientName: string;
  situation: string;
  challenges: string[];
  outcomes: string[];
  keyInsight: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  metrics?: {
    before: number;
    after: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
}

const ClientStoryCard: React.FC<ClientStoryCardProps> = ({
  title,
  clientName,
  situation,
  challenges,
  outcomes,
  keyInsight,
  icon,
  isExpanded,
  onToggle,
  children,
  metrics = []
}) => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const navigateToSection = useNavigateSection();

  const storyChapters = [
    {
      id: 'situation',
      title: 'Meet the Client',
      description: 'Understanding their unique situation and background',
      status: 'completed' as const,
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{situation}</p>
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              {metrics.map((metric, index) => (
                <MetricReveal
                  key={index}
                  value={metric.before}
                  label={`Starting ${metric.label}`}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  color="orange"
                  size="sm"
                  animationDelay={index * 200}
                />
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'challenges',
      title: 'The Challenges',
      description: 'Key obstacles and pain points they were facing',
      status: 'completed' as const,
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 text-sm">{challenge}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'strategy',
      title: 'The Strategy',
      description: 'Our approach and implementation plan',
      status: 'completed' as const,
      icon: <TrendingUp className="w-5 h-5" />,
      content: children
    },
    {
      id: 'results',
      title: 'The Results',
      description: 'Measurable outcomes and transformation achieved',
      status: 'completed' as const,
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{outcome}</p>
              </div>
            ))}
          </div>
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-lg">
              {metrics.map((metric, index) => (
                <MetricReveal
                  key={index}
                  value={metric.after}
                  label={`Final ${metric.label}`}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  color="green"
                  size="sm"
                  animationDelay={index * 200}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
  ];

  const insights = [
    {
      id: 'key-insight',
      title: 'Key Insight for Similar Situations',
      content: keyInsight,
      type: 'insight' as const,
      icon: <Lightbulb className="w-4 h-4" />
    }
  ];

  return (
    <PremiumCard 
      variant={isExpanded ? "premium" : "elevated"}
      size="lg"
      className={cn(
        "overflow-hidden transition-all duration-500 cursor-pointer",
        isExpanded && "bg-gradient-to-br from-blue-50/30 to-white"
      )}
      onClick={!isExpanded ? onToggle : undefined}
    >
      <PremiumCardHeader className={cn(
        "transition-all duration-500",
        isExpanded ? "bg-gradient-to-r from-blue-50/50 to-white pb-6" : "bg-gradient-to-r from-blue-50/30 to-white"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300",
              isExpanded ? "bg-blue-100 shadow-md" : "bg-blue-100"
            )}>
              {icon}
            </div>
            <div>
              <PremiumCardTitle className="mb-1">{title}</PremiumCardTitle>
              <p className="text-blue-600 font-medium">{clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/80">
              <BookOpen className="w-3 h-3 mr-1" />
              {isExpanded ? 'Reading Story' : 'Read Story'}
            </Badge>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/60 rounded-lg transition-colors"
            >
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-300",
                isExpanded && "rotate-180"
              )} />
            </button>
          </div>
        </div>
      </PremiumCardHeader>

      {isExpanded && (
        <PremiumCardContent className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Client Story Journey</h3>
              {storyChapters.map((chapter, index) => (
                <StoryChapter
                  key={chapter.id}
                  chapter={chapter}
                  isActive={activeChapter === chapter.id}
                  onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
                  index={index}
                />
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="sticky top-6">
                <h4 className="font-medium text-gray-900 mb-4">Key Insights</h4>
                <FloatingInsights insights={insights} />
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Could This Be Your Story?</h4>
                  <p className="text-blue-700 text-sm mb-4">
                    If you're facing similar challenges, we'd love to explore how our approach might work for your unique situation.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSection('contact');
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Your Success Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </PremiumCardContent>
      )}
    </PremiumCard>
  );
};

export default ClientStoryCard;

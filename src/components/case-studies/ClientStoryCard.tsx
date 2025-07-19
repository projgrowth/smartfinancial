
import React from 'react';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle } from "@/components/ui/premium-card";
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, CheckCircle } from 'lucide-react';

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
  children
}) => {
  return (
    <PremiumCard 
      variant={isExpanded ? "premium" : "elevated"}
      size="lg"
      className="overflow-hidden transition-all duration-500 cursor-pointer"
      onClick={onToggle}
    >
      <PremiumCardHeader className="bg-gradient-to-r from-blue-50/50 to-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              {icon}
            </div>
            <div>
              <PremiumCardTitle className="mb-1">{title}</PremiumCardTitle>
              <p className="text-blue-600 font-medium">{clientName}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/80">
            {isExpanded ? 'Collapse Story' : 'Read Story'}
          </Badge>
        </div>
        
        <div className="mt-4 p-4 bg-white/60 rounded-lg border border-blue-100/50">
          <h4 className="font-medium text-charcoal mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2 text-blue-500" />
            The Situation
          </h4>
          <p className="text-charcoal/80 text-sm leading-relaxed">{situation}</p>
        </div>
      </PremiumCardHeader>

      {isExpanded && (
        <PremiumCardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-charcoal mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-500" />
                  Key Challenges
                </h4>
                <ul className="space-y-2">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="text-charcoal/70 text-sm flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-charcoal mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  Achieved Outcomes
                </h4>
                <ul className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <li key={index} className="text-charcoal/70 text-sm flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {children}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">💡 Key Insight for Similar Situations</h4>
            <p className="text-blue-700 text-sm leading-relaxed italic">
              "{keyInsight}"
            </p>
          </div>
        </PremiumCardContent>
      )}
    </PremiumCard>
  );
};

export default ClientStoryCard;

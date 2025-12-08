import React from 'react';
import { Shield, Award, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustLineProps {
  className?: string;
}

const TrustLine: React.FC<TrustLineProps> = ({ className }) => {
  const badges = [
    { icon: Shield, label: 'Certified' },
    { icon: Award, label: 'Insured' },
    { icon: DollarSign, label: 'Fee-Only' },
  ];

  return (
    <div 
      className={cn(
        'flex flex-col items-center gap-2 sm:gap-3',
        className
      )}
    >
      {/* Trust text */}
      <p className="text-xs sm:text-sm font-medium tracking-wide text-foreground/80">
        Licensed Fiduciary Advisors · 20+ Years Experience
      </p>
      
      {/* Subtle separator line */}
      <div className="hidden sm:block w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      {/* Trust badges - clean and understated */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 backdrop-blur-sm border border-border/40 text-foreground"
          >
            <badge.icon className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-foreground">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLine;

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
      <p className="text-xs sm:text-sm text-muted-foreground/70 tracking-wide">
        Licensed Fiduciary Advisors · 20+ Years Experience
      </p>
      
      {/* Trust badges */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-muted-foreground group"
            style={{
              animation: 'fade-in 0.5s ease-out forwards',
              animationDelay: `${400 + index * 100}ms`,
            }}
          >
            <badge.icon className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
            <span className="text-xs font-medium">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLine;

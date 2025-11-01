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
      <p className="text-xs sm:text-sm font-medium tracking-wide" style={{ color: 'hsl(var(--foreground) / var(--opacity-secondary))' }}>
        Licensed Fiduciary Advisors · 20+ Years Experience
      </p>
      
      {/* Subtle separator line */}
      <div className="hidden sm:block w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      {/* Trust badges */}
      <div className="hidden sm:flex items-center gap-3 md:gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-foreground transition-all duration-300 hover:bg-background hover:border-primary/30 hover:shadow-lg group animate-fade-in"
            style={{
              animationDelay: `${400 + index * 100}ms`,
            }}
          >
            <badge.icon className="w-4 h-4 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
            <span className="text-xs font-semibold">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLine;

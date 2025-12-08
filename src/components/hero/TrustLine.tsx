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
      
      {/* Trust badges - enhanced with gradients, borders, and glow */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-br from-card via-card to-accent/10 backdrop-blur-lg border-2 border-accent/30 text-foreground transition-all duration-300 hover:border-accent/60 hover:shadow-[0_8px_32px_hsl(var(--accent)/0.25)] hover:-translate-y-1 group animate-fade-in"
            style={{
              animationDelay: `${400 + index * 100}ms`,
              boxShadow: '0 4px 20px hsl(var(--accent) / 0.15), 0 2px 8px hsl(var(--primary) / 0.1)',
            }}
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10">
              <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.6)]" aria-hidden="true" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLine;

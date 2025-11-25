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
      
      {/* Trust badges - enhanced with gradients and glow */}
      <div className="hidden sm:flex items-center gap-3 md:gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-background/95 via-background/90 to-background/80 backdrop-blur-md border border-primary/20 text-foreground transition-all duration-[400ms] hover:bg-background hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:-translate-y-1 group animate-fade-in"
            style={{
              animationDelay: `${400 + index * 100}ms`,
              boxShadow: '0 4px 12px hsl(var(--primary) / 0.08)',
            }}
          >
            <badge.icon className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" aria-hidden="true" />
            <span className="text-xs font-semibold">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustLine;

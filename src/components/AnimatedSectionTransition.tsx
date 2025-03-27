
import React from 'react';
import { ChevronDown, ChevronUp, ChevronsDown, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type TransitionStyle = 'wave' | 'chevron' | 'arrow' | 'diagonal' | 'curved';
type TransitionColorScheme = 'light-to-dark' | 'dark-to-light' | 'blue-to-white' | 'white-to-blue' | 'custom';

interface AnimatedSectionTransitionProps {
  style?: TransitionStyle;
  colorScheme?: TransitionColorScheme;
  position?: 'top' | 'bottom';
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
  showIcon?: boolean;
  iconType?: 'chevron' | 'chevrons' | 'arrow' | 'none';
}

const AnimatedSectionTransition: React.FC<AnimatedSectionTransitionProps> = ({
  style = 'wave',
  colorScheme = 'light-to-dark',
  position = 'bottom',
  fromColor,
  toColor,
  height = 40,
  className,
  animated = true,
  onClick,
  showIcon = false,
  iconType = 'chevron'
}) => {
  // Determine colors based on the color scheme
  const getColors = () => {
    if (fromColor && toColor) {
      return { from: fromColor, to: toColor };
    }

    switch (colorScheme) {
      case 'light-to-dark':
        return { from: 'from-white', to: 'to-charcoal' };
      case 'dark-to-light':
        return { from: 'from-charcoal', to: 'to-white' };
      case 'blue-to-white':
        return { from: 'from-blue-50', to: 'to-white' };
      case 'white-to-blue':
        return { from: 'from-white', to: 'to-blue-50' };
      default:
        return { from: 'from-white', to: 'to-charcoal' };
    }
  };

  // Get the path for the transition shape
  const getPath = () => {
    const width = 100;
    const h = height;

    switch (style) {
      case 'wave':
        return `M0,${position === 'bottom' ? 0 : h} 
                C${width/4},${position === 'bottom' ? h/2 : h/2} 
                ${width/2},${position === 'bottom' ? -h/2 : h*1.5} 
                ${width},${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? h : 0} 
                L0,${position === 'bottom' ? h : 0} Z`;
      case 'chevron':
        return `M0,${position === 'bottom' ? 0 : h} 
                L${width/2},${position === 'bottom' ? h : 0} 
                L${width},${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? h : 0} 
                L0,${position === 'bottom' ? h : 0} Z`;
      case 'diagonal':
        return `M0,${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? h : 0} 
                L${width},${position === 'bottom' ? h : 0} 
                L0,${position === 'bottom' ? h : 0} Z`;
      case 'curved':
        return `M0,${position === 'bottom' ? 0 : h} 
                Q${width/2},${position === 'bottom' ? h * 1.3 : h * -0.3} 
                ${width},${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? h : 0} 
                L0,${position === 'bottom' ? h : 0} Z`;
      case 'arrow':
        return `M0,${position === 'bottom' ? 0 : h} 
                L${width * 0.4},${position === 'bottom' ? 0 : h} 
                L${width * 0.5},${position === 'bottom' ? h * 0.8 : h * 0.2} 
                L${width * 0.6},${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? 0 : h} 
                L${width},${position === 'bottom' ? h : 0} 
                L0,${position === 'bottom' ? h : 0} Z`;
      default:
        return `M0,0 L${width},0 L${width},${h} L0,${h} Z`;
    }
  };

  // Component for the icon
  const renderIcon = () => {
    if (!showIcon) return null;

    const iconClasses = cn(
      "absolute left-1/2 -translate-x-1/2 text-charcoal/60 hover:text-charcoal transition-colors",
      position === 'bottom' ? "-bottom-6" : "-top-6",
      animated && "animate-bounce-subtle"
    );

    // Select the icon based on the iconType
    const renderIconComponent = () => {
      switch (iconType) {
        case 'chevron':
          return position === 'bottom' 
            ? <ChevronDown className={iconClasses} onClick={onClick} /> 
            : <ChevronUp className={iconClasses} onClick={onClick} />;
        case 'chevrons':
          return position === 'bottom' 
            ? <ChevronsDown className={iconClasses} onClick={onClick} /> 
            : <ChevronUp className={iconClasses} onClick={onClick} />;
        case 'arrow':
          return <ArrowDown className={cn(iconClasses, position === 'top' && "rotate-180")} onClick={onClick} />;
        default:
          return null;
      }
    };

    return (
      <div 
        className={cn(
          "cursor-pointer",
          onClick && "cursor-pointer"
        )}
      >
        {renderIconComponent()}
      </div>
    );
  };

  const { from, to } = getColors();
  const customColors = fromColor && toColor 
    ? { background: `linear-gradient(to ${position === 'bottom' ? 'bottom' : 'top'}, ${fromColor}, ${toColor})` }
    : {};

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div 
        className={cn(
          "w-full relative",
          animated && style === 'wave' && "animate-float"
        )}
        style={{ height: `${height}px` }}
      >
        <svg
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          viewBox={`0 0 100 ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={getPath()}
            className={customColors ? "" : `fill-current ${from} ${to} bg-gradient-to-b`}
            style={customColors}
          />
        </svg>
      </div>
      {renderIcon()}
    </div>
  );
};

export default AnimatedSectionTransition;

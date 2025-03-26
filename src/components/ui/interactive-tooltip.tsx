
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface InteractiveTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  interactive?: boolean;
}

export function InteractiveTooltip({
  trigger,
  content,
  side = "top",
  className,
  interactive = false,
}: InteractiveTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip 
        open={isOpen} 
        onOpenChange={setIsOpen}
        delayDuration={interactive ? 0 : 300}
      >
        <TooltipTrigger 
          asChild 
          onClick={interactive ? () => setIsOpen(!isOpen) : undefined}
          onMouseEnter={!interactive ? () => setIsOpen(true) : undefined}
          onMouseLeave={!interactive ? () => setIsOpen(false) : undefined}
        >
          <span className="inline-block">{trigger}</span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className={cn(
            "text-sm bg-white border border-gray-200 shadow-md p-3 max-w-xs animate-in fade-in-50 zoom-in-95", 
            interactive && "cursor-default", 
            className
          )}
          onClick={e => interactive ? e.stopPropagation() : undefined}
        >
          {content}
          {interactive && (
            <button 
              className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

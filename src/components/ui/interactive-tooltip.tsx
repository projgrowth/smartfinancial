
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { X, Info } from "lucide-react";

interface InteractiveTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  interactive?: boolean;
  variant?: "default" | "info" | "success" | "warning";
  showIcon?: boolean;
  maxWidth?: string;
  closeOnClickOutside?: boolean;
}

export function InteractiveTooltip({
  trigger,
  content,
  title,
  side = "top",
  className,
  interactive = false,
  variant = "default",
  showIcon = false,
  maxWidth = "xs",
  closeOnClickOutside = true,
}: InteractiveTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Create a handler that will be used for document click events
  const handleClickOutside = () => {
    if (interactive && closeOnClickOutside) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside the tooltip when it's open
  React.useEffect(() => {
    if (isOpen && interactive && closeOnClickOutside) {
      const handleDocumentClick = (e: MouseEvent) => {
        // Check if the click was outside the tooltip
        const tooltipContent = document.querySelector('[data-radix-tooltip-content]');
        if (tooltipContent && !tooltipContent.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [isOpen, interactive, closeOnClickOutside]);

  const variantClasses = {
    default: "bg-white border-gray-200 text-charcoal shadow-lg",
    info: "bg-blue-50 border-blue-300 text-blue-900 shadow-lg shadow-blue-900/5",
    success: "bg-green-50 border-green-300 text-green-900 shadow-lg shadow-green-900/5",
    warning: "bg-amber-50 border-amber-300 text-amber-900 shadow-lg shadow-amber-900/5",
  };

  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

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
          <span className="inline-flex items-center">
            {trigger}
            {showIcon && !interactive && (
              <Info className="ml-1 h-3.5 w-3.5 text-blue-500 opacity-80" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className={cn(
            "text-sm p-4 animate-in fade-in-50 zoom-in-95", 
            variantClasses[variant],
            maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] || "max-w-xs",
            interactive && "cursor-default border-2", 
            className
          )}
          onClick={(e) => interactive ? e.stopPropagation() : undefined}
        >
          {interactive && title && (
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <h4 className="font-medium">{title}</h4>
              <button 
                className="p-1 rounded-full hover:bg-gray-200/70 text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          
          {interactive && !title && (
            <button 
              className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200/70 text-gray-600 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          
          <div className={cn(interactive && !title ? "pr-5" : "")}>
            {content}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


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

  const handleClickOutside = () => {
    if (interactive && closeOnClickOutside) {
      setIsOpen(false);
    }
  };

  const variantClasses = {
    default: "bg-white border-gray-200 text-charcoal",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
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
              <Info className="ml-1 h-3.5 w-3.5 text-blue-500 opacity-70" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className={cn(
            "text-sm shadow-md p-3 animate-in fade-in-50 zoom-in-95", 
            variantClasses[variant],
            maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] || "max-w-xs",
            interactive && "cursor-default border-2", 
            className
          )}
          onClick={(e) => interactive ? e.stopPropagation() : undefined}
          onClickOutside={handleClickOutside}
        >
          {interactive && title && (
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <h4 className="font-medium">{title}</h4>
              <button 
                className="p-1 rounded-full hover:bg-gray-200/50 text-gray-500 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          
          {interactive && !title && (
            <button 
              className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200/50 text-gray-500 transition-colors"
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

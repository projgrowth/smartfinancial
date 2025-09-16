import * as React from "react"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tiltEffect?: boolean
  hoverGlow?: boolean
  variant?: 'default' | 'premium' | 'subtle'
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, tiltEffect = false, hoverGlow = false, variant = 'default', ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null)
    
    React.useImperativeHandle(ref, () => cardRef.current!)
    
    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!tiltEffect || !cardRef.current) return
      
      const card = cardRef.current
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      const rotateX = (y / rect.height) * -10
      const rotateY = (x / rect.width) * 10
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    }, [tiltEffect])
    
    const handleMouseLeave = React.useCallback(() => {
      if (!tiltEffect || !cardRef.current) return
      
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }, [tiltEffect])
    
    const variantStyles = {
      default: "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300",
      premium: "rounded-lg border bg-gradient-to-br from-card via-card to-card/95 text-card-foreground shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-primary/10",
      subtle: "rounded-lg border bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm hover:shadow-md hover:bg-card/70 transition-all duration-300"
    }
    
    const glowStyles = hoverGlow ? "hover:shadow-2xl hover:shadow-primary/20" : ""
    
    return (
      <div
        ref={cardRef}
        className={cn(
          variantStyles[variant],
          glowStyles,
          tiltEffect && "transform-gpu transition-transform duration-300 ease-out",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }
)
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
      className
    )}
    {...props}
  />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { 
  EnhancedCard, 
  EnhancedCardHeader, 
  EnhancedCardFooter, 
  EnhancedCardTitle, 
  EnhancedCardDescription, 
  EnhancedCardContent 
}
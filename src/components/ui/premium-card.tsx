
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumCardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "border-border shadow-sm hover:shadow-md",
        elevated: "border-border/50 shadow-md hover:shadow-lg hover:-translate-y-1",
        premium: "border-border/30 shadow-lg hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm",
        glass: "border-white/20 shadow-lg bg-white/80 backdrop-blur-md hover:bg-white/90 hover:shadow-xl",
        hero: "border-gradient-to-r from-primary/20 via-accent/20 to-primary/20 shadow-xl hover:shadow-2xl bg-gradient-to-br from-background via-background/95 to-accent/5",
        advisor: "border-border shadow-sm hover:shadow-md hover:border-primary/20 rounded-lg",
        "process-dark": "border-white/15 shadow-sm bg-charcoal/30 hover:bg-charcoal/50 rounded-lg",
        timeline: "border-white/15 bg-charcoal/30 hover:bg-charcoal/40 rounded-lg",
        info: "border-border/50 shadow-sm rounded-lg",
        "glass-light": "border-blue-100/80 shadow-sm bg-white hover:shadow-md hover:border-blue-100 rounded-lg",
        faq: "border-blue-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md"
      },
      size: {
        xs: "p-3",
        sm: "p-4",
        default: "p-6", 
        lg: "p-8",
        xl: "p-10",
        responsive: "p-4 md:p-6"
      },
      spacing: {
        tight: "space-y-3",
        default: "space-y-4",
        relaxed: "space-y-6",
        loose: "space-y-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      spacing: "default"
    }
  }
)

export interface PremiumCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumCardVariants> {
  hover?: boolean
  active?: boolean
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, variant, size, spacing, hover = true, active, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        premiumCardVariants({ variant, size, spacing }),
        hover && "group cursor-pointer",
        active && variant === "process-dark" && "border-blue-400/50 shadow-lg shadow-blue-900/10",
        active && variant === "timeline" && "bg-charcoal/50 border-blue-400/30 shadow-lg shadow-blue-900/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
PremiumCard.displayName = "PremiumCard"

const PremiumCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 pb-4", className)}
    {...props}
  />
))
PremiumCardHeader.displayName = "PremiumCardHeader"

const PremiumCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-primary",
      className
    )}
    {...props}
  />
))
PremiumCardTitle.displayName = "PremiumCardTitle"

const PremiumCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm leading-relaxed", className)}
    {...props}
  />
))
PremiumCardDescription.displayName = "PremiumCardDescription"

const PremiumCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("flex-1", className)} 
    {...props} 
  />
))
PremiumCardContent.displayName = "PremiumCardContent"

const PremiumCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0", className)}
    {...props}
  />
))
PremiumCardFooter.displayName = "PremiumCardFooter"

export { 
  PremiumCard, 
  PremiumCardHeader, 
  PremiumCardFooter, 
  PremiumCardTitle, 
  PremiumCardDescription, 
  PremiumCardContent,
  premiumCardVariants
}


import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumCardVariants = cva(
  "rounded-xl border transition-all duration-250 ease-out",
  {
    variants: {
      variant: {
        default: "bg-card border-border/70 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-accent/40",
        elevated: "bg-card border-border/60 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-accent/50",
        premium: "border-border/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-card via-card to-accent/5 backdrop-blur-sm",
        glass: "border-white/30 shadow-xl bg-white/90 backdrop-blur-lg hover:bg-white/95 hover:shadow-2xl hover:-translate-y-1",
        dark: "border-white/40 shadow-xl bg-white/25 backdrop-blur-lg hover:bg-white/30 rounded-lg text-white hover:-translate-y-1 hover:border-accent/60",
        advisor: "border-border/60 shadow-lg hover:shadow-xl hover:border-accent/40 rounded-lg bg-card text-card-foreground hover:-translate-y-1",
        timeline: "border-white/40 shadow-xl bg-white/25 backdrop-blur-lg hover:bg-white/30 rounded-lg text-white hover:-translate-y-1",
        info: "bg-card border-border/60 shadow-md rounded-lg hover:shadow-lg hover:-translate-y-1",
        faq: "border-accent/30 rounded-lg overflow-hidden bg-card shadow-md hover:shadow-lg hover:-translate-y-1",
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
        active && (variant === "dark" || variant === "timeline") && "border-accent/70 shadow-xl shadow-accent/20 ring-1 ring-accent/30",
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
    className={cn("flex items-center pt-4 animate-fade-in group-hover:animate-enter", className)}
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

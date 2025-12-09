import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumCardVariants = cva(
  "rounded-xl border transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        default: "bg-card border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent/30",
        elevated: "bg-card border-border/40 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-accent/40",
        faq: "border-border/30 rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md",
        advisor: "border-border/40 shadow-md hover:shadow-lg hover:border-accent/30 rounded-xl bg-card text-card-foreground hover:-translate-y-1",
      },
      size: {
        sm: "p-4",
        default: "p-6", 
        lg: "p-6 md:p-8",
      },
      spacing: {
        tight: "space-y-4",
        default: "space-y-6",
        relaxed: "space-y-8",
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
        active && "border-accent/70 shadow-xl shadow-accent/20 ring-1 ring-accent/30",
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
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
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
    className={cn("flex items-center pt-4", className)}
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
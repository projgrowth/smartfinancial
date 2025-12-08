import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] min-h-11 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98] min-h-11",
        outline: "border border-border bg-background hover:bg-accent/10 hover:text-accent-foreground active:scale-[0.98] min-h-11",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] min-h-11",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground active:scale-[0.98] min-h-11",
        link: "text-primary underline-offset-4 hover:underline min-h-11",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98] min-h-11",
        subtle: "border border-border bg-transparent text-foreground hover:bg-accent/10 active:scale-[0.98] min-h-11",
        bare: "bg-transparent text-current hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none",
        shimmer: "relative bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg overflow-hidden min-h-11 after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:animate-[shimmer_0.5s_ease-out]",
      },
      size: {
        default: "h-auto min-h-11 px-4 py-2",
        sm: "h-auto min-h-10 rounded-lg px-3",
        xs: "h-auto min-h-8 rounded-lg px-2",
        lg: "h-auto min-h-12 rounded-lg px-8",
        icon: "h-11 w-11",
        none: "h-auto p-0 min-h-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  animate?: 'shimmer' | 'pulse' | 'none'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, animate = 'none', children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const animationClasses = {
      shimmer: "after:animate-[shimmer_1s_ease-in-out]",
      pulse: "animate-pulse",
      none: ""
    }
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          animate !== 'none' && animationClasses[animate],
          loading && "cursor-not-allowed opacity-75",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

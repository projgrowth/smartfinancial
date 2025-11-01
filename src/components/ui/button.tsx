import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg active:scale-[0.98]",
        subtle: "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        bare: "bg-transparent text-current hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none",
        shimmer: "relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground hover:scale-[1.02] shadow-lg hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] overflow-hidden whitespace-nowrap leading-none min-h-[44px] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-background/20 after:to-transparent after:translate-x-[-100%] hover:after:animate-[shimmer_1s_ease-in-out]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-7 rounded-md px-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "h-auto p-0",
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

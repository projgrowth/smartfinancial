import * as React from "react"
import { cn } from "@/lib/utils"

// Enhanced navigation link with smooth underline animation
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  variant?: 'underline' | 'pill' | 'minimal'
}

const EnhancedNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, isActive = false, variant = 'underline', children, ...props }, ref) => {
    const variantStyles = {
      underline: cn(
        "relative px-1 py-1 text-sm font-medium transition-colors duration-300 group",
        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary",
        "after:transform after:origin-left after:transition-transform after:duration-300",
        isActive 
          ? "text-primary after:scale-x-100" 
          : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
      ),
      pill: cn(
        "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      ),
      minimal: cn(
        "px-1 py-1 text-sm font-medium transition-colors duration-300",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )
    }
    
    return (
      <a
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)
EnhancedNavLink.displayName = "EnhancedNavLink"

// Mobile menu with staggered animations
interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  items: Array<{ name: string; href: string; isActive?: boolean }>
}

const EnhancedMobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ className, isOpen, items, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          className
        )}
        {...props}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border/50">
          {items.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-3 text-sm font-medium transition-all duration-300 border-b border-border/30 last:border-b-0",
                "hover:bg-muted hover:pl-6",
                item.isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                animationDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {item.name}
            </a>
          ))}
          {children}
        </div>
      </div>
    )
  }
)
EnhancedMobileMenu.displayName = "EnhancedMobileMenu"

// Breadcrumb with animated separators
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{ name: string; href?: string }>
  separator?: React.ReactNode
}

const EnhancedBreadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator = '/', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center space-x-2 text-sm", className)}
        aria-label="Breadcrumb"
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
              >
                {item.name}
              </a>
            ) : (
              <span className="text-foreground font-medium">{item.name}</span>
            )}
            {index < items.length - 1 && (
              <span className="text-muted-foreground/50 select-none">
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    )
  }
)
EnhancedBreadcrumb.displayName = "EnhancedBreadcrumb"

// Progress indicator for navigation
interface NavigationProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number // 0-100
  variant?: 'line' | 'dots' | 'circle'
}

const NavigationProgress = React.forwardRef<HTMLDivElement, NavigationProgressProps>(
  ({ className, progress, variant = 'line', ...props }, ref) => {
    const variants = {
      line: (
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      ),
      dots: (
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                progress > i * 20 ? "bg-primary scale-110" : "bg-muted"
              )}
            />
          ))}
        </div>
      ),
      circle: (
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="hsl(var(--muted))"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="87.96"
              strokeDashoffset={87.96 - (87.96 * progress) / 100}
              className="transition-all duration-500 ease-out"
            />
          </svg>
        </div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {variants[variant]}
      </div>
    )
  }
)
NavigationProgress.displayName = "NavigationProgress"

export { 
  EnhancedNavLink, 
  EnhancedMobileMenu, 
  EnhancedBreadcrumb, 
  NavigationProgress 
}
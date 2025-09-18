import * as React from "react"
import { cn } from "@/lib/utils"

// Staggered entrance animation hook
const useStaggeredChildren = (itemCount: number, baseDelay = 100) => {
  const animationDelayFast = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-fast')) || 100;
  
  return React.useMemo(() => 
    Array.from({ length: itemCount }).map((_, i) => ({
      animationDelay: `${i * animationDelayFast}ms`,
      transitionDelay: `${i * animationDelayFast}ms`
    }))
  , [itemCount, animationDelayFast])
}

// Enhanced hover scale with spring physics
interface SpringScaleProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number
  children: React.ReactNode
}

const SpringScale = React.forwardRef<HTMLDivElement, SpringScaleProps>(
  ({ className, scale = 1.05, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "transition-transform transition-fast ease-out active:scale-95 hover:scale-105 transform-gpu",
        className
      )}
      style={{
        '--scale-hover': scale
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
)
SpringScale.displayName = "SpringScale"

// Magnetic attraction effect
interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number
  children: React.ReactNode
}

const Magnetic = React.forwardRef<HTMLDivElement, MagneticProps>(
  ({ className, strength = 0.3, children, ...props }, ref) => {
    const magneticRef = React.useRef<HTMLDivElement>(null)
    
    React.useImperativeHandle(ref, () => magneticRef.current!)
    
    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (!magneticRef.current) return
      
      const element = magneticRef.current
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [strength])
    
    const handleMouseLeave = React.useCallback(() => {
      if (!magneticRef.current) return
      magneticRef.current.style.transform = 'translate(0px, 0px)'
    }, [])
    
    return (
      <div
        ref={magneticRef}
        className={cn("transition-transform transition-normal ease-out transform-gpu", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Magnetic.displayName = "Magnetic"

// Floating animation with customizable intensity
interface FloatingProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'subtle' | 'medium' | 'strong'
  children: React.ReactNode
}

const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  ({ className, intensity = 'medium', children, ...props }, ref) => {
    const intensityMap = {
      subtle: 'animate-bounce-subtle',
      medium: 'animate-float',
      strong: 'animate-bounce'
    }
    
    return (
      <div
        ref={ref}
        className={cn(intensityMap[intensity], "transform-gpu", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Floating.displayName = "Floating"

// Reveal on scroll with enhanced animations
interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  children: React.ReactNode
}

const RevealOnScroll = React.forwardRef<HTMLDivElement, RevealOnScrollProps>(
  ({ className, direction = 'up', delay = 0, duration = 600, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const elementRef = React.useRef<HTMLDivElement>(null)
    
    React.useImperativeHandle(ref, () => elementRef.current!)
    
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -10%' }
      )
      
      if (elementRef.current) {
        observer.observe(elementRef.current)
      }
      
      return () => observer.disconnect()
    }, [])
    
    const getTransform = () => {
      if (isVisible) return 'translate3d(0, 0, 0) scale(1)'
      
      switch (direction) {
        case 'up': return 'translate3d(0, 30px, 0) scale(1)'
        case 'down': return 'translate3d(0, -30px, 0) scale(1)'
        case 'left': return 'translate3d(30px, 0, 0) scale(1)'
        case 'right': return 'translate3d(-30px, 0, 0) scale(1)'
        case 'scale': return 'translate3d(0, 0, 0) scale(0.95)'
        default: return 'translate3d(0, 30px, 0) scale(1)'
      }
    }
    
    return (
      <div
        ref={elementRef}
        className={cn("transform-gpu", className)}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          transitionProperty: 'opacity, transform',
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          willChange: isVisible ? 'auto' : 'opacity, transform'
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
RevealOnScroll.displayName = "RevealOnScroll"

// Gradient text animation
interface AnimatedGradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'shimmer' | 'wave' | 'pulse'
}

const AnimatedGradientText = React.forwardRef<HTMLSpanElement, AnimatedGradientTextProps>(
  ({ className, children, variant = 'shimmer', ...props }, ref) => {
    const variantStyles = {
      shimmer: "bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]",
      wave: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse",
      pulse: "bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent animate-pulse"
    }
    
    return (
      <span
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
AnimatedGradientText.displayName = "AnimatedGradientText"

export {
  SpringScale,
  Magnetic,
  Floating,
  RevealOnScroll,
  AnimatedGradientText,
  useStaggeredChildren
}
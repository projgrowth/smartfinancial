import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  separator?: string
  isVisible?: boolean
  onComplete?: () => void
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'bounce'
}

const AnimatedCounter = React.forwardRef<HTMLDivElement, AnimatedCounterProps>(
  ({ 
    className, 
    value, 
    duration = 2000, 
    delay = 0, 
    prefix = '', 
    suffix = '', 
    decimals = 0,
    separator = ',',
    isVisible = true,
    onComplete,
    easing = 'easeOut',
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0)
    const [isAnimating, setIsAnimating] = React.useState(false)
    
    const easingFunctions = {
      linear: (t: number) => t,
      easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
      easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      bounce: (t: number) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    }
    
    React.useEffect(() => {
      if (!isVisible) return
      
      const startAnimation = () => {
        setIsAnimating(true)
        const startTime = performance.now()
        const startValue = displayValue
        const totalChange = value - startValue
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = easingFunctions[easing](progress)
          
          const currentValue = startValue + (totalChange * easedProgress)
          setDisplayValue(currentValue)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setIsAnimating(false)
            onComplete?.()
          }
        }
        
        requestAnimationFrame(animate)
      }
      
      if (delay > 0) {
        const timer = setTimeout(startAnimation, delay)
        return () => clearTimeout(timer)
      } else {
        startAnimation()
      }
    }, [value, duration, delay, isVisible, easing, onComplete])
    
    const formatNumber = (num: number) => {
      const rounded = Number(num.toFixed(decimals))
      const parts = rounded.toString().split('.')
      
      // Add thousand separators
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      
      return parts.join('.')
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "tabular-nums font-medium transition-all duration-300",
          isAnimating && "animate-pulse",
          className
        )}
        {...props}
      >
        {prefix}{formatNumber(displayValue)}{suffix}
      </div>
    )
  }
)
AnimatedCounter.displayName = "AnimatedCounter"

// Progress bar with animation
interface AnimatedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  duration?: number
  delay?: number
  showValue?: boolean
  label?: string
  color?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const AnimatedProgress = React.forwardRef<HTMLDivElement, AnimatedProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    duration = 1500, 
    delay = 0,
    showValue = false,
    label,
    color = 'primary',
    size = 'md',
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0)
    const [isVisible, setIsVisible] = React.useState(false)
    
    const elementRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => elementRef.current!)
    
    // Intersection observer for visibility
    React.useEffect(() => {
      const element = elementRef.current
      if (!element) return
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(element)
          }
        },
        { threshold: 0.1 }
      )
      
      observer.observe(element)
      return () => observer.disconnect()
    }, [])
    
    // Animation effect
    React.useEffect(() => {
      if (!isVisible) return
      
      const startAnimation = () => {
        const startTime = performance.now()
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3) // easeOut
          
          const currentValue = value * easedProgress
          setDisplayValue(currentValue)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        requestAnimationFrame(animate)
      }
      
      if (delay > 0) {
        const timer = setTimeout(startAnimation, delay)
        return () => clearTimeout(timer)
      } else {
        startAnimation()
      }
    }, [isVisible, value, duration, delay])
    
    const percentage = (displayValue / max) * 100
    
    const colorClasses = {
      primary: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500'
    }
    
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    }
    
    return (
      <div ref={elementRef} className={cn("space-y-2", className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center text-sm">
            {label && <span className="font-medium">{label}</span>}
            {showValue && (
              <span className="tabular-nums">
                <AnimatedCounter 
                  value={displayValue} 
                  decimals={0}
                  duration={duration}
                  delay={delay}
                />
                /{max}
              </span>
            )}
          </div>
        )}
        <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size])}>
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              colorClasses[color]
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    )
  }
)
AnimatedProgress.displayName = "AnimatedProgress"

export { AnimatedCounter, AnimatedProgress }
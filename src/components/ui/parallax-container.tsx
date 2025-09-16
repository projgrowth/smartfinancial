import * as React from "react"
import { cn } from "@/lib/utils"

interface ParallaxContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number
  direction?: 'vertical' | 'horizontal'
  children: React.ReactNode
}

const ParallaxContainer = React.forwardRef<HTMLDivElement, ParallaxContainerProps>(
  ({ className, intensity = 0.5, direction = 'vertical', children, ...props }, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => elementRef.current!)
    
    React.useEffect(() => {
      const element = elementRef.current
      if (!element) return
      
      let rafId: number
      
      const handleScroll = () => {
        const rect = element.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -intensity
        
        if (direction === 'vertical') {
          element.style.transform = `translate3d(0, ${rate}px, 0)`
        } else {
          element.style.transform = `translate3d(${rate}px, 0, 0)`
        }
      }
      
      const onScroll = () => {
        rafId = requestAnimationFrame(handleScroll)
      }
      
      window.addEventListener('scroll', onScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }, [intensity, direction])
    
    return (
      <div
        ref={elementRef}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ParallaxContainer.displayName = "ParallaxContainer"

// Advanced parallax background component
interface ParallaxBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  gradient?: string
  intensity?: number
  overlay?: boolean
  children?: React.ReactNode
}

const ParallaxBackground = React.forwardRef<HTMLDivElement, ParallaxBackgroundProps>(
  ({ 
    className, 
    image, 
    gradient, 
    intensity = 0.3, 
    overlay = false, 
    children, 
    ...props 
  }, ref) => {
    const backgroundRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => backgroundRef.current!)
    
    React.useEffect(() => {
      const element = backgroundRef.current
      if (!element) return
      
      let rafId: number
      
      const handleScroll = () => {
        const rect = element.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -intensity
        
        const bgElement = element.querySelector('[data-parallax-bg]') as HTMLElement
        if (bgElement) {
          bgElement.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`
        }
      }
      
      const onScroll = () => {
        rafId = requestAnimationFrame(handleScroll)
      }
      
      window.addEventListener('scroll', onScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }, [intensity])
    
    return (
      <div
        ref={backgroundRef}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Parallax Background */}
        <div 
          data-parallax-bg
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            backgroundImage: image ? `url(${image})` : gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll'
          }}
        />
        
        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black/20 z-10" />
        )}
        
        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    )
  }
)
ParallaxBackground.displayName = "ParallaxBackground"

// Scroll-triggered reveal animations
interface ScrollTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  onEnter?: () => void
  onLeave?: () => void
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  children: React.ReactNode
}

const ScrollTrigger = React.forwardRef<HTMLDivElement, ScrollTriggerProps>(
  ({ 
    className, 
    onEnter, 
    onLeave, 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = false,
    children, 
    ...props 
  }, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => elementRef.current!)
    
    React.useEffect(() => {
      const element = elementRef.current
      if (!element) return
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onEnter?.()
            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else {
            onLeave?.()
          }
        },
        { threshold, rootMargin }
      )
      
      observer.observe(element)
      
      return () => observer.disconnect()
    }, [onEnter, onLeave, threshold, rootMargin, triggerOnce])
    
    return (
      <div
        ref={elementRef}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollTrigger.displayName = "ScrollTrigger"

export { ParallaxContainer, ParallaxBackground, ScrollTrigger }
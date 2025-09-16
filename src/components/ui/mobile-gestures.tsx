import * as React from "react"
import { cn } from "@/lib/utils"

// Touch gesture hook for swipe detection
interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number
  velocity?: number
  preventDefaultTouchmoveEvent?: boolean
}

export const useSwipeable = (
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    velocity = 0.3,
    preventDefaultTouchmoveEvent = false
  } = options
  
  const touchStart = React.useRef<{ x: number; y: number; time: number } | null>(null)
  const touchEnd = React.useRef<{ x: number; y: number; time: number } | null>(null)
  
  const onTouchStart = React.useCallback((e: TouchEvent) => {
    touchEnd.current = null
    const touch = e.targetTouches[0]
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }, [])
  
  const onTouchMove = React.useCallback((e: TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault()
    }
  }, [preventDefaultTouchmoveEvent])
  
  const onTouchEnd = React.useCallback((e: TouchEvent) => {
    if (!touchStart.current) return
    
    const touch = e.changedTouches[0]
    touchEnd.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    
    const deltaX = touchEnd.current.x - touchStart.current.x
    const deltaY = touchEnd.current.y - touchStart.current.y
    const deltaTime = touchEnd.current.time - touchStart.current.time
    
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    const velocityX = absX / deltaTime
    const velocityY = absY / deltaTime
    
    // Check if swipe meets threshold and velocity requirements
    if (Math.max(absX, absY) < threshold) return
    if (Math.max(velocityX, velocityY) < velocity) return
    
    // Determine swipe direction
    if (absX > absY) {
      // Horizontal swipe
      if (deltaX > 0) {
        handlers.onSwipeRight?.()
      } else {
        handlers.onSwipeLeft?.()
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        handlers.onSwipeDown?.()
      } else {
        handlers.onSwipeUp?.()
      }
    }
  }, [handlers, threshold, velocity])
  
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Pull-to-refresh component
interface PullToRefreshProps extends React.HTMLAttributes<HTMLDivElement> {
  onRefresh: () => Promise<void> | void
  threshold?: number
  maxPull?: number
  refreshingText?: string
  pullText?: string
  releaseText?: string
  isRefreshing?: boolean
}

export const PullToRefresh = React.forwardRef<HTMLDivElement, PullToRefreshProps>(
  ({ 
    className, 
    children, 
    onRefresh, 
    threshold = 80,
    maxPull = 120,
    refreshingText = "Refreshing...",
    pullText = "Pull to refresh",
    releaseText = "Release to refresh",
    isRefreshing = false,
    ...props 
  }, ref) => {
    const [pullDistance, setPullDistance] = React.useState(0)
    const [isPulling, setIsPulling] = React.useState(false)
    const [canRelease, setCanRelease] = React.useState(false)
    
    const containerRef = React.useRef<HTMLDivElement>(null)
    const startY = React.useRef(0)
    const scrollTop = React.useRef(0)
    
    React.useImperativeHandle(ref, () => containerRef.current!)
    
    const handleTouchStart = React.useCallback((e: TouchEvent) => {
      if (containerRef.current?.scrollTop !== 0) return
      
      startY.current = e.touches[0].clientY
      scrollTop.current = containerRef.current?.scrollTop || 0
      setIsPulling(true)
    }, [])
    
    const handleTouchMove = React.useCallback((e: TouchEvent) => {
      if (!isPulling || scrollTop.current > 0) return
      
      const deltaY = e.touches[0].clientY - startY.current
      
      if (deltaY > 0) {
        e.preventDefault()
        const distance = Math.min(deltaY * 0.5, maxPull)
        setPullDistance(distance)
        setCanRelease(distance >= threshold)
      }
    }, [isPulling, threshold, maxPull])
    
    const handleTouchEnd = React.useCallback(async () => {
      if (!isPulling) return
      
      if (canRelease && !isRefreshing) {
        try {
          await onRefresh()
        } finally {
          // Animation cleanup
          setTimeout(() => {
            setPullDistance(0)
            setIsPulling(false)
            setCanRelease(false)
          }, 300)
        }
      } else {
        setPullDistance(0)
        setIsPulling(false)
        setCanRelease(false)
      }
    }, [isPulling, canRelease, isRefreshing, onRefresh])
    
    React.useEffect(() => {
      const container = containerRef.current
      if (!container) return
      
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }, [handleTouchStart, handleTouchMove, handleTouchEnd])
    
    const getRefreshText = () => {
      if (isRefreshing) return refreshingText
      if (canRelease) return releaseText
      return pullText
    }
    
    const refreshOpacity = Math.min(pullDistance / threshold, 1)
    const spinRotation = isRefreshing ? 'animate-spin' : ''
    
    return (
      <div 
        ref={containerRef}
        className={cn("relative overflow-auto", className)}
        {...props}
      >
        {/* Pull-to-refresh indicator */}
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-300 z-50",
            "bg-background border-b border-border"
          )}
          style={{
            height: `${pullDistance}px`,
            opacity: refreshOpacity,
            transform: `translateY(-${Math.max(0, threshold - pullDistance)}px)`
          }}
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className={cn("w-5 h-5 border-2 border-primary border-t-transparent rounded-full", spinRotation)} />
            <span>{getRefreshText()}</span>
          </div>
        </div>
        
        {/* Content */}
        <div 
          style={{
            transform: `translateY(${isPulling ? pullDistance : 0}px)`,
            transition: isPulling ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)
PullToRefresh.displayName = "PullToRefresh"

// Swipeable card component
interface SwipeableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  swipeThreshold?: number
  resetOnRelease?: boolean
  leftAction?: {
    icon: React.ReactNode
    color: string
    label: string
  }
  rightAction?: {
    icon: React.ReactNode
    color: string
    label: string
  }
}

export const SwipeableCard = React.forwardRef<HTMLDivElement, SwipeableCardProps>(
  ({ 
    className, 
    children, 
    onSwipeLeft, 
    onSwipeRight, 
    swipeThreshold = 100,
    resetOnRelease = true,
    leftAction,
    rightAction,
    ...props 
  }, ref) => {
    const [translateX, setTranslateX] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const [startX, setStartX] = React.useState(0)
    
    const cardRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => cardRef.current!)
    
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX)
      setIsDragging(true)
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      
      const deltaX = e.touches[0].clientX - startX
      const maxTranslate = 120
      const dampening = 0.6
      
      // Apply dampening for smoother feel
      const newTranslateX = Math.max(-maxTranslate, Math.min(maxTranslate, deltaX * dampening))
      setTranslateX(newTranslateX)
    }
    
    const handleTouchEnd = () => {
      if (!isDragging) return
      
      setIsDragging(false)
      
      if (Math.abs(translateX) >= swipeThreshold) {
        if (translateX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (translateX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
      
      if (resetOnRelease) {
        setTranslateX(0)
      }
    }
    
    React.useEffect(() => {
      const card = cardRef.current
      if (!card) return
      
      card.addEventListener('touchstart', handleTouchStart, { passive: true })
      card.addEventListener('touchmove', handleTouchMove, { passive: true })
      card.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      return () => {
        card.removeEventListener('touchstart', handleTouchStart)
        card.removeEventListener('touchmove', handleTouchMove)
        card.removeEventListener('touchend', handleTouchEnd)
      }
    }, [isDragging, startX, translateX])
    
    const leftOpacity = Math.max(0, translateX / swipeThreshold)
    const rightOpacity = Math.max(0, -translateX / swipeThreshold)
    
    return (
      <div className="relative overflow-hidden rounded-lg">
        {/* Left Action */}
        {leftAction && (
          <div 
            className="absolute inset-y-0 left-0 flex items-center justify-center px-4 z-0"
            style={{ 
              backgroundColor: leftAction.color,
              opacity: leftOpacity,
              width: Math.max(0, translateX)
            }}
          >
            <div className="flex flex-col items-center text-white">
              {leftAction.icon}
              <span className="text-xs mt-1">{leftAction.label}</span>
            </div>
          </div>
        )}
        
        {/* Right Action */}
        {rightAction && (
          <div 
            className="absolute inset-y-0 right-0 flex items-center justify-center px-4 z-0"
            style={{ 
              backgroundColor: rightAction.color,
              opacity: rightOpacity,
              width: Math.max(0, -translateX)
            }}
          >
            <div className="flex flex-col items-center text-white">
              {rightAction.icon}
              <span className="text-xs mt-1">{rightAction.label}</span>
            </div>
          </div>
        )}
        
        {/* Card Content */}
        <div
          ref={cardRef}
          className={cn("relative z-10 bg-background transition-transform", className)}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
SwipeableCard.displayName = "SwipeableCard"
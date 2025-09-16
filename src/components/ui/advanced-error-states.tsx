import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Server, 
  Clock,
  Bug,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Loader2
} from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { AnimatedCounter } from "./animated-counter"
import { SpringScale, RevealOnScroll } from "./enhanced-animations"

// Advanced Error State Component
interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'network' | 'server' | 'timeout' | 'validation' | 'generic'
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  showRetry?: boolean
  onRetry?: () => void
  isRetrying?: boolean
  retryCount?: number
  maxRetries?: number
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ 
    className, 
    type = 'generic',
    title,
    description,
    action,
    secondaryAction,
    showRetry = true,
    onRetry,
    isRetrying = false,
    retryCount = 0,
    maxRetries = 3,
    ...props 
  }, ref) => {
    const errorConfig = {
      network: {
        icon: <WifiOff className="w-12 h-12 text-red-500" />,
        defaultTitle: "Connection Problem",
        defaultDescription: "Unable to connect to our servers. Please check your internet connection and try again.",
        bgColor: "from-red-50 to-orange-50",
        borderColor: "border-red-200"
      },
      server: {
        icon: <Server className="w-12 h-12 text-orange-500" />,
        defaultTitle: "Server Error", 
        defaultDescription: "Our servers are experiencing issues. We're working to fix this as quickly as possible.",
        bgColor: "from-orange-50 to-yellow-50",
        borderColor: "border-orange-200"
      },
      timeout: {
        icon: <Clock className="w-12 h-12 text-yellow-500" />,
        defaultTitle: "Request Timeout",
        defaultDescription: "The request is taking longer than expected. Please try again.",
        bgColor: "from-yellow-50 to-amber-50", 
        borderColor: "border-yellow-200"
      },
      validation: {
        icon: <AlertCircle className="w-12 h-12 text-blue-500" />,
        defaultTitle: "Validation Error",
        defaultDescription: "Please check your input and try again.",
        bgColor: "from-blue-50 to-indigo-50",
        borderColor: "border-blue-200"
      },
      generic: {
        icon: <AlertTriangle className="w-12 h-12 text-gray-500" />,
        defaultTitle: "Something went wrong",
        defaultDescription: "An unexpected error occurred. Please try again.",
        bgColor: "from-gray-50 to-slate-50",
        borderColor: "border-gray-200"
      }
    }
    
    const config = errorConfig[type]
    const canRetry = showRetry && retryCount < maxRetries && !isRetrying
    
    return (
      <RevealOnScroll direction="scale" className={className} ref={ref} {...props}>
        <Card className={cn("text-center", config.borderColor)}>
          <CardContent className={cn("p-8 bg-gradient-to-br", config.bgColor)}>
            {/* Error Icon with Animation */}
            <SpringScale>
              <div className="flex items-center justify-center mb-6">
                {isRetrying ? (
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                ) : (
                  config.icon
                )}
              </div>
            </SpringScale>
            
            {/* Error Message */}
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl mb-2">
                {title || config.defaultTitle}
              </CardTitle>
              <CardDescription className="text-base">
                {description || config.defaultDescription}
              </CardDescription>
            </CardHeader>
            
            {/* Retry Information */}
            {retryCount > 0 && (
              <div className="mb-6 p-3 bg-white/50 rounded-lg border border-white/60">
                <div className="text-sm text-muted-foreground">
                  Attempt <AnimatedCounter value={retryCount} /> of {maxRetries}
                </div>
                <div className="w-full bg-white/80 rounded-full h-2 mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(retryCount / maxRetries) * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {canRetry && (
                <Button onClick={onRetry} disabled={isRetrying}>
                  {isRetrying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </>
                  )}
                </Button>
              )}
              
              {action && (
                <Button 
                  variant={canRetry ? "outline" : "default"}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              )}
              
              {secondaryAction && (
                <Button variant="ghost" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
            
            {/* Max Retries Reached */}
            {retryCount >= maxRetries && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-700">
                  Maximum retry attempts reached. Please contact support if the problem persists.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </RevealOnScroll>
    )
  }
)
ErrorState.displayName = "ErrorState"

// Toast Enhancement with Sophisticated Animations
interface EnhancedToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
}

const EnhancedToast = React.forwardRef<HTMLDivElement, EnhancedToastProps>(
  ({ id, type, title, description, duration = 5000, action, onClose }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const [progress, setProgress] = React.useState(100)
    
    React.useEffect(() => {
      // Entry animation
      setTimeout(() => setIsVisible(true), 10)
      
      // Progress countdown
      if (type !== 'loading' && duration > 0) {
        const startTime = Date.now()
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime
          const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
          setProgress(remaining)
          
          if (remaining === 0) {
            clearInterval(interval)
            handleClose()
          }
        }, 16) // ~60fps
        
        return () => clearInterval(interval)
      }
    }, [duration, type])
    
    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
    }
    
    const typeConfig = {
      success: {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        bgColor: "bg-green-50 border-green-200",
        progressColor: "bg-green-500"
      },
      error: {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        bgColor: "bg-red-50 border-red-200", 
        progressColor: "bg-red-500"
      },
      warning: {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        bgColor: "bg-yellow-50 border-yellow-200",
        progressColor: "bg-yellow-500"
      },
      info: {
        icon: <Info className="w-5 h-5 text-blue-500" />,
        bgColor: "bg-blue-50 border-blue-200",
        progressColor: "bg-blue-500"
      },
      loading: {
        icon: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
        bgColor: "bg-background border-border",
        progressColor: "bg-primary"
      }
    }
    
    const config = typeConfig[type]
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative max-w-md w-full bg-background border rounded-lg shadow-lg pointer-events-auto transition-all duration-300 ease-out",
          config.bgColor,
          isVisible 
            ? "translate-x-0 opacity-100 scale-100" 
            : "translate-x-full opacity-0 scale-95"
        )}
      >
        {/* Progress Bar */}
        {type !== 'loading' && duration > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/60 rounded-t-lg overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-75 ease-linear", config.progressColor)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex items-start p-4 gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {config.icon}
          </div>
          
          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            
            {/* Action */}
            {action && (
              <div className="mt-3">
                <Button size="sm" variant="outline" onClick={action.onClick}>
                  {action.label}
                </Button>
              </div>
            )}
          </div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }
)
EnhancedToast.displayName = "EnhancedToast"

// Offline State Component
interface OfflineStateProps extends React.HTMLAttributes<HTMLDivElement> {
  isOnline: boolean
  onRetry?: () => void
}

const OfflineState = React.forwardRef<HTMLDivElement, OfflineStateProps>(
  ({ className, isOnline, onRetry, ...props }, ref) => {
    return (
      <div 
        className={cn(
          "fixed bottom-4 left-4 right-4 z-50 transition-all duration-300",
          isOnline ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
          className
        )}
        ref={ref}
        {...props}
      >
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  You're offline
                </p>
                <p className="text-xs text-yellow-700">
                  Check your connection and try again
                </p>
              </div>
            </div>
            
            {onRetry && (
              <Button size="sm" variant="outline" onClick={onRetry}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Retry
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }
)
OfflineState.displayName = "OfflineState"

export { ErrorState, EnhancedToast, OfflineState }
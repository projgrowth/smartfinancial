import * as React from "react"
import { cn } from "@/lib/utils"

interface ShimmerLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'image'
  lines?: number
  width?: string
  height?: string
}

const ShimmerLoading = React.forwardRef<HTMLDivElement, ShimmerLoadingProps>(
  ({ className, variant = 'card', lines = 3, width, height, ...props }, ref) => {
    const baseShimmer = "animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]"
    
    const variants = {
      card: (
        <div className={cn("p-6 space-y-4", className)} {...props}>
          <div className={cn("h-6 rounded-md", baseShimmer)} />
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-4 rounded", 
                  baseShimmer,
                  i === lines - 1 ? "w-3/4" : "w-full"
                )} 
              />
            ))}
          </div>
          <div className={cn("h-10 w-24 rounded-md", baseShimmer)} />
        </div>
      ),
      text: (
        <div className={cn("space-y-2", className)} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-4 rounded", 
                baseShimmer,
                i === lines - 1 ? "w-3/4" : "w-full"
              )} 
            />
          ))}
        </div>
      ),
      avatar: (
        <div className={cn("flex items-center space-x-4", className)} {...props}>
          <div className={cn("h-12 w-12 rounded-full", baseShimmer)} />
          <div className="space-y-2 flex-1">
            <div className={cn("h-4 rounded w-3/4", baseShimmer)} />
            <div className={cn("h-3 rounded w-1/2", baseShimmer)} />
          </div>
        </div>
      ),
      button: (
        <div 
          className={cn("h-10 rounded-md", baseShimmer, className)}
          style={{ width: width || '80px', height: height || '40px' }}
          {...props}
        />
      ),
      image: (
        <div 
          className={cn("rounded-lg", baseShimmer, className)}
          style={{ 
            width: width || '100%', 
            height: height || '200px' 
          }}
          {...props}
        />
      )
    }
    
    return (
      <div ref={ref}>
        {variants[variant]}
      </div>
    )
  }
)
ShimmerLoading.displayName = "ShimmerLoading"

// Skeleton wrapper with shimmer effect
const AdvancedSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    shimmer?: boolean
  }
>(({ className, shimmer = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-muted",
        shimmer 
          ? "animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]"
          : "animate-pulse",
        className
      )}
      {...props}
    />
  )
})
AdvancedSkeleton.displayName = "AdvancedSkeleton"

// Progressive image loading component
interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lowQualitySrc?: string
  highQualitySrc: string
  alt: string
  className?: string
}

const ProgressiveImage = React.forwardRef<HTMLImageElement, ProgressiveImageProps>(
  ({ lowQualitySrc, highQualitySrc, alt, className, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentSrc, setCurrentSrc] = React.useState(lowQualitySrc || '')
    
    React.useEffect(() => {
      const img = new Image()
      img.onload = () => {
        setCurrentSrc(highQualitySrc)
        setIsLoading(false)
      }
      img.src = highQualitySrc
    }, [highQualitySrc])
    
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <AdvancedSkeleton className="w-full h-full" />
          </div>
        )}
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(
            "transition-all duration-500",
            isLoading ? "blur-sm scale-110 opacity-0" : "blur-0 scale-100 opacity-100",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
ProgressiveImage.displayName = "ProgressiveImage"

export { ShimmerLoading, AdvancedSkeleton, ProgressiveImage }
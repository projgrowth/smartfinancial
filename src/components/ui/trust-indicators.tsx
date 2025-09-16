import * as React from "react"
import { cn } from "@/lib/utils"
import { Shield, Award, Star, Users, TrendingUp, CheckCircle, Lock, Zap } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"
import { RevealOnScroll, Floating, AnimatedGradientText } from "./enhanced-animations"

// Security Badge Component
interface SecurityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
  verified?: boolean
  animateOnView?: boolean
}

const SecurityBadge = React.forwardRef<HTMLDivElement, SecurityBadgeProps>(
  ({ className, title, description, icon, verified = true, animateOnView = true, ...props }, ref) => {
    return (
      <RevealOnScroll 
        direction="scale" 
        delay={100}
        className={cn("group", className)} 
        ref={ref} 
        {...props}
      >
        <div className="relative p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
          {/* Verified Badge */}
          {verified && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon || <Shield className="w-6 h-6 text-green-600" />}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-semibold text-green-800">{title}</h3>
            <p className="text-sm text-green-700/80">{description}</p>
          </div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>
      </RevealOnScroll>
    )
  }
)
SecurityBadge.displayName = "SecurityBadge"

// Social Proof Counter
interface SocialProofCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  label: string
  icon?: React.ReactNode
  suffix?: string
  prefix?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  showPlus?: boolean
}

const SocialProofCounter = React.forwardRef<HTMLDivElement, SocialProofCounterProps>(
  ({ 
    className, 
    value, 
    label, 
    icon, 
    suffix = '', 
    prefix = '', 
    color = 'blue',
    showPlus = false,
    ...props 
  }, ref) => {
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200', 
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    }
    
    return (
      <div 
        className={cn(
          "text-center p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-105",
          colorClasses[color],
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <Floating intensity="subtle">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-white/50">
              {icon}
            </div>
          </Floating>
        )}
        
        {/* Counter */}
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={showPlus ? `${suffix}+` : suffix}
          className="text-3xl font-bold mb-2"
          duration={2000}
          separator=","
        />
        
        {/* Label */}
        <p className="text-sm font-medium opacity-80">{label}</p>
      </div>
    )
  }
)
SocialProofCounter.displayName = "SocialProofCounter"

// Trust Seal Collection
interface TrustSealProps extends React.HTMLAttributes<HTMLDivElement> {
  seals: {
    name: string
    icon: React.ReactNode
    description: string
    verified: boolean
  }[]
}

const TrustSeals = React.forwardRef<HTMLDivElement, TrustSealProps>(
  ({ className, seals, ...props }, ref) => {
    return (
      <div className={cn("space-y-6", className)} ref={ref} {...props}>
        <div className="text-center">
          <AnimatedGradientText variant="shimmer" className="text-xl font-semibold mb-2">
            Trusted & Verified
          </AnimatedGradientText>
          <p className="text-sm text-muted-foreground">
            Our commitment to security and excellence
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seals.map((seal, index) => (
            <RevealOnScroll
              key={seal.name}
              direction="up"
              delay={index * 100}
            >
              <div className="group relative p-4 bg-background border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all duration-300">
                {/* Verified indicator */}
                {seal.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
                
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
                  {seal.icon}
                </div>
                
                {/* Name */}
                <h4 className="text-xs font-medium text-center text-foreground mb-1">
                  {seal.name}
                </h4>
                
                {/* Description */}
                <p className="text-xs text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {seal.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    )
  }
)
TrustSeals.displayName = "TrustSeals"

// Testimonial Rotation with Enhanced Effects
interface TestimonialRotationProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: {
    id: string
    quote: string
    author: string
    role: string
    company?: string
    rating?: number
    image?: string
  }[]
  autoRotate?: boolean
  rotationInterval?: number
}

const TestimonialRotation = React.forwardRef<HTMLDivElement, TestimonialRotationProps>(
  ({ 
    className, 
    testimonials, 
    autoRotate = true, 
    rotationInterval = 5000,
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)
    
    // Auto rotation effect
    React.useEffect(() => {
      if (!autoRotate || isHovered) return
      
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length)
      }, rotationInterval)
      
      return () => clearInterval(interval)
    }, [autoRotate, isHovered, testimonials.length, rotationInterval])
    
    const currentTestimonial = testimonials[currentIndex]
    
    return (
      <div 
        className={cn("relative overflow-hidden", className)}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Testimonial Content */}
        <div className="relative min-h-[200px] flex items-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out",
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : index < currentIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              )}
            >
              <div className="h-full flex flex-col justify-center text-center space-y-4">
                {/* Rating Stars */}
                {testimonial.rating && (
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                
                {/* Quote */}
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted hover:bg-primary/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Progress Bar */}
        {autoRotate && !isHovered && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all ease-linear"
              style={{
                width: '100%',
                animation: `testimonial-progress ${rotationInterval}ms linear infinite`
              }}
            />
          </div>
        )}
      </div>
    )
  }
)
TestimonialRotation.displayName = "TestimonialRotation"

// Achievement Showcase
interface AchievementShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  achievements: {
    title: string
    description: string
    icon: React.ReactNode
    color?: 'gold' | 'silver' | 'bronze'
    year?: string
  }[]
}

const AchievementShowcase = React.forwardRef<HTMLDivElement, AchievementShowcaseProps>(
  ({ className, achievements, ...props }, ref) => {
    const colorClasses = {
      gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900',
      silver: 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900', 
      bronze: 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900'
    }
    
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)} ref={ref} {...props}>
        {achievements.map((achievement, index) => (
          <RevealOnScroll key={achievement.title} direction="up" delay={index * 200}>
            <div className="group relative">
              {/* Achievement Badge */}
              <div className={cn(
                "absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10",
                colorClasses[achievement.color || 'gold']
              )}>
                <Award className="w-5 h-5" />
              </div>
              
              {/* Achievement Card */}
              <div className="p-6 bg-background border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 group-hover:scale-105">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  {achievement.icon}
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                
                {/* Year */}
                {achievement.year && (
                  <div className="text-xs text-primary font-medium">
                    {achievement.year}
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    )
  }
)
AchievementShowcase.displayName = "AchievementShowcase"

export { 
  SecurityBadge, 
  SocialProofCounter, 
  TrustSeals, 
  TestimonialRotation, 
  AchievementShowcase 
}
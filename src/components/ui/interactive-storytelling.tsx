import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "./button"
import { AnimatedCounter } from "./animated-counter"
import { RevealOnScroll, SpringScale } from "./enhanced-animations"

// Interactive Before/After Comparison
interface BeforeAfterComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeData: { label: string; value: number; prefix?: string; suffix?: string }[]
  afterData: { label: string; value: number; prefix?: string; suffix?: string }[]
  title?: string
  animateOnView?: boolean
}

const BeforeAfterComparison = React.forwardRef<HTMLDivElement, BeforeAfterComparisonProps>(
  ({ className, beforeData, afterData, title, animateOnView = true, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(!animateOnView)
    
    const triggerAnimation = () => {
      setIsVisible(true)
    }
    
    return (
      <RevealOnScroll 
        direction="scale" 
        delay={100}
        className={cn("space-y-6", className)} 
        ref={ref} 
        {...props}
      >
        {title && (
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">{title}</h3>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Section */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
                <span className="text-destructive font-bold">BEFORE</span>
              </div>
              <h4 className="text-lg font-medium text-muted-foreground">Starting Point</h4>
            </div>
            
            <div className="space-y-3">
              {beforeData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  <AnimatedCounter
                    value={isVisible ? item.value : 0}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    className="text-lg font-bold text-destructive"
                    duration={1500}
                    delay={index * 200}
                    separator=","
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* After Section */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                <span className="text-green-600 font-bold">AFTER</span>
              </div>
              <h4 className="text-lg font-medium text-foreground">Results Achieved</h4>
            </div>
            
            <div className="space-y-3">
              {afterData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-700">{item.label}</span>
                  <AnimatedCounter
                    value={isVisible ? item.value : 0}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    className="text-lg font-bold text-green-600"
                    duration={1500}
                    delay={index * 200 + 500}
                    separator=","
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Impact Summary */}
        <div className="text-center pt-6 border-t border-border">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Transformation Timeline:</span>
            <AnimatedCounter
              value={isVisible ? 36 : 0}
              suffix=" months"
              className="font-semibold text-primary"
              duration={1000}
              delay={1000}
            />
          </div>
        </div>
      </RevealOnScroll>
    )
  }
)
BeforeAfterComparison.displayName = "BeforeAfterComparison"

// Interactive Timeline with Progress
interface TimelineStep {
  id: string
  title: string
  description: string
  date: string
  status: 'completed' | 'current' | 'upcoming'
  impact?: string
}

interface InteractiveTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
  currentStep?: number
  autoPlay?: boolean
  onStepChange?: (step: number) => void
}

const InteractiveTimeline = React.forwardRef<HTMLDivElement, InteractiveTimelineProps>(
  ({ className, steps, currentStep = 0, autoPlay = false, onStepChange, ...props }, ref) => {
    const [activeStep, setActiveStep] = React.useState(currentStep)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [progress, setProgress] = React.useState(0)
    
    React.useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              const nextStep = (activeStep + 1) % steps.length
              setActiveStep(nextStep)
              onStepChange?.(nextStep)
              return 0
            }
            return prev + 1
          })
        }, 50) // Update every 50ms for smooth progress
        
        return () => clearInterval(interval)
      }
    }, [isPlaying, activeStep, steps.length, onStepChange])
    
    const handleStepClick = (index: number) => {
      setActiveStep(index)
      setProgress(0)
      setIsPlaying(false)
      onStepChange?.(index)
    }
    
    const togglePlayback = () => {
      setIsPlaying(!isPlaying)
    }
    
    const resetTimeline = () => {
      setActiveStep(0)
      setProgress(0)
      setIsPlaying(false)
      onStepChange?.(0)
    }
    
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return 'bg-green-500 border-green-500'
        case 'current': return 'bg-primary border-primary'
        case 'upcoming': return 'bg-muted border-border'
        default: return 'bg-muted border-border'
      }
    }
    
    return (
      <div className={cn("relative space-y-6", className)} ref={ref} {...props}>
        {/* Timeline Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayback}
            className="w-10 h-10"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            variant="outline" 
            size="icon"
            onClick={resetTimeline}
            className="w-10 h-10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <div className="text-sm text-muted-foreground ml-4">
            Step {activeStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-75 ease-linear"
            style={{ width: `${((activeStep * 100) + progress) / steps.length}%` }}
          />
        </div>
        
        {/* Timeline Visualization */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Timeline Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <SpringScale key={step.id}>
                <div 
                  className={cn(
                    "relative flex items-start cursor-pointer transition-all duration-300",
                    index === activeStep && "scale-105"
                  )}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Indicator */}
                  <div 
                    className={cn(
                      "relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all duration-300",
                      getStatusColor(index <= activeStep ? 'completed' : 'upcoming'),
                      index === activeStep && "shadow-lg scale-110"
                    )}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Step Content */}
                  <div className="ml-6 flex-1 pb-8">
                    <div 
                      className={cn(
                        "p-4 rounded-lg border transition-all duration-300",
                        index === activeStep 
                          ? "bg-primary/5 border-primary/20 shadow-md" 
                          : "bg-background border-border hover:border-border/60"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {step.date}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      
                      {step.impact && index <= activeStep && (
                        <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700 border border-green-200">
                          <strong>Impact:</strong> {step.impact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SpringScale>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
InteractiveTimeline.displayName = "InteractiveTimeline"

// Scenario Builder Component
interface ScenarioOption {
  id: string
  label: string
  value: number
  description?: string
}

interface ScenarioBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  scenarios: {
    name: string
    options: ScenarioOption[]
  }[]
  onScenarioChange?: (selectedOptions: Record<string, number>) => void
  resultFormatter?: (results: Record<string, number>) => React.ReactNode
}

const ScenarioBuilder = React.forwardRef<HTMLDivElement, ScenarioBuilderProps>(
  ({ className, title, scenarios, onScenarioChange, resultFormatter, ...props }, ref) => {
    const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>({})
    const [results, setResults] = React.useState<Record<string, number>>({})
    
    const handleOptionChange = (scenarioName: string, optionId: string, value: number) => {
      const newSelections = { ...selectedOptions, [scenarioName]: optionId }
      const newResults = { ...results, [scenarioName]: value }
      
      setSelectedOptions(newSelections)
      setResults(newResults)
      onScenarioChange?.(newResults)
    }
    
    return (
      <div className={cn("space-y-6", className)} ref={ref} {...props}>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Adjust the parameters below to see how different scenarios affect your outcomes
          </p>
        </div>
        
        {/* Scenario Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.name} className="space-y-3">
              <h4 className="font-medium text-foreground">{scenario.name}</h4>
              <div className="space-y-2">
                {scenario.options.map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      "flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50",
                      selectedOptions[scenario.name] === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <input
                      type="radio"
                      name={scenario.name}
                      value={option.id}
                      checked={selectedOptions[scenario.name] === option.id}
                      onChange={() => handleOptionChange(scenario.name, option.id, option.value)}
                      className="sr-only"
                    />
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 mr-3",
                      selectedOptions[scenario.name] === option.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}>
                      {selectedOptions[scenario.name] === option.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Results Display */}
        {Object.keys(results).length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10">
            {resultFormatter ? (
              resultFormatter(results)
            ) : (
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-4">Projected Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(results).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <AnimatedCounter
                        value={value}
                        className="text-2xl font-bold text-primary"
                        duration={1000}
                        prefix="$"
                        separator=","
                      />
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
ScenarioBuilder.displayName = "ScenarioBuilder"

export { BeforeAfterComparison, InteractiveTimeline, ScenarioBuilder }
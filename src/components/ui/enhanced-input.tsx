import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface EnhancedInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  success?: string
  isLoading?: boolean
  floatingLabel?: boolean
  validationState?: 'idle' | 'validating' | 'success' | 'error'
  onValidate?: (value: string) => Promise<boolean> | boolean
  icon?: React.ReactNode
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    success, 
    isLoading, 
    floatingLabel = true, 
    validationState = 'idle',
    onValidate,
    icon,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const [internalValidationState, setInternalValidationState] = React.useState<'idle' | 'validating' | 'success' | 'error'>(validationState)
    
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)
    
    const handleFocus = React.useCallback(() => {
      setIsFocused(true)
    }, [])
    
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== '')
      props.onBlur?.(e)
    }, [props])
    
    const handleChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setHasValue(value !== '')
      
      if (onValidate && value) {
        setInternalValidationState('validating')
        try {
          const isValid = await onValidate(value)
          setInternalValidationState(isValid ? 'success' : 'error')
        } catch {
          setInternalValidationState('error')
        }
      } else if (!value) {
        setInternalValidationState('idle')
      }
      
      props.onChange?.(e)
    }, [onValidate, props])
    
    const currentState = validationState !== 'idle' ? validationState : internalValidationState
    const shouldShowLabel = floatingLabel && (isFocused || hasValue || props.value)
    
    const getValidationIcon = () => {
      switch (currentState) {
        case 'validating':
          return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        case 'success':
          return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'error':
          return <AlertCircle className="w-4 h-4 text-destructive" />
        default:
          return icon
      }
    }
    
    const inputClasses = cn(
      "flex h-12 w-full rounded-lg border bg-background px-4 py-3 text-base transition-all duration-300 ring-offset-background",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      "placeholder:text-muted-foreground/60 placeholder:transition-opacity placeholder:duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "hover:border-primary/50 hover:shadow-sm",
      currentState === 'error' && "border-destructive focus-visible:ring-destructive",
      currentState === 'success' && "border-green-500 focus-visible:ring-green-500",
      currentState === 'validating' && "border-primary animate-pulse",
      floatingLabel && "placeholder:opacity-0 focus:placeholder:opacity-100",
      (icon || getValidationIcon()) && "pr-10",
      className
    )
    
    return (
      <div className="relative space-y-1">
        {/* Floating Label */}
        {floatingLabel && label && (
          <label 
            className={cn(
              "absolute left-4 text-muted-foreground transition-all duration-300 pointer-events-none z-10",
              shouldShowLabel 
                ? "top-2 text-xs font-medium bg-background px-1 -translate-y-1/2" 
                : "top-1/2 text-base -translate-y-1/2"
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        
        {/* Regular Label */}
        {!floatingLabel && label && (
          <label 
            className="block text-sm font-medium text-foreground mb-2"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          <input
            type={type}
            className={inputClasses}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {/* Icon */}
          {(icon || getValidationIcon()) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {getValidationIcon()}
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && currentState === 'error' && (
          <p className="text-sm text-destructive animate-slide-in-right flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
        
        {/* Success Message */}
        {success && currentState === 'success' && (
          <p className="text-sm text-green-600 animate-slide-in-right flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {success}
          </p>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        )}
      </div>
    )
  }
)
EnhancedInput.displayName = "EnhancedInput"

// Auto-complete enhanced input
interface AutoCompleteInputProps extends EnhancedInputProps {
  suggestions?: string[]
  onSuggestionSelect?: (suggestion: string) => void
  filterSuggestions?: boolean
}

const AutoCompleteInput = React.forwardRef<HTMLInputElement, AutoCompleteInputProps>(
  ({ 
    suggestions = [], 
    onSuggestionSelect, 
    filterSuggestions = true,
    className,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [filteredSuggestions, setFilteredSuggestions] = React.useState(suggestions)
    const [activeIndex, setActiveIndex] = React.useState(-1)
    
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      
      if (filterSuggestions) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredSuggestions(filtered)
        setIsOpen(filtered.length > 0 && value.length > 0)
      } else {
        setIsOpen(suggestions.length > 0 && value.length > 0)
      }
      
      setActiveIndex(-1)
      props.onChange?.(e)
    }, [suggestions, filterSuggestions, props])
    
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex(prev => (prev + 1) % filteredSuggestions.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex(prev => prev <= 0 ? filteredSuggestions.length - 1 : prev - 1)
          break
        case 'Enter':
          e.preventDefault()
          if (activeIndex >= 0) {
            onSuggestionSelect?.(filteredSuggestions[activeIndex])
            setIsOpen(false)
          }
          break
        case 'Escape':
          setIsOpen(false)
          setActiveIndex(-1)
          break
      }
    }, [isOpen, activeIndex, filteredSuggestions, onSuggestionSelect])
    
    return (
      <div className="relative">
        <EnhancedInput
          ref={ref}
          className={className}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          {...props}
        />
        
        {/* Suggestions Dropdown */}
        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto animate-slide-in-right">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
                  index === activeIndex && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  onSuggestionSelect?.(suggestion)
                  setIsOpen(false)
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
AutoCompleteInput.displayName = "AutoCompleteInput"

export { EnhancedInput, AutoCompleteInput }
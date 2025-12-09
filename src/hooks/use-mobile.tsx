import * as React from "react"

const MOBILE_BREAKPOINT = 768 // Unified with design system

// SSR-safe initial state detection
const getInitialState = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function useIsMobile() {
  // Initialize with actual value to prevent hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean>(getInitialState)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Debounced handler to prevent excessive re-renders
    let timeoutId: NodeJS.Timeout
    const onChange = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, 100)
    }
    
    mql.addEventListener("change", onChange)
    return () => {
      clearTimeout(timeoutId)
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}

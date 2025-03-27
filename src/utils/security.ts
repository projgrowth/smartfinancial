
/**
 * Security utility functions for client-side validation and protection
 */

// Simple email validation regex
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Simple phone number validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Sanitize user input to prevent XSS
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Generate a secure nonce for CSP
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Check password strength
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  let feedback = '';

  if (password.length < 8) {
    feedback = 'Password is too short';
    return { score, feedback };
  }

  // Check for various character types
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Length bonus
  if (password.length > 12) score += 1;

  // Provide feedback based on score
  switch (score) {
    case 0:
    case 1:
      feedback = 'Very weak password';
      break;
    case 2:
      feedback = 'Could be stronger';
      break;
    case 3:
      feedback = 'Pretty good password';
      break;
    case 4:
      feedback = 'Strong password';
      break;
    case 5:
      feedback = 'Very strong password';
      break;
    default:
      feedback = 'Invalid password';
  }

  return { score, feedback };
};

// Rate limit for form submissions (to prevent brute force)
export class RateLimiter {
  private attempts: Record<string, { count: number; timestamp: number }> = {};
  private maxAttempts: number;
  private timeWindow: number; // in milliseconds

  constructor(maxAttempts = 5, timeWindowInSeconds = 60) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindowInSeconds * 1000;
  }

  canAttempt(actionKey: string): boolean {
    const now = Date.now();
    const record = this.attempts[actionKey];

    if (!record) {
      this.attempts[actionKey] = { count: 1, timestamp: now };
      return true;
    }

    // Reset if time window passed
    if (now - record.timestamp > this.timeWindow) {
      this.attempts[actionKey] = { count: 1, timestamp: now };
      return true;
    }

    // Increment and check
    if (record.count < this.maxAttempts) {
      record.count += 1;
      return true;
    }

    return false;
  }

  // Get remaining time in seconds before rate limit resets
  remainingTimeInSeconds(actionKey: string): number {
    const record = this.attempts[actionKey];
    if (!record) return 0;

    const now = Date.now();
    const elapsed = now - record.timestamp;
    const remaining = Math.max(0, this.timeWindow - elapsed);
    
    return Math.ceil(remaining / 1000);
  }
}

// Export a singleton rate limiter instance
export const formRateLimiter = new RateLimiter();

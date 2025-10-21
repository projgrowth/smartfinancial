/**
 * Environment-gated logging utility
 * Logs to console in development, silent in production
 * Optionally integrate with error tracking service (Sentry, LogRocket, etc.)
 */

const isDev = import.meta.env.MODE === 'development';

export const log = (...args: any[]) => {
  if (isDev) console.log(...args);
};

export const warn = (...args: any[]) => {
  if (isDev) console.warn(...args);
  // TODO: Integrate with error tracking service if needed
  // e.g., Sentry.captureMessage(args[0], 'warning');
};

export const error = (...args: any[]) => {
  if (isDev) console.error(...args);
  // TODO: Integrate with error tracking service
  // e.g., Sentry.captureException(args[0]);
};

export const info = (...args: any[]) => {
  if (isDev) console.info(...args);
};

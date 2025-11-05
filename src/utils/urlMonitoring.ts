import { log, warn, error } from './logger';

// URL Monitoring Utility for detecting redirect issues on iOS
export const initUrlMonitoring = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  const originalUrl = window.location.href;
  const expectedDomain = 'thesmartfinancialplan.com';
  const referrer = document.referrer;
  const host = window.location.hostname.toLowerCase();

  // Allow local/dev and preview environments (same logic as enforceCanonicalDomain)
  const allowHosts = [
    'localhost',
    '127.0.0.1',
  ];
  const isAllowed =
    allowHosts.includes(host) ||
    host.endsWith('.lovableproject.com');

  // Enhanced domain check with immediate redirect if wrong domain (but respect dev environments)
  if (!isAllowed && !window.location.hostname.includes(expectedDomain)) {
    warn('CRITICAL: Wrong domain detected on page load:', {
      current: window.location.hostname,
      expected: expectedDomain,
      fullUrl: window.location.href,
      referrer: referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    // If this came from a Google search, log it specifically
    if (referrer.includes('google.com')) {
      error('GOOGLE SEARCH REDIRECT ISSUE: Search result led to wrong domain!', {
        searchReferrer: referrer,
        wrongDomain: window.location.hostname,
        expectedDomain: expectedDomain
      });
    }

    // Immediate redirect to correct domain
    const correctUrl = `https://${expectedDomain}${window.location.pathname}${window.location.search}${window.location.hash}`;
    log('Redirecting to correct domain:', correctUrl);
    window.location.replace(correctUrl);
    return; // Don't set up monitoring if we're redirecting
  }

  // Helper to detect URL change type
  const getUrlChangeType = (oldUrl: string, newUrl: string): 'hash' | 'query' | 'path' | 'domain' | 'none' => {
    try {
      const old = new URL(oldUrl);
      const current = new URL(newUrl);
      
      if (old.hostname !== current.hostname) return 'domain';
      if (old.pathname !== current.pathname) return 'path';
      if (old.search !== current.search) return 'query';
      if (old.hash !== current.hash) return 'hash';
      return 'none';
    } catch {
      return 'none';
    }
  };

  // Monitor for unexpected redirects
  let redirectCount = 0;
  const maxRedirects = 3;

  const checkUrl = () => {
    const currentUrlWithoutHash = window.location.href.split('#')[0];
    const originalUrlWithoutHash = originalUrl.split('#')[0];
    
    const changeType = getUrlChangeType(originalUrl, window.location.href);
    
    // Only flag if the base URL changed AND it's a wrong domain (ignore hash-only changes)
    if (currentUrlWithoutHash !== originalUrlWithoutHash && 
        !window.location.href.includes(expectedDomain) &&
        !isAllowed) {
      redirectCount++;
      warn('Unexpected redirect detected:', {
        from: originalUrl,
        to: window.location.href,
        count: redirectCount,
        changeType: changeType
      });
      
      if (redirectCount >= maxRedirects) {
        error('Multiple unexpected redirects detected. Possible DNS/domain issue.');
      }
    }
  };

  // Check for redirects on popstate (back/forward navigation)
  window.addEventListener('popstate', checkUrl);
  
  // Log hash navigation (expected behavior)
  window.addEventListener('hashchange', (e) => {
    log('Hash navigation (expected):', {
      from: e.oldURL,
      to: e.newURL
    });
  });

  // Log successful page load with correct domain
  if (window.location.hostname.includes(expectedDomain)) {
    log('Page loaded successfully on correct domain:', window.location.href);
  }
};

// Enhanced clipboard URL detection for iOS
export const monitorClipboardUrls = () => {
  if (typeof window === 'undefined') return;

  // Monitor copy events to log what URL is being copied
  document.addEventListener('copy', (event) => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.includes('http')) {
      log('URL copied to clipboard:', selection);
    }
    
    // Log the current page URL being copied
    log('Current page URL when copy occurred:', window.location.href);
  });

  // Monitor when the page becomes visible (iOS app switching detection)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      log('Page became visible, current URL:', window.location.href);
    }
  });
};

// Enforce canonical domain at runtime (helps if iOS uses og:url/canonical when sharing)
export const enforceCanonicalDomain = (canonicalHost: string = 'thesmartfinancialplan.com') => {
  if (typeof window === 'undefined') return;

  const host = window.location.hostname.toLowerCase();

  // Allow local/dev and preview environments
  const allowHosts = [
    'localhost',
    '127.0.0.1',
  ];
  const isAllowed =
    allowHosts.includes(host) ||
    host.endsWith('.lovableproject.com');

  if (isAllowed) return;

  const isCanonical =
    host === canonicalHost ||
    host.endsWith(`.${canonicalHost}`);

  const knownAliases = new Set([
    'smartfinancialplan.com',
    'www.smartfinancialplan.com',
    'smartfinancialplanning.com',
    'www.smartfinancialplanning.com',
  ]);

  if (!isCanonical && (knownAliases.has(host) || !host.includes(canonicalHost))) {
    const target = `https://${canonicalHost}${window.location.pathname}${window.location.search}${window.location.hash}`;
    // Use replace to avoid back button returning to wrong host
    window.location.replace(target);
  }
};

// Enhanced security monitoring
export const initSecurityMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Monitor for CSP violations
  document.addEventListener('securitypolicyviolation', (e) => {
    warn('CSP Violation detected:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      disposition: e.disposition
    });
    
    // Could send to analytics/logging service
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'security_violation', {
        event_category: 'Security',
        event_label: e.violatedDirective,
        value: 1
      });
    }
  });

  // Monitor for potential security redirects
  let previousUrl = window.location.href;
  const checkForSuspiciousRedirects = () => {
    const currentUrl = window.location.href;
    if (currentUrl !== previousUrl) {
      const currentHost = new URL(currentUrl).hostname;
      const previousHost = new URL(previousUrl).hostname;
      
      if (currentHost !== previousHost && !currentHost.includes('thesmartfinancialplan.com')) {
        warn('Potential security redirect detected:', {
          from: previousHost,
          to: currentHost,
          timestamp: new Date().toISOString()
        });
      }
      previousUrl = currentUrl;
    }
  };

  // Check every 2 seconds for URL changes
  setInterval(checkForSuspiciousRedirects, 2000);

  // Monitor for JavaScript errors that might indicate security issues
  window.addEventListener('error', (e) => {
    if (e.message.includes('CSP') || e.message.includes('blocked') || e.message.includes('security')) {
      warn('Potential security-related error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        timestamp: new Date().toISOString()
      });
    }
  });
};
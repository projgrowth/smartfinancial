// URL Monitoring Utility for detecting redirect issues on iOS
export const initUrlMonitoring = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  const originalUrl = window.location.href;
  const expectedDomain = 'smartfinancialplanning.com';

  // Check if we're on the expected domain
  if (!window.location.hostname.includes(expectedDomain)) {
    console.warn('Domain mismatch detected:', {
      current: window.location.hostname,
      expected: expectedDomain,
      fullUrl: window.location.href
    });
  }

  // Monitor for unexpected redirects
  let redirectCount = 0;
  const maxRedirects = 3;

  const checkUrl = () => {
    if (window.location.href !== originalUrl && !window.location.href.includes(expectedDomain)) {
      redirectCount++;
      console.warn('Unexpected redirect detected:', {
        from: originalUrl,
        to: window.location.href,
        count: redirectCount
      });
      
      if (redirectCount >= maxRedirects) {
        console.error('Multiple unexpected redirects detected. Possible DNS/domain issue.');
      }
    }
  };

  // Check for redirects on popstate (back/forward navigation)
  window.addEventListener('popstate', checkUrl);
  
  // Check periodically for URL changes
  setInterval(checkUrl, 5000);

  // Log successful page load with correct domain
  if (window.location.hostname.includes(expectedDomain)) {
    console.log('Page loaded successfully on correct domain:', window.location.href);
  }
};

// Enhanced clipboard URL detection for iOS
export const monitorClipboardUrls = () => {
  if (typeof window === 'undefined') return;

  // Monitor copy events to log what URL is being copied
  document.addEventListener('copy', (event) => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.includes('http')) {
      console.log('URL copied to clipboard:', selection);
    }
    
    // Log the current page URL being copied
    console.log('Current page URL when copy occurred:', window.location.href);
  });

  // Monitor when the page becomes visible (iOS app switching detection)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('Page became visible, current URL:', window.location.href);
    }
  });
};

// Enforce canonical domain at runtime (helps if iOS uses og:url/canonical when sharing)
export const enforceCanonicalDomain = (canonicalHost: string = 'smartfinancialplanning.com') => {
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
    'thesmartfinancialplan.com',
    'www.thesmartfinancialplan.com',
  ]);

  if (!isCanonical && (knownAliases.has(host) || !host.includes(canonicalHost))) {
    const target = `https://${canonicalHost}${window.location.pathname}${window.location.search}${window.location.hash}`;
    // Use replace to avoid back button returning to wrong host
    window.location.replace(target);
  }
};
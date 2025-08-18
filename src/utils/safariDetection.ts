interface SafariInfo {
  isSafari: boolean;
  isIOS: boolean;
  isMobile: boolean;
  version: number | null;
  supportsScrollBehavior: boolean;
  supportsIntersectionObserver: boolean;
}

let cachedSafariInfo: SafariInfo | null = null;

export function detectSafari(): SafariInfo {
  if (cachedSafariInfo) return cachedSafariInfo;

  const userAgent = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobile = /iPhone|iPod/.test(userAgent) || 
    (isIOS && window.screen.width <= 768);

  // Extract Safari version
  let version: number | null = null;
  if (isSafari || isIOS) {
    const versionMatch = userAgent.match(/Version\/(\d+)/);
    version = versionMatch ? parseInt(versionMatch[1], 10) : null;
  }

  const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
  const supportsIntersectionObserver = 'IntersectionObserver' in window;

  cachedSafariInfo = {
    isSafari,
    isIOS,
    isMobile,
    version,
    supportsScrollBehavior,
    supportsIntersectionObserver
  };

  return cachedSafariInfo;
}

export function isSafariMobile(): boolean {
  const { isSafari, isMobile, isIOS } = detectSafari();
  return (isSafari && isMobile) || isIOS;
}

export function needsSafariScrollFixes(): boolean {
  const { isIOS, version } = detectSafari();
  return isIOS || (version !== null && version < 16);
}

export function supportsSmoothScrolling(): boolean {
  return detectSafari().supportsScrollBehavior;
}

export function addSafariClasses(): void {
  const { isSafari, isIOS, isMobile } = detectSafari();
  const root = document.documentElement;
  
  if (isSafari) root.classList.add('is-safari');
  if (isIOS) root.classList.add('is-ios');
  if (isMobile) root.classList.add('is-mobile');
  if (isSafariMobile()) root.classList.add('is-safari-mobile');
}
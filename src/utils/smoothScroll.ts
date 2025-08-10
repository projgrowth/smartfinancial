
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const navH = parseFloat(cs.getPropertyValue('--nav-h')) || parseFloat(cs.getPropertyValue('--nav-h-initial')) || 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navH;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

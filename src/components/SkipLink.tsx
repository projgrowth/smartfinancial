import React from 'react';

const SkipLink: React.FC = () => {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipClick}
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] rounded-md bg-primary text-primary-foreground px-4 py-3 font-medium shadow-lg ring-4 ring-ring transition-all duration-200 focus:outline-none hover:bg-primary/90"
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;

import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded-md bg-primary text-primary-foreground px-3 py-2 shadow ring-2 ring-ring"
    >
      Skip to content
    </a>
  );
};

export default SkipLink;

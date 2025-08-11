
import React from 'react';
import EnhancedNewsletter from './EnhancedNewsletter';
import NewsletterSignup from './NewsletterSignup';

// Unified Newsletter component that can render either the enhanced multi-step
// experience or the simple compact signup used in the footer and sidebars.

type SimpleVariantProps = {
  variant?: 'simple';
} & React.ComponentProps<typeof NewsletterSignup>;

type EnhancedVariantProps = {
  variant: 'enhanced';
};

export type NewsletterProps = SimpleVariantProps | EnhancedVariantProps;

const Newsletter: React.FC<NewsletterProps> = (props) => {
  if ('variant' in props && props.variant === 'enhanced') {
    return <EnhancedNewsletter />;
  }

  const { variant: _variant, ...rest } = props as SimpleVariantProps;
  return <NewsletterSignup {...rest} />;
};

export default Newsletter;

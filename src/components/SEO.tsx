import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  imageUrl,
  noindex,
  jsonLd,
}) => {
  const computedCanonical =
    canonicalUrl || (typeof window !== 'undefined' ? window.location.href : undefined);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {computedCanonical && <link rel="canonical" href={computedCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {computedCanonical && <meta property="og:url" content={computedCanonical} />} 
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data */}
      {jsonLd && (
        Array.isArray(jsonLd) ? (
          jsonLd.map((data, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )
      )}
    </Helmet>
  );
};

export default SEO;

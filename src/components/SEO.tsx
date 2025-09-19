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
    canonicalUrl || (typeof window !== 'undefined' ? `https://thesmartfinancialplan.com${window.location.pathname}` : undefined);

  const computedOrigin = 'https://thesmartfinancialplan.com';
  const defaultImagePath = '/lovable-uploads/144559fd-7765-4c3f-8256-fbde965750ab.png';
  const computedImage = imageUrl || `${computedOrigin}${defaultImagePath}`;
  const siteName = 'Smart Financial Planning';
  const imageAlt = 'Smart Financial Planning logo with bull silhouette';

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {computedCanonical && <link rel="canonical" href={computedCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {computedCanonical && <meta property="og:url" content={computedCanonical} />} 
      {computedImage && <meta property="og:image" content={computedImage} />}
      {computedImage && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {computedImage && <meta name="twitter:image" content={computedImage} />} 
      {computedImage && <meta name="twitter:image:alt" content={imageAlt} />}

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

import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteTitle = "Frédérick Ahobaut";
  const defaultDescription = "🚀 Développeur Full Stack expert en React.js, Node.js, MongoDB et TypeScript. Création d'applications web modernes et performantes.";
  const defaultKeywords = "Frédérick Ahobaut, développeur full stack, React, Node.js, MongoDB, TypeScript, portfolio, développement web";
  const defaultImage = "https://moncv-dev.web.app/og-image.png";
  const siteUrl = "https://moncv-dev.web.app";

  const finalTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Développeur Full Stack`;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const finalUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEO;

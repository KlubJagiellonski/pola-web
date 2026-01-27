import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

interface ISEOMetadata {
  pageTitle: string;
  lang?: string;
  meta?: any[];
  description?: string;
  image?: string;
  pathname?: string;
  keywords?: string[];
}

const SEOMetadata: React.FC<ISEOMetadata> = ({
  image = '',
  pageTitle,
  description = '',
  lang = 'pl',
  meta = [],
  pathname = '',
  keywords = [],
}) => {
  const { site, allFile } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
      allFile(filter: { name: { eq: "background3" }, ext: { eq: ".jpg" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const siteTitle = site.siteMetadata.title || 'Pola';
  const fullTitle = `${pageTitle} | ${siteTitle}`;
  const metaImage = image || `${site.siteMetadata.siteUrl}${allFile.edges[0].node.publicURL}`;
  const canonicalUrl = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;

  const defaultKeywords = [
    'polskie produkty',
    'polskie firmy',
    'kod EAN',
    'sprawdz czy produkt jest polski',
    'Pola aplikacja',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={fullTitle}
      titleTemplate={`%s`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        allKeywords.length > 0
          ? {
              name: 'keywords',
              content: allKeywords.join(', '),
            }
          : {},
        {
          property: 'og:title',
          content: fullTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: siteTitle,
        },
        {
          property: 'og:url',
          content: canonicalUrl,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:site',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: fullTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
      ]
        .filter(Boolean as any)
        .concat(meta)}
      link={[
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
      ]}
    />
  );
};

export default SEOMetadata;

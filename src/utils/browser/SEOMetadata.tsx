import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface ISEOMetadata {
  pageTitle: string;
  lang?: string;
  meta?: any[];
  description?: string;
  image?: string;
}

/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
const SEOMetadata: React.FC<ISEOMetadata> = ({ image = '', pageTitle, description = '', lang = 'en', meta = [] }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const browserTabTitle = `${pageTitle} | Pola Web`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={browserTabTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: 'test',
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
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: browserTabTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'og:image',
          content: 'https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg',
        },
        {
          name: 'twitter:image',
          content: 'https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg',
        },
      ].concat(meta)}
    />
  );
};

export default SEOMetadata;

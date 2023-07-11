import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

interface ISEOMetadata {
  pageTitle: string;
  lang?: string;
  meta?: any[];
  description?: string;
  image?: string;
}

const SEOMetadata: React.FC<ISEOMetadata> = ({ image = '', pageTitle, description = '', lang = 'en', meta = [] }) => {
  const { site, allFile } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        allFile(filter: {name: {eq: "background2"}, ext: {eq: ".jpg"}}) {
          edges {
            node {
              publicURL
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const browserTabTitle = `${pageTitle} | Pola Web`;
  const metaImage = image ? image : `${site.siteMetadata.siteUrl}${allFile.edges[0].node.publicURL}`

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
          content: pageTitle,
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
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
        {
          name: 'og:image:width',
          content: '1200',
        },
      ].concat(meta)}
    />
  );
};

export default SEOMetadata;

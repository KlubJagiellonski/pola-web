import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

import { IResponsiveImage, renderFromQuery } from './render-image';

export const ArticleImage: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "article-images" } }) {
          nodes {
            extension
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    `}
    render={(data) => renderFromQuery(data, imageSrc, title)}
  />
);

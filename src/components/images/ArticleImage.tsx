import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

import { IResponsiveImage, renderFromQuery } from './render-image';

export const ArticleImage: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
          filter: {
            sourceInstanceName: { eq: "article-images" }
            childrenImageSharp: { elemMatch: { gatsbyImageData: { ne: "null" } } }
          }
        ) {
          nodes {
            extension
            relativePath
            childImageSharp {
              fluid {
                src
              }
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    `}
    render={(data) => renderFromQuery(data.images.nodes, imageSrc, title)}
  />
);

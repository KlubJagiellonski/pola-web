import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

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
            name
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

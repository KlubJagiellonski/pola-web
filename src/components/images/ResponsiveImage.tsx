import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

import { IResponsiveImage, renderFromQuery } from './render-image';

export const FriendImage: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "asset-images" } }) {
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

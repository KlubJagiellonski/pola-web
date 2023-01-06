import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export const FriendLogo: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "friend-images" } }) {
          nodes {
            extension
            relativePath
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    `}
    render={(data) => renderFromQuery(data.images.nodes, imageSrc, title)}
  />
);

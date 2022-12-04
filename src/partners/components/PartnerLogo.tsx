import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export const PartnerLogo: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "partner-images" } }) {
          nodes {
            extension
            relativePath
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    `}
    render={(data) => renderFromQuery(data.images.nodes, imageSrc, title)}
  />
);

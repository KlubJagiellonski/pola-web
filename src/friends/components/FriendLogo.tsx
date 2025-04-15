import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export const FriendLogo: React.FC<IResponsiveImage> = ({ imageSrc, title }) => (
  <StaticQuery
    query={graphql`
    query {
      images: allContentfulAsset {
        nodes {
          title
          name: filename
          relativePath: url
          url
          id
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
    `}
    render={(data) => {
      const images = data.images.nodes.map((node: any) => ({
        name: node.name,
        relativePath: node.relativePath,
        childImageSharp: {
          gatsbyImageData: node.gatsbyImageData,
          id: node.id,
        },
      }));
      return (
        <>
          {renderFromQuery(images, imageSrc, title)}
          </>
      );
  }}
  />
);

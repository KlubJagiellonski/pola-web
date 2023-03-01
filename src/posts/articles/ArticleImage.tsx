import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';
import styled from 'styled-components';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export type ArticleStyles = {
  fullSize?: boolean;
};

const ArticleCoverWrapper = styled.div<ArticleStyles>`
  .gatsby-image-wrapper {
    height: ${(p) => (p.fullSize ? undefined : '16em')};
  }
`;

export const ArticleImage: React.FC<ArticleStyles & IResponsiveImage> = ({ imageSrc, title, fullSize }) => (
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
        <ArticleCoverWrapper className="article-cover" fullSize={fullSize}>
          {renderFromQuery(images, imageSrc, title)}
        </ArticleCoverWrapper>
      );
    }}
  />
);

import { IResponsiveImage, renderFromQuery } from '../../components/images/render-image';
import styled from 'styled-components';

import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

export type ArticleStyles = {
  fullSize?: boolean;
};

const ArticleCoverWrapper = styled.div<ArticleStyles>`
  width: 100%;
  max-width: 700px;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: auto !important;
    object-fit: contain !important;
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
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 1200
              quality: 85
              formats: [AUTO, WEBP]
            )
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

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
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    `}
    render={(data) => (
      <ArticleCoverWrapper className="article-cover" fullSize={fullSize}>
        {renderFromQuery(data.images.nodes, imageSrc, title)}
      </ArticleCoverWrapper>
    )}
  />
);

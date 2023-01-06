import { graphql } from 'gatsby';
import React from 'react';

import ArticlePage from '../posts/articles/ArticlePage';

interface IArticleTemplate {
  data: any;
  pageContext: any;
}

export const ArticleTemplate: React.FC<IArticleTemplate> = ({ data, pageContext }) => (
  <ArticlePage article={data.post} pageContext={pageContext} />
);

export default ArticleTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        category
        cover {
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
  }
`;

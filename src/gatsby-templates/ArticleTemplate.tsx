import {graphql, PageProps} from 'gatsby';
import * as React from 'react';

import ArticlePage from 'posts/articles/ArticlePage';

export type IArticleTemplate = PageProps<any>;

const Testowa: React.FC<IArticleTemplate> = ({ data }) => {
  return <ArticlePage article={data.post} />;
};

export const postQuery = graphql`
  query MyQuery($slug: String!) {
    post: contentfulPosts(slug: { eq: $slug }) {
      category
      cover {
        url
      }
      html {
        raw
        references {
          ... on ContentfulAsset {
            url
            contentful_id
            title
          }
        }
      }
      title
      subTitle
      date
    }
  }
`;

export default Testowa;

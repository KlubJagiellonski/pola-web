import { graphql, useStaticQuery } from 'gatsby';

export interface IArticlesSuccess {
  results: IArticleData[];
}

export interface IArticlesError {
  error: unknown;
}

interface IArticleData {
  id: number;
  title: string;
  text: string;
  date: string;
  photo: string;
}

export const ArticleService = {
  getAll: () =>
    useStaticQuery(
      graphql`
        {
          allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//posts//" } }, limit: 1000) {
            edges {
              node {
                id
                wordCount {
                  paragraphs
                  sentences
                  words
                }
                fields {
                  prefix
                  slug
                }
                frontmatter {
                  title
                  subTitle
                  category
                  cover {
                    extension
                    name
                    childImageSharp {
                      id
                      fixed {
                        src
                        originalName
                        width
                        height
                      }
                      fluid {
                        originalName
                        src
                        presentationWidth
                        presentationHeight
                        aspectRatio
                      }
                    }
                    relativePath
                  }
                }
              }
            }
          }
        }
      `
    ),
};

export interface IArticleEdge {
  node: IArticleNode;
}

export interface IArticleNode {
  id: string;
  wordCount: {
    paragraphs: number;
    sentences: number;
    words: number;
  };
  fields: {
    prefix: string;
    slug: string;
  };
  frontmatter: {
    title: string;
    subTitle: string;
    category: string;
    cover: {
      extension: string;
      name: string;
      childImageSharp: {
        id: string;
        fixed: {
          src: string;
          width: number;
          height: number;
        };
        fluid: {
          src: string;
          presentationWidth: number;
          presentationHeight: number;
          aspectRatio: number;
        };
      };
      relativePath: string;
    };
  };
}

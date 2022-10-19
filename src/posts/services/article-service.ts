import { graphql, useStaticQuery } from 'gatsby';

import { ArticleData } from '@Domain/articles';

export const ArticleService = {
  getAll: () =>
    useStaticQuery(
      graphql`
        {
          allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//posts//" } }, limit: 1000) {
            nodes {
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
      `
    ),
};

export interface IArticlesTwoColumns {
  first: ArticleData;
  second?: ArticleData;
}

export function getArticlesTwoColumns(articles: ArtArticleDataicle[]) {
  const sortedArticles: IArticlesTwoColumns[] = [];
  let section: IArticlesTwoColumns[] = [];

  for (let i = 0; i < articles.length; i = i + 2) {
    if (articles[i + 1] !== undefined) {
      section.push({ first: articles[i], second: articles[i + 1] });
    } else {
      section.push({ first: articles[i] });
    }

    if (section.length === 3 || i + 2 >= articles.length) {
      sortedArticles.push(section.slice());
      section = [];
    }
  }

  return sortedArticles;
}

export function getVisibleArticles(actualArticleId: string, articles: ArticleData[]) {
  let art = articles.slice();
  for (let i = 0; i < art.length; i++) {
    if (art[i].id === actualArticleId) {
      art.splice(i, 1);
    }
  }
  if (art.length > 3) {
    art = art.slice(0, 3);
  }

  return art;
}

export function getTagsList(articles: ArticleData[]) {
  const cat: string[] = articles
    .filter((el: ArticleData) => !!el.tag)
    .map((el: ArticleData) => {
      return el.tag;
    })
    .sort();
  const unique = new Set(cat);
  return Array.from(unique);
}

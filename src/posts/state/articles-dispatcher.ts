import { IArticleEdge } from 'posts/services/article-service';
import { Dispatch } from 'redux';

import { ArticleData } from '@Domain/articles';
import { IPolaState } from '@State/types';

import * as actions from './articles-actions';

export const articlesDispatcher = {
  loadArticles: (edges: IArticleEdge[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = edges.reduce((articles: ArticleData[], edge: IArticleEdge) => {
      const article = {
        id: edge.node.id,
        title: edge.node.frontmatter.title,
        subTitle: edge.node.frontmatter.subTitle,
        slug: edge.node.fields.slug,
        date: edge.node.fields.prefix,
        imagePath: edge.node.frontmatter.cover.relativePath,
        tag: edge.node.frontmatter.category,
      };
      return [...articles, article];
    }, []);

    await dispatch(actions.LoadArticles(articles));
  },
};

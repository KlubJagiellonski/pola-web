import { Dispatch } from 'redux';

import { Article } from '@Domain/articles';
import { IArticleEdge } from '@Domain/articles/article-service';

import { IPolaState } from '../types';
import * as actions from './articles-actions';

export const articlesDispatcher = {
  loadArticles: (edges: IArticleEdge[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = edges.reduce((articles: Article[], edge: IArticleEdge) => {
      const article = new Article(edge.node);
      return [...articles, article];
    }, []);

    await dispatch(actions.LoadArticles(articles));
  },
};

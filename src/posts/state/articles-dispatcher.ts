import { Dispatch } from 'redux';

import { mapArticlesToDataModel } from '@Domain/articles';
import { IPolaState } from '@State/types';

import { IArticleNode } from 'posts/services/article-service';

import { loadArticles } from './articles-reducer';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = mapArticlesToDataModel(gatsbyNodes);

    await dispatch(loadArticles(articles));
  },
};

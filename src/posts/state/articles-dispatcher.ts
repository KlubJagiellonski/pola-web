import { Dispatch } from 'redux';

import { mapArticlesToDataModel } from '@Domain/articles';
import { IPolaState } from '@State/types';

import { loadArticles } from './articles-reducer';
import { IArticleNode } from 'domain/articles';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = mapArticlesToDataModel(gatsbyNodes);

    await dispatch(loadArticles(articles));
  },
};

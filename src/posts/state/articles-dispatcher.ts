import { mapArticlesToDataModel } from 'posts';
import { IArticleNode } from 'posts';
import { Dispatch } from 'redux';

import { IPolaState } from '@State/types';

import { loadArticles } from './articles-reducer';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = mapArticlesToDataModel(gatsbyNodes);

    await dispatch(loadArticles(articles));
  },
};

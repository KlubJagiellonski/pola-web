import { IArticle } from '@Domain/articles';
import { IAction } from '@State/types';

export const actionTypes = {
  LOAD_ARTICLES: 'ARTICLES:LOAD',
};

export const LoadArticles = (articles: IArticle[]): IAction => ({
  type: actionTypes.LOAD_ARTICLES,
  payload: {
    articles,
  },
});

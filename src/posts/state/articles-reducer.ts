import { AnyAction, Reducer } from 'redux';

import { IArticle } from '@Domain/articles';

import { IAction, IActionReducer } from '../types';
import { actionTypes } from './articles-actions';
import * as actions from './articles-actions';

export interface IArticlesState {
  initialized: boolean;
  data?: IArticle[];
}

const initialState: IArticlesState = {
  initialized: false,
};

const reducers: IActionReducer<IArticlesState> = {
  [actionTypes.LOAD_ARTICLES]: (
    state: IArticlesState = initialState,
    action: ReturnType<typeof actions.LoadArticles>
  ) => {
    return {
      ...state,
      initialized: true,
      data: action.payload.articles,
    };
  },
};

export const articlesReducer: Reducer<IArticlesState, AnyAction> = (
  state: IArticlesState = initialState,
  action: IAction
) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

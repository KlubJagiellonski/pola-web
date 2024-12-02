import { ErrorHandler } from '../../app/api-errors';
import { AnyAction, Reducer } from 'redux';
import { IProductData } from 'search';

import { IAction, IActionReducer } from 'app/state';

import { actionTypes } from './search-actions';
import * as actions from './search-actions';

export interface ISearchResultPage {
  pageIndex: number;
  products: IProductData[];
}

export const checkLoaded = (state: SearchStateName) => state === SearchStateName.LOADED;

export enum SearchStateName {
  INITIAL = 'initial',
  LOADING = 'loading',
  LOADED = 'loaded',
  RESULTS_END = 'results_end',
  ERROR = 'error',
}

export type SearchState =
  | {
      stateName: SearchStateName.INITIAL;
    }
  | {
      stateName: SearchStateName.LOADING;
      phrase: string;
    }
  | {
      stateName: SearchStateName.LOADED;
      phrase: string;
      nextPageToken: string;
      resultPages: ISearchResultPage[];
      totalItems: number;
    }
  | {
      stateName: SearchStateName.RESULTS_END;
      phrase: string;
      resultPages: ISearchResultPage[];
      totalItems: number;
    }
  | {
      stateName: SearchStateName.ERROR;
      phrase?: string;
      nextPageToken?: string;
      resultPages?: ISearchResultPage[];
      totalItems?: number;
      error: ErrorHandler;
    };

const initialState: SearchState = {
  stateName: SearchStateName.INITIAL,
};

const reducers: IActionReducer<SearchState> = {
  [actionTypes.INVOKE_SEARCH]: (state: SearchState = initialState, action: ReturnType<typeof actions.InvokeSearch>) => {
    return {
      ...state,
      stateName: SearchStateName.LOADING,
      phrase: action.payload.phrase,
      pageToken: undefined,
      nextPageToken: undefined,
    };
  },

  [actionTypes.LOAD_RESULTS]: (state: SearchState = initialState, action: ReturnType<typeof actions.LoadResults>) => {
    if (state.stateName === SearchStateName.LOADING) {
      return {
        ...state,
        stateName: SearchStateName.LOADED,
        nextPageToken: action.payload.token,
        totalItems: action.payload.totalItems,
        resultPages: [
          {
            pageIndex: 1,
            products: action.payload.pageProducts,
          },
        ],
      };
    }

    return state;
  },

  [actionTypes.LOAD_NEXT_PAGE]: (
    state: SearchState = initialState,
    action: ReturnType<typeof actions.LoadNextPage>
  ) => {
    if (state.stateName === SearchStateName.LOADED) {
      return {
        ...state,
        stateName: SearchStateName.LOADED,
        resultPages: [
          ...state.resultPages,
          {
            pageIndex: state.resultPages.length + 1,
            products: action.payload.pageProducts,
          },
        ],
        nextPageToken: action.payload.token,
      };
    }

    return state;
  },

  [actionTypes.LOAD_LAST_PAGE]: (
    state: SearchState = initialState,
    action: ReturnType<typeof actions.LoadLastPage>
  ) => {
    if (state.stateName === SearchStateName.LOADED) {
      return {
        ...state,
        stateName: SearchStateName.RESULTS_END,
        resultPages: [
          ...state.resultPages,
          {
            pageIndex: state.resultPages.length + 1,
            products: action.payload.pageProducts,
          },
        ],
      };
    }

    return state;
  },

  [actionTypes.CLEAR_RESULTS]: (state: SearchState = initialState) => {
    return initialState;
  },

  [actionTypes.SEARCH_FAILED]: (state: SearchState = initialState, action: ReturnType<typeof actions.SearchFailed>) => {
    return {
      ...state,
      stateName: SearchStateName.ERROR,
      error: action.payload.error,
    };
  },
};

export const searchReducer: Reducer<SearchState, AnyAction> = (state: SearchState = initialState, action: IAction) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

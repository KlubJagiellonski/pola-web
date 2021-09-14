import { AnyAction, Reducer } from 'redux';
import { actionTypes } from './search-actions';
import * as actions from './search-actions';
import { IAction, IActionReducer } from '../types';
import { IProductData, IProductEAN } from '../../domain/products';

export interface ISearchResultPage {
  pageIndex: number;
  products: IProductData[];
}

export enum SearchStateName {
  INITIAL = 'initial',
  LOADING = 'loading',
  LOADED = 'loaded',
  SELECTED = 'selected',
}

export type SearchState =
  | {
      stateName: SearchStateName.INITIAL;
      resultPages: ISearchResultPage[];
    }
  | {
      stateName: SearchStateName.LOADING;
      phrase: string;
      resultPages: ISearchResultPage[];
      error?: unknown;
    }
  | {
      stateName: SearchStateName.LOADED;
      phrase: string;
      nextPageToken?: string;
      resultPages: ISearchResultPage[];
      error?: unknown;
    }
  | {
      stateName: SearchStateName.SELECTED;
      phrase: string;
      nextPageToken?: string;
      resultPages: ISearchResultPage[];
      selectedProduct: IProductEAN;
      error?: unknown;
    };

const initialState: SearchState = {
  stateName: SearchStateName.INITIAL,
  resultPages: [],
};

const reducers: IActionReducer<SearchState> = {
  [actionTypes.INVOKE_SEARCH]: (state: SearchState = initialState, action: ReturnType<typeof actions.InvokePhrase>) => {
    return {
      ...state,
      stateName: SearchStateName.LOADING,
      phrase: action.payload.phrase,
      pageToken: undefined,
      nextPageToken: undefined,
    };
  },

  [actionTypes.LOAD_RESULTS]: (state: SearchState = initialState, action: ReturnType<typeof actions.LoadResults>) => {
    return {
      ...state,
      stateName: SearchStateName.LOADED,
      phrase: action.payload.phrase,
      nextPageToken: action.payload.token,
      resultPages: [
        ...state.resultPages,
        {
          pageIndex: state.resultPages.length + 1,
          products: action.payload.products,
        },
      ],
    };
  },

  [actionTypes.CLEAR_RESULTS]: (state: SearchState = initialState, action: ReturnType<typeof actions.ClearResults>) => {
    return initialState;
  },

  [actionTypes.SEARCH_FAILED]: (state: SearchState = initialState, action: ReturnType<typeof actions.SearchFailed>) => {
    return {
      ...state,
      error: action.payload.error,
    };
  },

  [actionTypes.SHOW_PRODUCT_DETAILS]: (
    state: SearchState = initialState,
    action: ReturnType<typeof actions.ShowProductDetails>
  ) => {
    return {
      ...state,
      stateName: SearchStateName.SELECTED,
      selectedProduct: action.payload.product,
    };
  },

  [actionTypes.UNSELECT_PRODUCT]: (
    state: SearchState = initialState,
    action: ReturnType<typeof actions.ShowProductDetails>
  ) => {
    return {
      ...state,
      stateName: SearchStateName.LOADED,
      selectedProduct: undefined,
    };
  },
};

export const searchReducer: Reducer<SearchState, AnyAction> = (state: SearchState = initialState, action: IAction) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

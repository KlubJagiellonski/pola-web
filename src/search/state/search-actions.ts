import { ErrorHandler } from '../../app/api-errors';
import { IAction } from '../types';
import { IProductData, Product } from 'search';

export const actionTypes = {
  INVOKE_SEARCH: 'SEARCH:INVOKE_SEARCH',
  LOAD_RESULTS: 'SEARCH:LOAD_RESULTS',
  LOAD_NEXT_PAGE: 'SEARCH:LOAD_NEXT_PAGE',
  LOAD_LAST_PAGE: 'SEARCH:LOAD_LAST_PAGE',
  CLEAR_RESULTS: 'SEARCH:CLEAR_RESULTS',
  SEARCH_FAILED: 'SEARCH:SEARCH_FAILED',
  SHOW_PRODUCT_DETAILS: 'SEARCH:SHOW_PRODUCT_DETAILS',
  UNSELECT_PRODUCT: 'SEARCH:UNSELECT_PRODUCT',
};

export const InvokeSearch = (phrase: string): IAction => ({
  type: actionTypes.INVOKE_SEARCH,
  payload: {
    phrase,
  },
});

export const LoadResults = (pageProducts: IProductData[], totalItems: number, token?: string | null): IAction => ({
  type: actionTypes.LOAD_RESULTS,
  payload: {
    pageProducts,
    totalItems,
    token,
  },
});

export const LoadNextPage = (phrase: string, pageProducts: IProductData[], token?: string | null): IAction => ({
  type: actionTypes.LOAD_NEXT_PAGE,
  payload: {
    phrase,
    pageProducts,
    token,
  },
});

export const LoadLastPage = (phrase: string, pageProducts: IProductData[]): IAction => ({
  type: actionTypes.LOAD_LAST_PAGE,
  payload: {
    phrase,
    pageProducts,
  },
});

export const ClearResults = (): IAction => ({
  type: actionTypes.CLEAR_RESULTS,
});

export const SearchFailed = (error: ErrorHandler): IAction => ({
  type: actionTypes.SEARCH_FAILED,
  payload: {
    error,
  },
});

export const ShowProductDetails = (product: Product): IAction => ({
  type: actionTypes.SHOW_PRODUCT_DETAILS,
  payload: {
    product,
  },
});

export const UnselectProduct = (): IAction => ({
  type: actionTypes.UNSELECT_PRODUCT,
});

import { IProduct } from '../../domain/products';
import { IAction } from '../types';

export const actionTypes = {
  INVOKE_SEARCH: 'SEARCH:INVOKE_SEARCH',
  LOAD_RESULTS: 'SEARCH:LOAD_RESULTS',
  SEARCH_FAILED: 'SEARCH:SEARCH_FAILED',
};

export const InvokePhrase = (phrase: string): IAction => ({
  type: actionTypes.INVOKE_SEARCH,
  payload: {
    phrase,
  },
});

export const LoadResults = (products: IProduct[]): IAction => ({
  type: actionTypes.LOAD_RESULTS,
  payload: {
    products,
  },
});

export const SearchFailed = (error: unknown): IAction => ({
  type: actionTypes.SEARCH_FAILED,
  payload: {
    error,
  },
});

import { EmptyResponseDataError, ErrorHandler } from '../../app/api-errors';
import { ProductService } from '../services/search-service';
import { Dispatch } from 'redux';

import { IPolaState } from '@State/types';

import { isNotEmpty } from '@Utils/strings';

import * as actions from './search-actions';
import { SearchStateName } from './search-reducer';

export const searchDispatcher = {
  /**
   * Gets first page of results for specified phrase.
   * Used by Home page.
   * @param phrase Text from search input.
   */
  invokeSearch: (phrase: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      if (!isNotEmpty(phrase)) {
        throw new Error('search phrase is empty');
      }

      const {
        search: { stateName },
      } = getState();

      if (stateName !== SearchStateName.LOADING) {
        if (stateName !== SearchStateName.INITIAL) {
          await dispatch(actions.ClearResults());
        }
        await dispatch(actions.InvokeSearch(phrase));

        const service = ProductService.getInstance();
        const response = await service.searchProducts(phrase);
        const { products, totalItems, nextPageToken } = response;
        await dispatch(actions.LoadResults(products, totalItems, nextPageToken));
      }
    } catch (error: unknown) {
      if (error instanceof ErrorHandler) {
        console.error('[Product search error]:', error);
        await dispatch(actions.SearchFailed(error));
      } else {
        console.error('[Unhandled error]:', error);
        throw error;
      }
    }
  },

  /**
   * Loads next page of results for phrase stored in the reducer.
   * Used by Products list page.
   */
  invokeLoadMore: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { search } = getState();

      if (search.stateName === SearchStateName.LOADED) {
        const { phrase, nextPageToken } = search;
        const service = ProductService.getInstance();
        const response = await service.searchProducts(phrase, nextPageToken);

        const isLastPage = search.nextPageToken !== null && response?.nextPageToken === null;
        if (isLastPage) {
          await dispatch(actions.LoadLastPage(phrase, response.products));
        }
        if (response) {
          await dispatch(actions.LoadNextPage(phrase, response.products, response.nextPageToken));
        } else {
          throw new EmptyResponseDataError('EAN Product');
        }
      }
    } catch (error: unknown) {
      if (error instanceof ErrorHandler) {
        console.error('[Product search error]:', error);
        await dispatch(actions.SearchFailed(error));
      } else {
        console.error('[Unhandled error]:', error);
        throw error;
      }
    }
  },

  /**
   * Set search reducer to its initial state.
   * No products loaded, no search phrase stored.
   */
  clearResults: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      dispatch(actions.ClearResults());
    } catch (error: unknown) {
      if (error instanceof ErrorHandler) {
        console.error('[Search clearing error]:', error);
        await dispatch(actions.SearchFailed(error));
      } else {
        console.error('[Unhandled error]:', error);
        throw error;
      }
    }
  },
};

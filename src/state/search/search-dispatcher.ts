import { Dispatch } from 'redux';
import { EAN, IProductData, IProductEAN, Product } from '../../domain/products';
import { ProductEANService } from '../../domain/products/ean-service';
import { ProductService } from '../../domain/products/search-service';
import { IPolaState } from '../types';
import * as actions from './search-actions';
import { SearchState, SearchStateName } from './search-reducer';

export const searchDispatcher = {
  invokeSearch: (phrase: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      dispatch(actions.ClearResults());
      await dispatch(actions.InvokePhrase(phrase));
      const service = ProductService.getInstance();
      const response = await service.searchProducts(phrase);

      if (response) {
        const { products, totalItems, nextPageToken } = response;

        await dispatch(actions.LoadResults(phrase, products, totalItems, nextPageToken));
      } else {
        throw new Error('Search response is empty');
      }
    } catch (error) {
      console.error('cannot search', error);
      await dispatch(actions.SearchFailed(error));
    }
  },

  invokeLoadMore: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { search } = getState();
      if (search.stateName === SearchStateName.LOADED) {
        await dispatch(actions.InvokePhrase(search.phrase));
        const service = ProductService.getInstance();
        const response = await service.searchProducts(search.phrase, search.nextPageToken);

        if (response) {
          const { products } = response;

          await dispatch(actions.LoadNextPage(search.phrase, products));
        } else {
          throw new Error('Search response is empty');
        }
      }
    } catch (error) {
      console.error('cannot load more products', error);
      await dispatch(actions.SearchFailed(error));
    }
  },

  clearResults: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      dispatch(actions.ClearResults());
    } catch (error) {
      console.error('cannot clear results', error);
      await dispatch(actions.SearchFailed(error));
    }
  },

  selectProduct: (EANCode: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { search } = getState();
      if (search.stateName === SearchStateName.LOADED) {
        const service = ProductEANService.getInstance();
        const productEntityEAN: IProductEAN = await service.getProduct(EANCode);
        const prod = findProduct(productEntityEAN.code, search);
        if (prod) {
          const product = new Product(prod.name, productEntityEAN);
          await dispatch(actions.ShowProductDetails(product));
        } else {
          throw new Error('Cannot find product');
        }
      }
    } catch (error) {
      console.error('cannot select product', error);
      await dispatch(actions.SearchFailed(error));
    }
  },

  unselectProduct: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { search } = getState();
      if (search.stateName === SearchStateName.SELECTED) {
        await dispatch(actions.UnselectProduct());
      }
    } catch (error) {
      console.error('cannot unselect product', error);
      await dispatch(actions.SearchFailed(error));
    }
  },
};

const findProduct = (selectedCode: EAN, state: SearchState): IProductData | void => {
  let product: IProductData | undefined;
  if (state.stateName === SearchStateName.LOADED) {
    for (const page of state.resultPages) {
      const data = page.products.find((p) => p.code === selectedCode);
      if (data) {
        product = data;
        break;
      }
    }

    return product;
  }
};

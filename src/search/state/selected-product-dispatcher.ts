import { ErrorHandler } from '../../app/api-errors';
import { ProductEANService } from '../services/ean-service';
import { Dispatch } from 'redux';
import { EAN, IProductEAN, Product } from 'search';

import { navigate } from 'gatsby';

import { IPolaState } from '@State/types';

import { markSelectionFailed, selectProduct, unselectProduct } from './selected-product-reducer';

export const selectedProductDispatcher = {
  /**
   * Stores which product from retrieved search results is selected.
   * Loads detailed product data from EAN service.
   * @param code EAN code of selected product
   */
  selectProduct: (code: EAN) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { location } = getState().app; // Assuming location is stored in the app state

      const service = ProductEANService.getInstance();
      const productEntityEAN: IProductEAN = await service.getProduct(code);
      const product = new Product(productEntityEAN.name, productEntityEAN);

      window.history.replaceState(null, '', `${location.pathname}?ean=${code}`);

      await dispatch(selectProduct(product));
    } catch (error: unknown) {
      if (error instanceof ErrorHandler) {
        console.error('[Selected product error]:', error);
        await dispatch(markSelectionFailed(error));
      } else {
        console.error('[Unhandled error]:', error);
        throw error;
      }
    }
  },

  /**
   * Clears selected product data.
   */
  unselectProduct: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const { selectedProduct } = getState();

      if (selectedProduct.product) {
        await dispatch(unselectProduct());
      }
    } catch (error: unknown) {
      if (error instanceof ErrorHandler) {
        console.error('[Selected product error]:', error);
        await dispatch(markSelectionFailed(error));
      } else {
        console.error('[Unhandled error]:', error);
        throw error;
      }
    }
  },
};

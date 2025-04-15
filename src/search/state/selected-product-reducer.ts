import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from 'search';

import { ErrorHandler } from '@App/api-errors';

export interface ISelectedProductState {
  product?: Product;
  error?: ErrorHandler;
}

const initialState: ISelectedProductState = {};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    unselectProduct: (state) => {
      state.product = undefined;
    },
    markSelectionFailed: (state, action: PayloadAction<ErrorHandler>) => {
      state.product = undefined;
      state.error = action.payload;
    },
  },
});

export const { selectProduct, unselectProduct, markSelectionFailed } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;

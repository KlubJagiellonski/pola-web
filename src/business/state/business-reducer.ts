import { IBusinessData } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface IBusinessState {
  initialized: boolean;
  data: IBusinessData[];
}

const initialState: IBusinessState = {
  initialized: false,
  data: [],
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    loadServices: (state, action) => {
      state.initialized = true;
      state.data = action.payload;
    },
  },
});

export const { loadServices } = businessSlice.actions;
export default businessSlice.reducer;

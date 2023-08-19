import { IPartnerData } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface IPartnersState {
  initialized: boolean;
  data: IPartnerData[];
}

const initialState: IPartnersState = {
  initialized: false,
  data: [],
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    loadPartners: (state, action) => {
      state.initialized = true;
      state.data = action.payload;
    },
  },
});

export const { loadPartners } = partnersSlice.actions;
export default partnersSlice.reducer;

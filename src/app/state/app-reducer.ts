import { createSlice } from '@reduxjs/toolkit';
import { PageType } from 'app/website';

import { AppSettings } from '../app-settings';

export interface IAppState {
  initialized: boolean;
  location?: Location;
  activePage: PageType;
  isMenuExpanded: boolean;
  isSearchInfoVisible: boolean;
  flags: any;
}

const initialState: IAppState = {
  initialized: false,
  activePage: PageType.HOME,
  isMenuExpanded: false,
  isSearchInfoVisible: false,
  flags: AppSettings,
};

const applicationSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: (state: IAppState) => {
      state.initialized = true;
    },
    loadBrowserLocation: (state: IAppState, action) => {
      state.location = action.payload;
    },
    selectActivePage: (state: IAppState, action) => {
      state.activePage = action.payload;
    },
    expandMenu: (state: IAppState, action) => {
      state.isMenuExpanded = action.payload;
    },
    toggleSearchInfo: (state: IAppState) => {
      state.isSearchInfoVisible = !state.isSearchInfoVisible;
    },
  },
});

export const { initializeApp, loadBrowserLocation, selectActivePage, expandMenu, toggleSearchInfo } =
  applicationSlice.actions;
export default applicationSlice.reducer;

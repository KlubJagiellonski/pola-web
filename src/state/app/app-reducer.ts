import { AnyAction, Reducer } from 'redux';

import { PageType } from '@Domain/website';

import { AppSettings } from '../app-settings';
import { IAction, IActionReducer } from '../types';
import { actionTypes } from './app-actions';
import * as actions from './app-actions';

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

const reducers: IActionReducer<IAppState> = {
  [actionTypes.INITIALIZE]: (state: IAppState = initialState, action: ReturnType<typeof actions.Initialize>) => {
    return {
      ...state,
      initialized: true,
    };
  },

  [actionTypes.LOAD_BROWSER_LOCATION]: (
    state: IAppState = initialState,
    action: ReturnType<typeof actions.LoadBrowserLocation>
  ) => {
    return {
      ...state,
      location: action.payload.location,
    };
  },

  [actionTypes.SELECT_ACTIVE_PAGE]: (
    state: IAppState = initialState,
    action: ReturnType<typeof actions.SelectActivePage>
  ) => {
    return {
      ...state,
      activePage: action.payload.type,
    };
  },

  [actionTypes.EXPAND_MENU]: (state: IAppState = initialState, action: ReturnType<typeof actions.ExpandMenu>) => {
    return {
      ...state,
      isMenuExpanded: action.payload.expanded,
    };
  },

  [actionTypes.TOGGLE_SEARCH_INFO]: (
    state: IAppState = initialState,
    action: ReturnType<typeof actions.ToggleSearchInfo>
  ) => {
    return {
      ...state,
      isSearchInfoVisible: !state.isSearchInfoVisible,
    };
  },
};

export const appReducer: Reducer<IAppState, AnyAction> = (state: IAppState = initialState, action: IAction) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

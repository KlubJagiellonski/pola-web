import { PageType } from 'app/website';
import { Dispatch } from 'redux';

import { IPolaState } from '.';
import * as searchActions from '../../search/state/search-actions';
import { SearchStateName } from '../../search/state/search-reducer';
import { expandMenu, initializeApp, loadBrowserLocation, selectActivePage, toggleSearchInfo } from './app-reducer';

// import * as actions from './app-actions';

export const appDispatcher = {
  initialize: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    await dispatch(initializeApp());
  },

  loadBrowserLocation: (location: Location) => async (dispatch: any, getState: () => IPolaState) => {
    await dispatch(loadBrowserLocation(location));
  },

  selectActivePage: (type: PageType) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const { search } = getState();
    if (search.stateName === SearchStateName.LOADED) {
      await dispatch(searchActions.ClearResults());
    }
    await dispatch(selectActivePage(type));
  },

  expandMenu: (expanded: boolean) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    await dispatch(expandMenu(expanded));
  },

  /**
   * Toggles visibility of search info modal.
   *
   * [EXPLANATION]: inside app dispatcher as this operation is valid for all search states
   */
  toggleSearchInfo: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    await dispatch(toggleSearchInfo());
  },
};

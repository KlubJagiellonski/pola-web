import { IPolaState } from '.';
import { Dispatch } from 'redux';

import { PageType } from 'app/website';

import { IBrowserLocation } from '@Utils/browser/location';

import * as searchActions from '../../search/state/search-actions';
import { SearchStateName } from '../../search/state/search-reducer';

import { expandMenu, initializeApp, loadBrowserLocation, selectActivePage, toggleSearchInfo } from './app-reducer';

export const appDispatcher = {
  initialize: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    await dispatch(initializeApp());
  },

  loadBrowserLocation: (location: Location) => async (dispatch: any, getState: () => IPolaState) => {
    const locationParams: IBrowserLocation = {
      hash: location.hash,
      search: location.search,
      host: location.host,
      hostname: location.hostname,
      href: location.href,
      origin: location.origin,
      pathname: location.pathname,
      port: location.port,
      protocol: location.protocol,
    };
    await dispatch(loadBrowserLocation(locationParams));
  },

  selectActivePage: (type: PageType) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const { search } = getState();
    if (search.stateName === SearchStateName.LOADED && type !== PageType.PRODUCTS) {
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

import { configureStore } from '@reduxjs/toolkit';
import partnersReducer, { IPartnersState } from 'partners/state/partners-reducer';
import { AnyAction, Reducer } from 'redux';

import friendsSlice, { IFriendsState } from '../../friends/state/friends-reducer';
import { ISubscribeState, newsletterReducer } from '../../newsletter/state/newsletter-reducer';
import articlesReducer, { IArticlesState } from '../../posts/state/articles-reducer';
import { SearchState, searchReducer } from '../../search/state/search-reducer';

import appReducer, { IAppState } from './app-reducer';

export interface IPolaState {
  app: IAppState;
  search: SearchState;
  newsletter: ISubscribeState;
  articles: IArticlesState;
  friends: IFriendsState;
  partners: IPartnersState;
}

export interface IAction extends AnyAction {
  type: string;
  payload?: any;
  meta?: any;
}

export interface IActionReducer<TState> {
  [actionName: string]: Reducer<TState, IAction>;
}

export type Validator<T> = (value: T) => string | undefined;

const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    newsletter: newsletterReducer,
    articles: articlesReducer,
    friends: friendsSlice,
    partners: partnersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default (preloadedState: IPolaState) => {
  return store;
};

import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';

import friendsSlice, { IFriendsState } from '../../friends/state/friends-reducer';
import { ISubscribeState, newsletterReducer } from '../../newsletter/state/newsletter-reducer';
import articlesReducer, { IArticlesState } from '../../posts/state/articles-reducer';
import { SearchState, searchReducer } from '../../search/state/search-reducer';
import { ISuppliersState, suppliersReducer } from '../../suppliers/state/suppliers-reducer';
import appReducer, { IAppState } from './app-reducer';

export interface IPolaState {
  app: IAppState;
  search: SearchState;
  newsletter: ISubscribeState;
  articles: IArticlesState;
  friends: IFriendsState;
  suppliers: ISuppliersState;
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
    suppliers: suppliersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

// export default store;

// function withPayloadType<T>() {
//   return (t: T) => ({ payload: t });
// }
// createAction('test', withPayloadType<string>());

export default (preloadedState: IPolaState) => {
  return store;
};

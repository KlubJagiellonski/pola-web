import { AnyAction, Reducer } from 'redux';

import { IFriendsState } from '../friends/state/friends-reducer';
import { ISubscribeState } from '../newsletter/state/newsletter-reducer';
import { IArticlesState } from '../posts/state/articles-reducer';
import { IAppState } from './app/app-reducer';
import { SearchState } from './search/search-reducer';

export interface IPolaState {
  app: IAppState;
  search: SearchState;
  newsletter: ISubscribeState;
  articles: IArticlesState;
  friends: IFriendsState;
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

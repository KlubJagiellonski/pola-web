import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { IPolaState } from './types';
import { appReducer } from './app/app-reducer';
import { searchReducer } from './search/search-reducer';
import { articlesReducer } from './articles/articles-reducer';
import { friendsReducer } from './friends/friends-reducer';

const reducers = combineReducers({
  app: appReducer,
  search: searchReducer,
  articles: articlesReducer,
  friends: friendsReducer,
});

export default (preloadedState: IPolaState) => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

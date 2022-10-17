import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { IPolaState } from './types';
import { appReducer } from './app/app-reducer';
import { searchReducer } from './search/search-reducer';
import { articlesReducer } from '../posts/state/articles-reducer';
import { friendsReducer } from '../friends/state/friends-reducer';
import { newsletterReducer } from '../newsletter/state/newsletter-reducer';

const reducers = combineReducers({
  app: appReducer,
  search: searchReducer,
  newsletter: newsletterReducer,
  articles: articlesReducer,
  friends: friendsReducer,
});

export default (preloadedState: IPolaState) => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

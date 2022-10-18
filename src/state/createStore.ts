import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { friendsReducer } from '../friends/state/friends-reducer';
import { newsletterReducer } from '../newsletter/state/newsletter-reducer';
import { articlesReducer } from '../posts/state/articles-reducer';
import { appReducer } from './app/app-reducer';
import { searchReducer } from './search/search-reducer';
import { IPolaState } from './types';

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

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { IPolaState } from './types';
import { appReducer } from './app/app-reducer';
import { searchReducer } from './search/search-reducer';
import { articlesReducer } from './articles/articles-reducer';
import { friendsReducer } from './friends/friends-reducer';
import { newsletterReducer } from '../newsletter/state/newsletter-reducer';
import { suppliersReducer } from 'suppliers/state/suppliers-reducer';

const reducers = combineReducers({
  app: appReducer,
  search: searchReducer,
  newsletter: newsletterReducer,
  articles: articlesReducer,
  friends: friendsReducer,
  suppliers: suppliersReducer,
});

export default (preloadedState: IPolaState) => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

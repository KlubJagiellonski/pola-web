import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import friendsSlice from '../friends/state/friends-reducer';
import { newsletterReducer } from '../newsletter/state/newsletter-reducer';
import articlesReducer from '../posts/state/articles-reducer';
import { searchReducer } from '../search/state/search-reducer';
import { IAppState, appReducer } from './app/app-reducer';
import { IPolaState } from './types';

// ...
const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    // createReducer({}, (builder) => {
    //   builder.addCase('X', (state: IAppState, action) => {
    //     state.initialized = true;
    //   });
    // }),
    newsletter: createReducer({}, (builder) => {
      builder.addCase('X', (state: IAppState, action) => {
        state.initialized = true;
      });
    }),
    articles: articlesReducer,
    friends: friendsSlice,
    // newsletter: newsletterReducer,
    // articles: articlesReducer,
    // friends: friendsReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         // Ignore these action types
  //         ignoredActions: ['friends/loadFriends'],
  //         //   // Ignore these field paths in all actions
  //         //   ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
  //         //   // Ignore these paths in the state
  //         //   ignoredPaths: ['items.dates'],
  //       },
  //     }),
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

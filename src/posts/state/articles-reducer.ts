import { createSlice } from '@reduxjs/toolkit';
import { ArticleData } from 'posts';

export interface IArticlesState {
  initialized: boolean;
  data?: ArticleData[];
}

const initialState: IArticlesState = {
  initialized: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    loadArticles: (state, action) => {
      state.initialized = true;
      state.data = action.payload;
    },
  },
});

export const { loadArticles } = articlesSlice.actions;
export default articlesSlice.reducer;

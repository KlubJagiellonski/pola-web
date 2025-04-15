import { createSlice } from '@reduxjs/toolkit';
import { IArticleData } from 'posts';

export interface IArticlesState {
  initialized: boolean;
  data: IArticleData[];
}

const initialState: IArticlesState = {
  initialized: false,
  data: [],
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

import { createSlice } from '@reduxjs/toolkit';

import { FFriend } from '@Domain/friends';

export interface IFriendsState {
  initialized: boolean;
  data: FFriend[];
}

const initialState: IFriendsState = {
  initialized: false,
  data: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    loadFriends: (state, action) => {
      state.initialized = true;
      state.data = action.payload;
    },
  },
});

export const { loadFriends } = friendsSlice.actions;
export default friendsSlice.reducer;

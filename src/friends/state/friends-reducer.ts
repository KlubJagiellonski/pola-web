import { createSlice } from '@reduxjs/toolkit';

import { FriendData } from '@Domain/friends';

export interface IFriendsState {
  initialized: boolean;
  data: FriendData[];
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

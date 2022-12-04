import { createSlice } from '@reduxjs/toolkit';
import { IFriendData } from 'friends';

export interface IFriendsState {
  initialized: boolean;
  data: IFriendData[];
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

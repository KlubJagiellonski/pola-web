import { Dispatch } from 'redux';

import { Friend } from '@Domain/friends';

import { IFriendNode } from '../../friends/services/friend-service';
import { IPolaState } from '../types';
import * as actions from './friends-actions';

export const friendsDispatcher = {
  // loadFriends: (nodes: IFriendNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
  //   const friendsData = await FriendsService.getFriends();
  //   const friends = friendsData.results.map((data) => new Friend(data.description, data.photo));
  loadFriends: (nodes: IFriendNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const friends = nodes.map((data) => new Friend(data));

    await dispatch(actions.LoadFriends(friends));
  },
};

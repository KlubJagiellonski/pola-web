import { Dispatch } from 'redux';

import { Friend, IFriendNode } from '@Domain/friends';
import { IPolaState } from '@State/types';

import { loadFriends } from './friends-reducer';

export const friendsDispatcher = {
  loadFriends: (gatsbyNodes: IFriendNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const friends = gatsbyNodes.map((node) => Friend.fromNode(node)).map((friend) => friend.toDataModel());

    await dispatch(loadFriends(friends));
  },
};

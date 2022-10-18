import { Dispatch } from 'redux';

import { Friend, IFriendNode } from '@Domain/friends';
import { IPolaState } from '@State/types';

//import { IFriendNode } from '../../friends/services/friend-service';
import { loadFriends } from './friends-reducer';

//import * as actions from './friends-actions';

export const friendsDispatcher = {
  // loadFriends: (nodes: IFriendNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
  //   const friendsData = await FriendsService.getFriends();
  //   const friends = friendsData.results.map((data) => new Friend(data.description, data.photo));
  loadFriends: (nodes: IFriendNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const friends = nodes.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image.base,
      description: data.description,
      page: data.page,
      slug: data.slug,
    }));

    await dispatch(loadFriends(friends));
  },
};

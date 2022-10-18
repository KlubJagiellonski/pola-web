import { IFriend } from '@Domain/friends';
import { IAction } from '@State/types';

export const actionTypes = {
  LOAD_FRIENDS: 'FRIENDS:LOAD',
};

export const LoadFriends = (friends: IFriend[]): IAction => ({
  type: actionTypes.LOAD_FRIENDS,
  payload: {
    friends,
  },
});

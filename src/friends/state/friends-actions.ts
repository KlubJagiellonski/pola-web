import { IFriend } from '../../domain/friends';
import { IAction } from '../../state/types';

export const actionTypes = {
  LOAD_FRIENDS: 'FRIENDS:LOAD',
};

export const LoadFriends = (friends: IFriend[]): IAction => ({
  type: actionTypes.LOAD_FRIENDS,
  payload: {
    friends,
  },
});

import { Follower } from '../../domain/newsletter';
import { IAction } from '../types';

export const actionTypes = {
  SUBSCRIBE: 'NEWSLETTER:SUBSCRIBE',
};

export const Subscribe = (follower: Follower): IAction => ({
  type: actionTypes.SUBSCRIBE,
  payload: {
    follower,
  },
});

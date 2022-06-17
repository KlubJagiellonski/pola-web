import { Follower, ISubscriptionResponseContext } from '..';
import { IAction } from '../../state/types';

export const actionTypes = {
  SUBSCRIPTION_REQUESTED: 'NEWSLETTER:SUBSCRIPTION_REQUESTED',
  SUBSCRIPTION_SUCCESS: 'NEWSLETTER:SUBSCRIPTION_SUCCESS',
  SUBSCRIPTION_FAILURE: 'NEWSLETTER:SUBSCRIPTION_FAILURE',
  SUBSCRIPTION_CLEARED: 'NEWSLETTER:SUBSCRIPTION_CLEARED',
};

export const SubscriptionRequested = (follower: Follower): IAction => ({
  type: actionTypes.SUBSCRIPTION_REQUESTED,
  payload: {
    follower,
  },
});

export const SubscriptionSuccess = (follower: Follower, context: ISubscriptionResponseContext): IAction => ({
  type: actionTypes.SUBSCRIPTION_SUCCESS,
  payload: {
    follower,
    context,
  },
});

export const SubscriptionFailure = (follower: Follower, error: Error): IAction => ({
  type: actionTypes.SUBSCRIPTION_FAILURE,
  payload: {
    follower,
    error,
  },
});

export const SubscriptionCleared = (): IAction => ({
  type: actionTypes.SUBSCRIPTION_CLEARED,
});

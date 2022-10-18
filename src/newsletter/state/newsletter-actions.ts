import { IAction } from '@State/types';

import { Follower, NewsletterApiResponseContext } from '..';

export const actionTypes = {
  SUBSCRIBING: 'NEWSLETTER:SUBSCRIBING',
  SUBSCRIPTION_SUCCESS: 'NEWSLETTER:SUBSCRIPTION_SUCCESS',
  SUBSCRIPTION_FAILURE: 'NEWSLETTER:SUBSCRIPTION_FAILURE',
};

export const Subscribing = (follower: Follower): IAction => ({
  type: actionTypes.SUBSCRIBING,
  payload: {
    follower,
  },
});

export const SubscriptionSuccess = (follower: Follower, context: NewsletterApiResponseContext): IAction => ({
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

import { ISubscriptionResponseContext } from 'newsletter/services/subscription-response-context';
import { Follower } from '..';
import { IAction } from '../../state/types';

export const actionTypes = {
  REQUEST_SUBSCRIPTION: 'NEWSLETTER:REQUEST_SUBSCRIPTION',
  REGISTER_SUBSCRIPTION: 'NEWSLETTER:REGISTER_SUBSCRIPTION',
  NOTICE_REPEATED_SUBSCRIPTION: 'NEWSLETTER:NOTICE_REPEATED_SUBSCRIPTION',
  REJECT_SUBSCRIPTION: 'NEWSLETTER:REJECT_SUBSCRIPTION',
  CLEAR_SUBSCRIPTION_DATA: 'NEWSLETTER:CLEAR_SUBSCRIPTION_DATA',
};

export const RequestSubscription = (follower: Follower): IAction => ({
  type: actionTypes.REQUEST_SUBSCRIPTION,
  payload: {
    follower,
  },
});

export const RegisterSubscription = (follower: Follower, context: ISubscriptionResponseContext): IAction => ({
  type: actionTypes.REGISTER_SUBSCRIPTION,
  payload: {
    follower,
    context,
  },
});

export const NoticeRepeatedSubscription = (follower: Follower, context: ISubscriptionResponseContext): IAction => ({
  type: actionTypes.NOTICE_REPEATED_SUBSCRIPTION,
  payload: {
    follower,
    context,
  },
});

export const RejectSubscription = (follower: Follower, error: Error): IAction => ({
  type: actionTypes.REJECT_SUBSCRIPTION,
  payload: {
    follower,
    error,
  },
});

export const ClearSubscriptionData = (): IAction => ({
  type: actionTypes.CLEAR_SUBSCRIPTION_DATA,
});

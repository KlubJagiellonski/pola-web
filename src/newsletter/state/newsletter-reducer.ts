import { AnyAction, Reducer } from 'redux';

import { actionTypes } from './newsletter-actions';
import * as actions from './newsletter-actions';
import { IAction, IActionReducer } from '../../state/types';
import { Follower, ISubscriptionResponseContext } from '..';

export type SubscriptionStatus = 'initial' | 'subscribing' | 'subscribed' | 'failure';

export type ISubscribeState =
  | {
      status: 'initial';
    }
  | {
      status: 'subscribing';
      follower: Follower;
    }
  | {
      status: 'subscribed';
      follower: Follower;
      context: ISubscriptionResponseContext;
    }
  | {
      status: 'failure';
      follower: Follower;
      error: Error;
    };

const initialState: ISubscribeState = { status: 'initial' };

const reducers: IActionReducer<ISubscribeState> = {
  [actionTypes.SUBSCRIPTION_REQUESTED]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.SubscriptionRequested>
  ) => {
    return {
      status: 'subscribing',
      follower: action.payload.follower,
    };
  },

  [actionTypes.SUBSCRIPTION_SUCCESS]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.SubscriptionSuccess>
  ) => {
    return {
      status: 'subscribed',
      follower: action.payload.follower,
      context: action.payload.context,
    };
  },

  [actionTypes.SUBSCRIPTION_FAILURE]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.SubscriptionFailure>
  ) => {
    return {
      status: 'failure',
      follower: action.payload.follower,
      error: action.payload.error,
    };
  },

  [actionTypes.SUBSCRIPTION_CLEARED]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.SubscriptionCleared>
  ) => {
    return {
      status: 'initial',
    };
  },
};

export const newsletterReducer: Reducer<ISubscribeState, AnyAction> = (
  state: ISubscribeState = initialState,
  action: IAction
) => {
  const reducer: any = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

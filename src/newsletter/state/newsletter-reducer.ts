import { AnyAction, Reducer } from 'redux';

import { actionTypes } from './newsletter-actions';
import * as actions from './newsletter-actions';
import { IAction, IActionReducer } from '@State/types';
import { Follower, NewsletterApiResponseContext } from '..';

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
      context: NewsletterApiResponseContext;
    }
  | {
      status: 'failure';
      follower: Follower;
      error: Error;
    };

const initialState: ISubscribeState = { status: 'initial' };

const reducers: IActionReducer<ISubscribeState> = {
  [actionTypes.SUBSCRIBING]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.Subscribing>
  ) => {
    return {
      ...state,
      status: 'subscribing',
      follower: action.payload.follower,
    };
  },

  [actionTypes.SUBSCRIPTION_SUCCESS]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.SubscriptionSuccess>
  ) => {
    return {
      ...state,
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
      ...state,
      status: 'failure',
      follower: action.payload.follower,
      error: action.payload.error,
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

import { Follower } from 'newsletter';
import { ISubscriptionResponseContext } from 'newsletter/services/subscription-response-context';
import { AnyAction, Reducer } from 'redux';

import { IAction, IActionReducer } from '@App/state';

import { assertStatus } from '@Utils/assert-status';

import { actionTypes } from './newsletter-actions';

export enum SubscriptionStatus {
  INITIAL = 'initial',
  REQUESTED = 'requested',
  REGISTERED = 'registered',
  REPEATED = 'repeated',
  REJECTED = 'rejected',
}

export type ISubscribeState =
  | {
      status: SubscriptionStatus.INITIAL;
    }
  | {
      status: SubscriptionStatus.REQUESTED;
      follower: Follower;
    }
  | {
      status: SubscriptionStatus.REGISTERED;
      follower: Follower;
      context: ISubscriptionResponseContext;
    }
  | {
      status: SubscriptionStatus.REPEATED;
      follower: Follower;
      context: ISubscriptionResponseContext;
    }
  | {
      status: SubscriptionStatus.REJECTED;
      follower: Follower;
      error: Error;
    };

const initialState: ISubscribeState = { status: SubscriptionStatus.INITIAL };

const reducers: IActionReducer<ISubscribeState> = {
  [actionTypes.REQUEST_SUBSCRIPTION]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.RequestSubscription>
  ) => {
    assertStatus(state, SubscriptionStatus.INITIAL);
    return {
      status: SubscriptionStatus.REQUESTED,
      follower: action.payload.follower,
    };
  },

  [actionTypes.REGISTER_SUBSCRIPTION]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.RegisterSubscription>
  ) => {
    assertStatus(state, SubscriptionStatus.REQUESTED);
    return {
      status: SubscriptionStatus.REGISTERED,
      follower: action.payload.follower,
      context: action.payload.context,
    };
  },

  [actionTypes.NOTICE_REPEATED_SUBSCRIPTION]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.RegisterSubscription>
  ) => {
    assertStatus(state, SubscriptionStatus.REQUESTED);
    return {
      status: SubscriptionStatus.REPEATED,
      follower: action.payload.follower,
      context: action.payload.context,
    };
  },

  [actionTypes.REJECT_SUBSCRIPTION]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.RejectSubscription>
  ) => {
    assertStatus(state, SubscriptionStatus.REQUESTED);
    return {
      status: SubscriptionStatus.REJECTED,
      follower: action.payload.follower,
      error: action.payload.error,
    };
  },

  [actionTypes.CLEAR_SUBSCRIPTION_DATA]: (
    state: ISubscribeState = initialState,
    action: ReturnType<typeof actions.ClearSubscriptionData>
  ) => {
    return {
      status: SubscriptionStatus.INITIAL,
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

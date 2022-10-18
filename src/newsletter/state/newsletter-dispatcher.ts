import { Dispatch } from 'redux';

import { IPolaState } from '@State/types';

import { Follower } from '..';
import { SubscriptionError } from '../../services/api-errors';
import { NewsletterService } from '../services/newsletter-service';
import * as actions from './newsletter-actions';

export const newsletterDispatcher = {
  subscribeEmail: (email: string, name?: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const follower = Follower.create(email, name);
      const service = NewsletterService.getInstance();
      await dispatch(actions.Subscribing(follower));

      try {
        const context = await service.subscribeNewsletter(follower);
        await dispatch(actions.SubscriptionSuccess(follower, context));
      } catch (error: unknown) {
        const subscriptionError = error instanceof SubscriptionError ? error : new SubscriptionError(error);
        await dispatch(actions.SubscriptionFailure(follower, subscriptionError));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

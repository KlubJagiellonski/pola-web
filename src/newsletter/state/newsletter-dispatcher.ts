import { Dispatch } from 'redux';
import { Follower } from '..';
import { NewsletterService, SUBSCRIPTION_REPEATED_CODE } from '../services/newsletter-service';
import { SubscriptionError } from '../../services/api-errors';
import { IPolaState } from '../../state/types';
import * as actions from './newsletter-actions';
import { SubscriptionResponseContext } from 'newsletter/services/subscription-response-context';

export const newsletterDispatcher = {
  requestSubscriptionForEmail:
    (email: string, name?: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
      try {
        const follower = Follower.create(email, name);
        const service = NewsletterService.getInstance();
        await dispatch(actions.RequestSubscription(follower));

        try {
          const context =
            process.env.NODE_ENV !== 'development'
              ? await service.subscribeNewsletter(follower)
              : SubscriptionResponseContext.Empty; // do not perform real subscription request on development environment

          if (context && context.status === SUBSCRIPTION_REPEATED_CODE) {
            console.log('repeated context', context);
            await dispatch(actions.NoticeRepeatedSubscription(follower, context));
          } else {
            console.log('registered context', context);
            await dispatch(actions.RegisterSubscription(follower, context));
          }
        } catch (error: unknown) {
          const subscriptionError = error instanceof SubscriptionError ? error : new SubscriptionError(error);
          await dispatch(actions.RejectSubscription(follower, subscriptionError));
        }
      } catch (error: unknown) {
        console.error(error);
      }
    },

  clearSubscriptionFormData: () => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      await dispatch(actions.ClearSubscriptionData());
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

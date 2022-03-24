import { Dispatch } from 'redux';
import { Follower } from '../../domain/newsletter';
import { NewsletterService } from '../../domain/newsletter/newsletter-service';
import { IPolaState } from '../types';
import * as actions from './newsletter-actions';

export const newsletterDispatcher = {
  subscribeEmail: (email: string, name?: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const follower = Follower.create(email, name);
      const service = NewsletterService.getInstance();
      service.subscribeNewsletter(follower);
      await dispatch(actions.Subscribe(follower));
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

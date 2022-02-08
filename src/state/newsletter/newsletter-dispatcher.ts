import { Dispatch } from 'redux';
import { Follower } from '../../domain/newsletter';
import { GetResponseService } from '../../domain/newsletter/get-response-service';
import { IPolaState } from '../types';
import * as actions from './newsletter-actions';

export const newsletterDispatcher = {
  subscribeEmail: (email: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    try {
      const follower = Follower.create(email, 'campaign_id_placeholder');
      const service = GetResponseService.getInstance();
      service.subscribeFollower(follower);
      await dispatch(actions.Subscribe(follower));
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

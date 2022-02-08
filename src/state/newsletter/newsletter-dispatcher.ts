import { Dispatch } from 'redux';
import { Follower } from '../../domain/newsletter';
import { GetResponseService } from '../../domain/newsletter/get-response-service';
import { IPolaState } from '../types';
import * as actions from './newsletter-actions';

export const newsletterDispatcher = {
  subscribeEmail: (email: string) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const service = GetResponseService.getInstance();
    const follower = Follower.create(email, 'campaign_id_placeholder');
    //service.subscribeFollower(follower);
    await dispatch(actions.Subscribe(follower));
  },
};

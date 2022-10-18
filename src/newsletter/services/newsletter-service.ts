import axios, { AxiosError, AxiosResponse } from 'axios';

import { AppSettings } from '@State/app-settings';

import { Follower, NewsletterApiResponseContext } from '..';
import { ApiAdapter } from '../../services/api-adapter';
import { FetchError, SubscriptionError } from '../../services/api-errors';

const API_NAME = 'Newsletter API';

export class NewsletterService extends ApiAdapter {
  public static getInstance(): NewsletterService {
    if (!NewsletterService.instance) {
      NewsletterService.instance = new NewsletterService();
    }
    return NewsletterService.instance;
  }
  private static instance: NewsletterService;

  private constructor() {
    super(API_NAME, AppSettings.newsletterEndpoint);
  }

  public async subscribeNewsletter(follower: Follower) {
    try {
      return axios
        .post(this.apiUrl, {
          contact_name: follower.name,
          contact_email: follower.email,
        })
        .then((response: AxiosResponse) => {
          const context: NewsletterApiResponseContext = response.data;
          console.log('Follower successfully subscribed to the newsletter', context);
          return context;
        })
        .catch((error: AxiosError) => {
          console.error('Cannot subscribe follower to the newsletter', JSON.stringify(error.response));
          throw new SubscriptionError(error);
        });
    } catch (e) {
      throw new FetchError(API_NAME, e);
    }
  }
}

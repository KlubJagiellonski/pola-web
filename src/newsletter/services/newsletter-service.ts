import { AppSettings } from 'app/app-settings';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Follower } from '..';
import { ApiAdapter } from '../../app/api-adapter';
import { FetchError, SubscriptionError } from '../../app/api-errors';

export const SUBSCRIPTION_REPEATED_CODE = 1001;
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
    const requestBody = {
      contact_name: follower.name,
      contact_email: follower.email,
    };
    return axios
      .post(this.apiUrl, requestBody)
      .then((response: AxiosResponse) => {
        const context = response.data;
        if (!context || context === '') {
          console.warn('Follower successfully subscribed, but subscription API does not return response data.');
        }
        return context;
      })
      .catch((error: AxiosError) => {
        console.error('Cannot subscribe follower to the newsletter', JSON.stringify(error.response));
        throw new SubscriptionError(error);
      });
  }
}

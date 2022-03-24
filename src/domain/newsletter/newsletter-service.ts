import axios, { AxiosResponse, AxiosError } from 'axios';
import { Follower, NewsletterApiResponseContext } from '.';
import { ApiAdapter } from '../../services/api-adapter';
import { FetchError } from '../../services/api-errors';
import { AppSettings } from '../../state/app-settings';

const API_NAME = 'GetResponse API';

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

  public subscribeNewsletter(follower: Follower) {
    try {
      axios
        .post(this.apiUrl, {
          contact_name: follower.name,
          contact_email: follower.email,
        })
        .then((response: AxiosResponse) => {
          const context: NewsletterApiResponseContext = response.data;
          console.log('Follower successfully subscribed to the newsletter', context);
        })
        .catch((error: AxiosError) => {
          console.error(JSON.stringify(error.response));
          throw this.handleError(error);
        });
    } catch (e) {
      throw new FetchError(API_NAME, e);
    }
  }
}

import axios, { AxiosResponse, AxiosError } from 'axios';
import { Follower, NewsletterApiResponseContext } from '.';
import { ApiAdapter } from '../../services/api-adapter';
import { FetchError } from '../../services/api-errors';
import { AppSettings } from '../../state/app-settings';

const API_NAME = 'GetResponse API';

export class GetResponseService extends ApiAdapter {
  public static getInstance(): GetResponseService {
    if (!GetResponseService.instance) {
      GetResponseService.instance = new GetResponseService();
    }
    return GetResponseService.instance;
  }
  private static instance: GetResponseService;

  private constructor() {
    super(API_NAME, AppSettings.getResponseEndpoint);
  }

  public subscribeFollower(follower: Follower) {
    try {
      axios
        .post(`${this.apiUrl}/contacts`, follower, {
          headers: {
            'X-Auth-Token': 'api-key key_placeholder',
          },
        })
        .then((response: AxiosResponse) => {
          const context = new NewsletterApiResponseContext(response.headers);
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

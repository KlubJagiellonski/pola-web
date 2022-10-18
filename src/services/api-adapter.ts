import axios from 'axios';

import {
  ApiAdapterError,
  AuthenticationError,
  BadRequestError,
  ErrorMessage,
  FetchError,
  InternalServiceError,
  MethodNotFoundError,
  NetworkError,
  RequestsLimitExceeded,
  ResourceConflictError,
} from './api-errors';

export abstract class ApiAdapter {
  protected readonly apiName: string;
  protected readonly apiUrl: string;

  protected constructor(apiName: string, apiUrl: string) {
    this.apiName = apiName;
    this.apiUrl = apiUrl;
  }

  protected handleError(error: unknown) {
    if (!(error instanceof Error)) {
      return new ApiAdapterError(this.apiName);
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        /**
         * client received an error response (5xx, 4xx)
         */
        switch (error.response!.status) {
          case 400:
            return new BadRequestError(error.response);
          case 401:
            return new AuthenticationError(error.response);
          case 404:
            return new MethodNotFoundError(error.response);
          case 409:
            return new ResourceConflictError(error.response);
          case 429:
            return new RequestsLimitExceeded(error.response);
          case 500:
            return new InternalServiceError(error.response);
          case 503:
            return new NetworkError(error.response);
        }
      } else if (error.request) {
        /**
         * something happened in setting up the request that triggered an Error
         * client never received a response, or request never left
         */
        return new FetchError(this.apiName, error.request);
      } else {
        return new NetworkError(error);
      }
    } else {
      console.error(ErrorMessage.UNEXPECTED_ERROR);
      return new ApiAdapterError(this.apiName);
    }
  }
}

import { ErrorHandler, ErrorMessage } from 'services/api-errors';

export class SubscriptionError extends ErrorHandler {
  /**
   * Error describes failure of subscribing contact to a newsletter
   * @param handledError Handled incoming error object
   */
  constructor(public handledError?: unknown) {
    super();
    this.name = 'Newsletter subscription error';
    this.message = this.buildMessage(ErrorMessage.SUBSCRIPTION_ERROR);
  }
}

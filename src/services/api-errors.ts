export abstract class ErrorHandler extends Error {
  constructor(public handledError?: unknown) {
    super();
  }

  buildMessage(message: string): string {
    if (this.handledError) {
      return message + `: ${this.handledError}`;
    }
    return message;
  }
}

export class FetchError extends ErrorHandler {
  /**
   * Generic error for fetching data from outside data source
   * @param dataTypeName Name of data to be fetched
   * @param apiName Name of end point
   * @param handledError Handled incoming error object
   */
  constructor(apiName: string, public handledError?: unknown) {
    super();
    this.name = 'Fetch Error';
    this.message = this.buildMessage(`Cannot fetch data. Check if ${apiName} is available`);
    console.error(this.message);
  }
}

export class EmptyResponseDataError extends ErrorHandler {
  /**
   * Generic error for retrieving undefined data from outside data source
   * @param dataTypeName Name of data to be fetched
   * @param handledError Handled incoming error object
   */
  constructor(dataTypeName: string, public handledError?: unknown) {
    super();
    this.name = 'Empty Response Error';
    this.message = this.buildMessage(`Obtained empty ${dataTypeName} collection`);
    console.warn(this.message);
  }
}

export class InvalidSearchResultError extends ErrorHandler {
  /**
   * Error describes invalid data returned for valid search query
   * @param handledError Handled incoming error object
   */
  constructor(public handledError?: unknown) {
    super();
    this.name = 'Ivalid search result';
    this.message = this.buildMessage(`Obtained invalid data for search query`);
    console.error(this.message);
  }
}

export class BadRequestError extends ErrorHandler {
  /**
   * Error describes invalid request structure
   * @param handledError Handled incoming error object
   */
  constructor(public handledError?: unknown) {
    super();
    this.name = 'Bad request';
    this.message = this.buildMessage(`Invalid request structure`);
    console.error(this.message);
  }
}

export class InternalServiceError extends ErrorHandler {
  /**
   * Error describes error incoming from a service side
   * @param handledError Handled incoming error object
   */
  constructor(public handledError?: unknown) {
    super();
    this.name = 'Internal service error';
    this.message = this.buildMessage(`Something unexpected happed on the service. Please try later.`);
    console.error(this.message);
  }
}

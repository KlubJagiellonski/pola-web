import { AxiosResponse } from 'axios';

/**
 * Represents the contact resource in GetResponse API
 * https://apireference.getresponse.com/?_ga=2.190951978.1273476293.1644271128-1725880598.1644271128#
 */
export class Follower {
  public readonly campaign = {
    campaignId: '',
  };

  /**
   * The day on which the contact is in the Autoresponder cycle.
   * null indicates the contacts is not in the cycle.
   */
  public readonly dayOfCycle?: string;

  /**
   * Contact scoring, pass null to remove the score from a contact
   */
  public readonly scoring?: number;

  /**
   * The contact's IP address. IPv4 and IPv6 formats are accepted.
   */
  public readonly ipAddress?: string;

  public readonly tags?: { tagId: string }[];
  public readonly customFieldValues?: { customFieldId: string; value: string[] }[];

  private constructor(public email: string, campaignId: string, public name?: string) {
    this.campaign.campaignId = campaignId;
  }

  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private static isEmailValid = (email?: string): boolean => {
    return email ? Follower.emailRegex.test(email) : false;
  };

  public static create(email: string, campaignId: string) {
    if (!Follower.isEmailValid(email)) {
      throw Error('invalid email');
    }

    return new Follower(email, campaignId);
  }
}

export class NewsletterApiResponseContext {
  /**
   * The total number of requests available per time frame
   */
  public readonly limit: number;

  /**
   * The number of requests left in the current time frame
   */
  public readonly remaining: number;

  /**
   * Seconds left in the current time frame, e.g. "432 seconds"
   */
  public readonly reset: string;

  public constructor(headers: { [tag: string]: string | number }) {
    this.limit = headers['X-RateLimit-Limit'] as number;
    this.remaining = headers['X-RateLimit-Remaining'] as number;
    this.reset = headers['X-RateLimit-Reset'] as string;
  }
}

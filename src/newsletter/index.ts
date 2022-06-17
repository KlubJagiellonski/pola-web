import { validateEmail } from '../utils/strings';

/**
 * Represents the contact resource in GetResponse API
 * https://apireference.getresponse.com/?_ga=2.190951978.1273476293.1644271128-1725880598.1644271128#
 */
export class Follower {
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

  private constructor(public email: string, public name?: string) {}

  public static create(email: string, name?: string) {
    const errorMessage = validateEmail(email);
    if (errorMessage) {
      throw Error(errorMessage);
    }

    return new Follower(email, name);
  }
}

export interface ISubscriptionResponseContext {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export class SubscriptionResponseContext implements ISubscriptionResponseContext {
  constructor(
    public type: string,
    public title: string,
    public status: number,
    public detail: string,
    public instance: string
  ) {}

  public static Empty: ISubscriptionResponseContext = {
    type: 'mock',
    title: 'mock',
    status: 0,
    detail: 'mock',
    instance: 'mock',
  };
}

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

import { IReduxData } from '@App/generics';

export interface IFriendData extends IReduxData {
  name: string;
  image?: string;
  description: string;
  page: string;
  slug?: string;
}

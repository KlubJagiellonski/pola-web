import { IReduxData } from '@App/generics';

export interface IPartnerData extends IReduxData {
  name: string;
  image: string;
  description: string;
  sourceUrl: string;
}

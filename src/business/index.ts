import { IReduxData } from '@App/generics';

export interface IBusinessData extends IReduxData {
  title: string;
  slug: string;
  icon: string;
  cover: string;
  html: string;
}

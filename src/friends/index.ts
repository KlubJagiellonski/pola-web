import { IGatsbyNode, IReduxData } from '@App/generics';

import { guid } from '@Utils/data/random-number';

export interface IFriendData extends IReduxData {
  name: string;
  image?: string;
  description: string;
  page: string;
  slug?: string;
}

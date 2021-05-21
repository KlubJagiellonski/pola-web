import { getNumber } from '../../utils/data/random-number';

export interface IFriend {
  id: string;
  image?: string;
}

export class Friend implements IFriend {
  public id: string;
  public image?: string;

  constructor(public imageSrc?: string) {
    this.image = imageSrc;
    this.id = `${getNumber()}-${getNumber()}-${getNumber()}-${getNumber()}`;

  }
}
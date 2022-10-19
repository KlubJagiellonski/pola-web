import { IGatsbyNode, IReduxData } from '@State/app';

import { guid } from '@Utils/data/random-number';

export class Friend {
  public id: guid;
  public name: string;
  public image?: string;
  public description: string;
  public page: string;
  public slug?: string;

  private constructor(node: IFriendNode) {
    this.id = node.id;
    this.name = node.name;
    this.image = node.image.base;
    this.description = node.description;
    this.page = node.page;
    this.slug = node.slug;
  }

  public static fromNode(node: IFriendNode): Friend {
    return new Friend(node);
  }

  public toDataModel = (): FriendData => ({
    id: this.id,
    name: this.name,
    image: this.image,
    description: this.description,
    page: this.page,
    slug: this.slug,
  });
}

export interface IFriendNode extends IGatsbyNode {
  name: string;
  description: string;
  image: {
    base: string;
  };
  page: string;
  slug: string;
}

export interface FriendData extends IReduxData {
  name: string;
  image?: string;
  description: string;
  page: string;
  slug?: string;
}

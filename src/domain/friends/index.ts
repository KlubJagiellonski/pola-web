import { IFriendNode } from './friend-service';

export class Friend {
  public id: string;
  public image?: string;
  public description: string;

  constructor(data: IFriendNode) {
    this.id = data.id;
    this.image = data.image.relativePath;
    this.description = data.description;
  }
}

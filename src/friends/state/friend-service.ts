import { IFriendData } from 'friends';

import { graphql, useStaticQuery } from 'gatsby';

import { IGatsbyNode } from '@App/generics';

export interface IFriendNode extends IGatsbyNode {
  name: string;
  description: string;
  image: {
    base: string;
  };
  page: string;
  slug: string;
}

export interface IFriendsGraph {
  allFriendsYaml: {
    nodes: IFriendNode[];
  };
}

export class FriendService {
  public static getAllData() {
    const nodes = FriendService.getAllNodes();
    const friends = nodes.map((node) => FriendService.toDataModel(node));
    return friends;
  }

  private static getAllNodes() {
    const resultGraph: IFriendsGraph = useStaticQuery(
      graphql`
        {
          allFriendsYaml {
            nodes {
              id
              name
              description
              image {
                base
              }
              page
              slug
            }
          }
        }
      `
    );

    return resultGraph?.allFriendsYaml?.nodes;
  }

  private static toDataModel = (node: IFriendNode): IFriendData => ({
    id: node.id,
    name: node.name,
    image: node.image.base,
    description: node.description,
    page: node.page,
    slug: node.slug,
  });
}

export function getRandomFriend(friends: IFriendData[]) {
  const randomNumber = Math.floor(Math.random() * friends.length);
  return friends[randomNumber];
}

export function getFriendBySlug(slug: string, friends: IFriendData[]) {
  return friends.find((friend) => friend.slug === slug);
}

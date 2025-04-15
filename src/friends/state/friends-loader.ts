import { IFriendData } from 'friends';

import { graphql, useStaticQuery } from 'gatsby';

import { IGatsbyNode } from '@App/generics';

export interface IFriendNode extends IGatsbyNode {
  name: string;
  description: {
    description: string
  }
  image: {
    url: string;
  };
  page: string;
  slug: string;
}

export interface IFriendsGraph {
  allContentfulFriends: {
    nodes: IFriendNode[];
  };
}

export class FriendsLoader {
  public static getAllData() {
    const nodes = FriendsLoader.getAllNodes();
    const friends = nodes.map((node) => FriendsLoader.toDataModel(node));
    return friends;
  }

  private static getAllNodes() {
    const resultGraph: IFriendsGraph = useStaticQuery(
      graphql`
    {
      allContentfulFriends {
        nodes {
          id
          name
          image {
            url
          }
          slug
          page
          description {
            description
          }
        }
      }
    }
      `
    );

    return resultGraph?.allContentfulFriends?.nodes;
  }

  private static toDataModel = (node: IFriendNode): IFriendData => ({
    id: node.id,
    name: node.name,
    image: node.image.url,
    description: node.description.description,
    page: node.page,
    slug: node.slug,
  });
}

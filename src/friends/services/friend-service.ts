import { graphql, useStaticQuery } from 'gatsby';

import { FriendData } from '@Domain/friends';

export const FriendsService = {
  getAll: () =>
    useStaticQuery(
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
    ),
};

export function getRandomFriend(friends: FriendData[]) {
  const randomNumber = Math.floor(Math.random() * friends.length);
  return friends[randomNumber];
}

export function getFriendBySlug(slug: string, friends: FriendData[]) {
  return friends.find((friend) => friend.slug === slug);
}

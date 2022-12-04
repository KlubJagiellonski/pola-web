import { IFriendData } from 'friends';

export function getRandomFriend(friends: IFriendData[]) {
  const randomNumber = Math.floor(Math.random() * friends.length);
  return friends[randomNumber];
}

export function getFriendBySlug(slug: string, friends: IFriendData[]) {
  return friends.find((friend) => friend.slug === slug);
}

import { Friend } from '../../domain/friends';

export function getRandomFriend(friends: Friend[]) {
  const randomNumber = Math.floor(Math.random() * friends.length);
  return friends[randomNumber];
}

export interface IFriendsSuccess {
  results: IFriendsData[];
}

export interface IArticlesError {
  error: unknown;
}

interface IFriendsData {
  id: number;
  photo: string;
}

const friends: IFriendsData[] = [
  {
    id: 1,
    photo: 'Browar-Piwojad.png',
  },
];

export const FriendsService = {
  getArticles: async (): Promise<IFriendsSuccess> => {
    return {
      results: friends,
    };
  },
};

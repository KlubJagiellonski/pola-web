import { useEffect } from 'react';
import { connect } from 'react-redux';

import { IFriendNode } from '@Domain/friends';
import { appDispatcher } from '@State/app/app-dispatcher';
import { IPolaState } from '@State/types';

import { FriendsService } from '../friends/services/friend-service';
import { friendsDispatcher } from '../friends/state/friends-dispatcher';
import { ArticleService, IArticleEdge } from '../posts/services/article-service';
import { articlesDispatcher } from '../posts/state/articles-dispatcher';

interface IStateLoader {
  isArticlesLoaded?: boolean;
  isFriendsLoaded?: boolean;
  initApp?: () => void;
  loadArticles?: (edges: IArticleEdge[]) => void;
  loadFriends?: (node: IFriendNode[]) => void;
}

const Loader = (props: IStateLoader) => {
  const bootApplication = async () => {
    if (props.initApp) {
      await props.initApp();
    }
  };

  useEffect(() => {
    bootApplication();
  }, []);

  const queryResultFriend = FriendsService.getAll();
  if (!props.isFriendsLoaded && queryResultFriend?.allFriendsYaml?.nodes && props.loadFriends) {
    const data = queryResultFriend.allFriendsYaml.nodes;
    props.loadFriends(data);
  }

  const queryResult = ArticleService.getAll();
  if (!props.isArticlesLoaded && queryResult?.allMarkdownRemark?.edges && props.loadArticles) {
    const data = queryResult.allMarkdownRemark.edges;
    data.sort((a: IArticleEdge, b: IArticleEdge) => {
      return Date.parse(b.node.fields.prefix) - Date.parse(a.node.fields.prefix);
    });
    props.loadArticles(data);
  }

  return null;
};

export const StateLoader = connect(
  (state: IPolaState) => ({
    isArticlesLoaded: state.articles.initialized,
    isFriendsLoaded: state.friends.initialized,
  }),
  {
    initApp: appDispatcher.initialize,
    loadArticles: articlesDispatcher.loadArticles,
    loadFriends: friendsDispatcher.loadFriends,
  }
)(Loader);

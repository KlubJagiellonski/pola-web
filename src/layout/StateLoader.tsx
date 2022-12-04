import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { IArticleNode } from '@Domain/articles';
import { appDispatcher } from 'app/state/app-dispatcher';

import { FriendLoader } from '../friends/state/friend-loader';
import { ArticleService } from '../posts/services/article-service';
import { articlesDispatcher } from '../posts/state/articles-dispatcher';
import { loadFriends } from 'friends/state/friends-reducer';

interface IStateLoader {
  isArticlesLoaded?: boolean;
  isFriendsLoaded?: boolean;
  initApp?: () => void;
  loadArticles?: (edges: IArticleNode[]) => void;
}

const Loader = (props: IStateLoader) => {
  const dispatch = useDispatch();
  const bootApplication = async () => {
    if (props.initApp) {
      await props.initApp();
    }
  };

  useEffect(() => {
    bootApplication();
  }, []);

  try {
    //const friendNodes = getAllNodes();
    if (!props.isFriendsLoaded) {
      //const friends = friendNodes.map((node) => Friend.fromNode(node)).map((friend) => friend.toDataModel());
      const friends = FriendLoader.getAllData();
      dispatch(loadFriends(friends));
    }
  } catch (error: unknown) {
    dispatch(loadFriends([]));
    throw new Error('Cannot load friends data');
  }

  try {
    const queryResult = ArticleService.getAll();
    const articleNodes: IArticleNode[] = queryResult?.allMarkdownRemark?.nodes;
    if (!props.isArticlesLoaded && articleNodes && props.loadArticles) {
      articleNodes.sort((a: IArticleNode, b: IArticleNode) => {
        return Date.parse(b.fields.prefix) - Date.parse(a.fields.prefix);
      });
      props.loadArticles(articleNodes);
    }
  } catch (error: unknown) {
    if (props.loadArticles) {
      props.loadArticles([]);
    }
    throw new Error('Cannot load friends data');
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
  }
)(Loader);

import { PartnersLoader } from 'partners/state/partners-loader';
import { loadPartners } from 'partners/state/partners-reducer';

import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { IArticleNode } from '@Domain/articles';
import { appDispatcher } from 'app/state/app-dispatcher';

import { FriendsLoader } from '../friends/state/friends-loader';
import { ArticleService } from '../posts/services/article-service';
import { articlesDispatcher } from '../posts/state/articles-dispatcher';
import { loadFriends } from 'friends/state/friends-reducer';

interface IStateLoader {
  isArticlesLoaded?: boolean;
  isFriendsLoaded?: boolean;
  isPartnersLoaded?: boolean;
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
      const friends = FriendsLoader.getAllData();
      dispatch(loadFriends(friends));
    }
  } catch (error: unknown) {
    dispatch(loadFriends([]));
    logError(error, 'Cannot load friends data');
  }

  try {
    //const friendNodes = getAllNodes();
    if (!props.isPartnersLoaded) {
      //const friends = friendNodes.map((node) => Friend.fromNode(node)).map((friend) => friend.toDataModel());
      const partners = PartnersLoader.getAllData();
      dispatch(loadPartners(partners));
    }
  } catch (error: unknown) {
    dispatch(loadPartners([]));
    logError(error, 'Cannot load partners data');
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
    logError(error, 'Cannot load articles data');
  }

  return null;
};

const logError = (error: unknown, message?: string) => {
  const handledMessage = error instanceof Error ? error.message : undefined;

  const text = handledMessage ? `${message}: ` + handledMessage : message;
  console.error(text);
};

export const StateLoader = connect(
  (state: IPolaState) => ({
    isArticlesLoaded: state.articles.initialized,
    isFriendsLoaded: state.friends.initialized,
    isPartnersLoaded: state.partners.initialized,
  }),
  {
    initApp: appDispatcher.initialize,
    loadArticles: articlesDispatcher.loadArticles,
  }
)(Loader);

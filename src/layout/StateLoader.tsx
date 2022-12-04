import { BusinessLoader } from 'business/state/business-loader';
import { loadServices } from 'business/state/business-reducer';
import { PartnersLoader } from 'partners/state/partners-loader';
import { loadPartners } from 'partners/state/partners-reducer';
import { IArticleNode } from 'posts';

import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from 'app/state/app-dispatcher';

import { FriendsLoader } from '../friends/state/friends-loader';
import { ArticleService } from '../posts/services/article-service';
import { articlesDispatcher } from '../posts/state/articles-dispatcher';
import { loadFriends } from 'friends/state/friends-reducer';

interface IStateLoader {
  isArticlesLoaded?: boolean;
  isFriendsLoaded?: boolean;
  isPartnersLoaded?: boolean;
  isBusinessLoaded?: boolean;
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
    if (!props.isFriendsLoaded) {
      const friends = FriendsLoader.getAllData();
      dispatch(loadFriends(friends));
    }
  } catch (error: unknown) {
    dispatch(loadFriends([]));
    logError(error, 'Cannot load friends data');
  }

  try {
    if (!props.isPartnersLoaded) {
      const partners = PartnersLoader.getAllData();
      dispatch(loadPartners(partners));
    }
  } catch (error: unknown) {
    dispatch(loadPartners([]));
    logError(error, 'Cannot load partners data');
  }

  try {
    if (!props.isBusinessLoaded) {
      const services = BusinessLoader.getAllData();
      dispatch(loadServices(services));
    }
  } catch (error: unknown) {
    dispatch(loadServices([]));
    logError(error, 'Cannot load business services data');
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
    isBusinessLoaded: state.partners.initialized,
  }),
  {
    initApp: appDispatcher.initialize,
    loadArticles: articlesDispatcher.loadArticles,
  }
)(Loader);

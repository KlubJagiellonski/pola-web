import { IArticleEdge, IArticleNode } from 'posts/services/article-service';
import { Dispatch } from 'redux';

import { Article, ArticleData } from '@Domain/articles';
import { IPolaState } from '@State/types';

import { loadArticles } from './articles-reducer';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = gatsbyNodes.map((node) => Article.fromNode(node)).map((article: Article) => article.toDataModel());

    await dispatch(loadArticles(articles));
  },
};

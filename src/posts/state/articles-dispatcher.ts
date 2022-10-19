import { IArticleEdge, IArticleNode } from 'posts/services/article-service';
import { Dispatch } from 'redux';

import { Article, ArticleData } from '@Domain/articles';
import { IPolaState } from '@State/types';

import { loadArticles } from './articles-reducer';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => IPolaState) => {
    const articles = gatsbyNodes.map((node) => Article.fromNode(node)).map((article: Article) => article.toDataModel());

    // {
    //   const article = {
    //     id: edge.node.id,
    //     title: edge.node.frontmatter.title,
    //     subTitle: edge.node.frontmatter.subTitle,
    //     slug: edge.node.fields.slug,
    //     date: edge.node.fields.prefix,
    //     imagePath: edge.node.frontmatter.cover.relativePath,
    //     tag: edge.node.frontmatter.category,
    //   };
    //   return [...articles, article];
    // }, []);

    await dispatch(loadArticles(articles));
  },
};

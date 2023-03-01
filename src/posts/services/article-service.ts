import { useLocation } from '@reach/router';
import { IArticleData } from 'posts';
import queryString from 'query-string';
import { ArrayParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';

import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

export const ArticleService = {
  getAll: () =>
    useStaticQuery(
      graphql`
      {
        allContentfulPosts(limit: 1000) {
          nodes {
              slug
              date
              subTitle
              title
              category
              id
              cover {
                url
              }
            }
          }
        }
      `
    ),
};

export interface IArticlesTwoColumns {
  first: IArticleData;
  second?: IArticleData;
}

export function getArticlesTwoColumns(articles: IArticleData[]) {
  const sortedArticles: IArticlesTwoColumns[] = [];
  let section: IArticlesTwoColumns[] = [];

  for (let i = 0; i < articles.length; i = i + 2) {
    if (articles[i + 1] !== undefined) {
      section.push({ first: articles[i], second: articles[i + 1] });
    } else {
      section.push({ first: articles[i] });
    }

    if (section.length === 3 || i + 2 >= articles.length) {
      sortedArticles.push(section.slice());
      section = [];
    }
  }

  return sortedArticles;
}

export interface IArticleQuery {
  tags: string[];
  page: number;
}

export const buildArticlesQuery = (query: IArticleQuery): string | undefined => {
  const { page, tags } = query;
  let url = '';
  const hasAnyTags = tags && tags.length > 0;
  const hasAnyParameters = !!page || hasAnyTags;

  if (hasAnyParameters) {
    const pageSegment = page ? `page=${page}` : '';
    const tagsSegment = tags && tags.length > 0 ? `tags=${tags.join(',')}` : '';
    const separator = tagsSegment.length > 0 ? '&' : '';

    url += `?${pageSegment}${separator}${tagsSegment}`;
  }

  return url;
};

export const useArticlesParams = (withUseQueryParams: boolean = false): IArticleQuery => {
  const location = useLocation();
  if (withUseQueryParams) {
    const [query, setQuery] = useQueryParams({
      tags: withDefault(ArrayParam, []),
      page: NumberParam,
    });

    return query as IArticleQuery;
  } else {
    const [storedQuery, setStoredQuery] = useState<IArticleQuery>({ page: 1, tags: [] });

    useEffect(() => {
      const parsedSearch = location?.search ? queryString.parse(location.search, { arrayFormat: 'comma' }) : undefined;
      const query: IArticleQuery = {
        page: parsedSearch?.page && !Array.isArray(parsedSearch.page) ? parseInt(parsedSearch.page) : 1,
        tags:
          parsedSearch?.tags && parsedSearch.tags.length > 0
            ? Array.isArray(parsedSearch.tags)
              ? parsedSearch.tags
              : [parsedSearch.tags]
            : [],
      };
      setStoredQuery(query);
    }, [location]);

    return storedQuery;
  }
};

export const useQueryParam = (paramName: string, initialValue: string): string => {
  const location = useLocation();

  const [storedQuery, setStoredQuery] = useState<T>(initialValue);

  useEffect(() => {
    const parsedSearch = location?.search ? queryString.parse(location.search, { arrayFormat: 'comma' }) : undefined;
    if (parsedSearch && parsedSearch[paramName]) {
      const value = parsedSearch[paramName];
      setStoredQuery(value);
    }
  }, [location]);

  return storedQuery;
};

export function getVisibleArticles(actualArticleId: string, articles: IArticleData[]) {
  let art = articles.slice();
  for (let i = 0; i < art.length; i++) {
    if (art[i].id === actualArticleId) {
      art.splice(i, 1);
    }
  }
  if (art.length > 3) {
    art = art.slice(0, 3);
  }

  return art;
}

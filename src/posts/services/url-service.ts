import { stringify } from 'query-string';
import { ArrayParam, encodeQueryParams, withDefault } from 'use-query-params';

import { urls } from 'app/website';

export function tagUrl(label: string, query: any) {
  let tags = query.tags.slice();
  const isTag = tags.find((tag: string) => tag === label);
  if (!isTag) {
    tags.push(label);
  } else {
    tags = tags.filter((tag: string) => tag !== label);
  }
  const encodedQuery = encodeQueryParams({ tags: withDefault(ArrayParam, []) }, { tags });
  return `${urls.pola.news()}?${stringify(encodedQuery)}`;
}

export const TAG_SEPARATOR = '-';

export const encodeStringToBase64 = (tag: string) => {
  return tag && tag.length > 0
    ? tag
        .replaceAll(' ', TAG_SEPARATOR)
        .replaceAll('ą', 'a')
        .replaceAll('ę', 'e')
        .replaceAll('ć', 'c')
        .replaceAll('ł', 'l')
        .replaceAll('ó', 'o')
        .replaceAll('ź', 'z')
        .replaceAll('ż', 'z')
    : undefined;
};

export function getUniqueTags(articles: ArticleData[] | undefined) {
  if (!articles) {
    return [];
  }

  const uniqueTags = articles.reduce((tags: Set<string>, article: ArticleData) => {
    if (article.tag) {
      tags.add(article.tag);
    }
    return tags;
  }, new Set<string>());

  return Array.from(uniqueTags).sort();
}

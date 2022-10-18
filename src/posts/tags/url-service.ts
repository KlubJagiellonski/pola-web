import { stringify } from 'query-string';
import { ArrayParam, encodeQueryParams, withDefault } from 'use-query-params';

import { urls } from '@Domain/website';

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

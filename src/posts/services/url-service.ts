import { IArticleData } from 'posts';
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
    : '';
};

export function getUniqueTags(articles: IArticleData[] | undefined) {
  if (!articles) {
    return [];
  }

  const uniqueTags = articles.reduce((tags: Set<string>, article: IArticleData) => {
    if (article.tag) {
      tags.add(article.tag);
    }
    return tags;
  }, new Set<string>());

  return Array.from(uniqueTags).sort();
}

import { getGuid } from '../../utils/data/random-number';
import 'jest';
import 'jest-expect-message';

import { getUniqueTags } from './url-service';

const fakeArticle = (index: number = 1, tag: string = 'tag1') => ({
  id: getGuid(),
  title: `article #${index}`,
  subTitle: `short decription of article #${index}`,
  slug: 'article-1',
  date: Date.now().toLocaleString(),
  tag: tag,
  urlTag: tag,
});

describe('URL service', () => {
  describe('for given articles', () => {
    test('should find all unique tags', () => {
      const articles = [
        fakeArticle(1, 'tag1'),
        fakeArticle(2, 'tag2'),
        fakeArticle(3, 'tag3'),
        fakeArticle(4, 'tag4'),
        fakeArticle(5, 'tag1'),
        fakeArticle(6, 'tag1'),
        fakeArticle(7, 'tag2'),
        fakeArticle(8, 'tag2'),
        fakeArticle(9, 'tag5'),
        fakeArticle(10, 'tag6'),
      ];

      const tags = getUniqueTags(articles);

      expect(tags, 'incorrect number of unique tags').toHaveLength(6);
      expect(tags.includes('tag1'), 'should include tag1').toBeTruthy;
      expect(tags.includes('tag6'), 'should include tag6').toBeTruthy;
    });
  });
});

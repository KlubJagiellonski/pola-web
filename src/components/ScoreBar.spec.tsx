import { fireEvent, render, screen } from '@testing-library/react';
import 'jest';
import 'jest-expect-message';

import { ScoreBar } from './ScoreBar';

describe('Score Bar', () => {
  describe('for given product', () => {
    describe('when product has value 0', () => {
      test('should show zero points', () => {
        const scoreBar = render(<ScoreBar value={0} unit="%" />);

        expect(scoreBar.getByAltText('0 %'), 'incorrect number of unique tags').toBeTruthy();
      });
    });
    describe('when product has value null', () => {
      // test('should show zero points', () => {
      //   expect(tags, 'incorrect number of unique tags').toHaveLength(6);
      //   expect(tags.includes('tag1'), 'should include tag1').toBeTruthy;
      //   expect(tags.includes('tag6'), 'should include tag6').toBeTruthy;
      // });
    });
  });
});

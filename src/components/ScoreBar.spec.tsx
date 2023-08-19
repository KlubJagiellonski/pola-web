import { fireEvent, render, screen } from '@testing-library/react';
import 'jest';
import 'jest-expect-message';

import React from 'react';

import { ScoreBar } from './ScoreBar';

describe('Score Bar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when value is number', () => {
    test('should show correct value with unit and progress bar', () => {
      // given
      const scoreBar = render(<ScoreBar value={50} unit="%" />);
      const valueBar = screen.findByTestId('value-belt');

      // then
      expect(scoreBar.getByText('50 %'), 'incorrect label').toBeTruthy();
      valueBar.then((element) => {
        expect(getComputedStyle(element).width, 'incorrect value width').toBe('50%');
      });
    });
  });

  describe('when has null value', () => {
    test('should show zero and no progress bar', () => {
      // given
      const scoreBar = render(<ScoreBar value={null} unit="%" />);
      const valueBar = screen.findByTestId('value-belt');

      // then
      expect(scoreBar.getByText('0 %'), 'incorrect label').toBeTruthy();
      valueBar.then((element) => {
        expect(getComputedStyle(element).width, 'incorrect value width').toBe('0%');
      });
    });
  });

  describe('when value is undefined', () => {
    test('should show missing value and no progress bar', () => {
      // given
      const placeholder = 'there is no value';
      const scoreBar = render(<ScoreBar missingValuePlaceholder={placeholder} />);

      // then
      expect(scoreBar.getByText(placeholder), 'incorrect placeholder value').toBeTruthy();
      expect(screen.queryByTestId('value-belt'), 'there should not be progress bar').toBeFalsy();
    });
  });
});

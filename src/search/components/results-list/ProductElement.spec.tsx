import { IProductData, mockProductData } from '../../../search';
import { render, screen } from '@testing-library/react';
import 'jest';
import 'jest-expect-message';

import React from 'react';

import { SearchResultElement } from './ProductElement';

describe('Product Element', () => {
  let product: IProductData;
  beforeEach(() => {
    product = mockProductData;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when correct product data is loaded', () => {
    test('should render correct product details', () => {
      // given
      const productElement = render(<SearchResultElement product={product} onSelect={() => {}} />);
      const valueBar = screen.findByTestId('value-belt');

      // then
      expect(productElement.getByText('test product'), 'incorrect product name').toBeTruthy();
      expect(productElement.getByText('product manufacturer'), 'incorrect product manufacturer').toBeTruthy();
      expect(productElement.getByText('80 pkt'), 'incorrect Pola score').toBeTruthy();
      valueBar.then((element) => {
        expect(getComputedStyle(element).width, 'incorrect Pola score bar').toBe('80%');
      });
    });
  });

  describe('when loads product data without Pola score', () => {
    test('should render zero points in Pola score', () => {
      // given
      product.company!.score = null;
      const productElement = render(<SearchResultElement product={product} onSelect={() => {}} />);

      // then
      expect(productElement.getByText('test product'), 'incorrect product name').toBeTruthy();
      expect(productElement.getByText('product manufacturer'), 'incorrect product manufacturer').toBeTruthy();
      expect(productElement.queryByText('0 pkt'), 'Pola score should be zero for null values').toBeTruthy();
    });
  });

  describe('when loads product without company', () => {
    test('should render missing Pola score', () => {
      // given
      delete product.company;
      const productElement = render(<SearchResultElement product={product} onSelect={() => {}} />);

      // then
      expect(productElement.getByText('test product'), 'incorrect product name').toBeTruthy();
      expect(productElement.getByText('nieznany producent'), 'There should be no manufacturer').toBeTruthy();
      expect(productElement.queryByText('pkt'), 'There should not be points for missing company').toBeFalsy();
      expect(productElement.getByText('Brak wyniku w rankingu Poli'), 'incorrect placeholder message').toBeTruthy();
    });
  });
});

import { SearchStateName } from '../../state/search-reducer';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

import { DynamicProductResults } from './DynamicProductResults';

jest.mock('./SearchResultsList', () => ({
  SearchResultsList: ({ results }) => (
    <div data-testid="results-list">
      {results.map((result) => (
        <div key={result.code}>{result.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('./SearchResultsHeader', () => ({
  SearchResultsHeader: ({ phrase, totalItems }) => (
    <div data-testid="results-header">
      {phrase} - {totalItems}
    </div>
  ),
}));

describe('DynamicProductResults', () => {
  const defaultProps = {
    state: SearchStateName.LOADED,
    pages: [],
    onSelect: jest.fn(),
    onLoadMore: jest.fn(),
  };

  const mockProducts = [
    { code: '1234567890123', name: 'Test Product 1' },
    { code: '1234567890124', name: 'Test Product 2' },
  ];

  it('renders loading button when in loading state', () => {
    render(<DynamicProductResults {...defaultProps} state={SearchStateName.LOADING} />);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('spinner'));
  });

  it('renders "no more results" button when at results end', () => {
    render(<DynamicProductResults {...defaultProps} state={SearchStateName.RESULTS_END} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Brak kolejnych wyników');
  });

  it('renders "load more" button in default state', () => {
    render(<DynamicProductResults {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Wczytaj więcej');
  });

  it('calls onLoadMore when load more button is clicked', () => {
    render(<DynamicProductResults {...defaultProps} />);

    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onLoadMore).toHaveBeenCalled();
  });

  it('renders search results when totalItems > 0', () => {
    render(<DynamicProductResults {...defaultProps} pages={mockProducts} totalItems={2} phrase="test" />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('shows MissingProductInfo by default', () => {
    render(<DynamicProductResults {...defaultProps} />);

    expect(screen.getByTestId('missing-product-info')).toBeInTheDocument();
  });

  it('hides MissingProductInfo when hideMissingProductInfo is true', () => {
    render(<DynamicProductResults {...defaultProps} hideMissingProductInfo={true} />);

    expect(screen.queryByTestId('missing-product-info')).not.toBeInTheDocument();
  });

  it('displays search header with correct phrase and total items', () => {
    render(<DynamicProductResults {...defaultProps} phrase="test phrase" totalItems={5} />);

    expect(screen.getByText(/test phrase/i)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });
});

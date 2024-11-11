import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import React from 'react';
import { Provider } from 'react-redux';

import { PageType } from 'app/website';

import { SearchStateName } from '../search/state/search-reducer';

import ProductsPage from './products';

const mockStore = configureStore([]);
const mockNavigateTo = jest.fn();

// Mock the navigation utility
jest.mock('@Utils/browser', () => ({
  navigateTo: (url: string) => mockNavigateTo(url),
}));

describe('ProductsPage', () => {
  const defaultProps = {
    location: { pathname: '/products' },
  };

  const createMockStore = (customState = {}) => {
    const defaultState = {
      app: {
        activePage: PageType.PRODUCTS,
      },
      search: {
        stateName: SearchStateName.INITIAL,
        phrase: '',
        resultPages: [],
        totalItems: 0,
      },
      ...customState,
    };

    return mockStore(defaultState);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search form', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ProductsPage {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('Lista produktów')).toBeInTheDocument();
  });

  it('shows loading state when searching', () => {
    const store = createMockStore({
      search: {
        stateName: SearchStateName.LOADING,
      },
    });

    render(
      <Provider store={store}>
        <ProductsPage {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to home when no search results and not on products page', () => {
    const store = createMockStore({
      app: {
        activePage: PageType.HOME,
      },
    });

    render(
      <Provider store={store}>
        <ProductsPage {...defaultProps} />
      </Provider>
    );

    expect(mockNavigateTo).toHaveBeenCalled();
  });

  it('displays search results when available', () => {
    const store = createMockStore({
      search: {
        stateName: SearchStateName.LOADED,
        phrase: 'test',
        resultPages: [{ products: [{ id: 1, name: 'Test Product' }] }],
        totalItems: 1,
      },
    });

    render(
      <Provider store={store}>
        <ProductsPage {...defaultProps} />
      </Provider>
    );

    // Add assertions for DynamicProductResults
  });
});

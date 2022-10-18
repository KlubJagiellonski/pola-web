import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { EAN, IProductData } from '@Domain/products';
import { reduceToFlatProductsList } from '@Domain/products/search-service';
import { PageType, urls } from '@Domain/website';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import { searchDispatcher } from '@State/search/search-dispatcher';
import { SearchStateName } from '@State/search/search-reducer';
import { IPolaState } from '@State/types';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import { navigateTo } from '@Utils/browser';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { DynamicProductResults } from '../search/results-list/DynamicProductResults';

interface IProductsPage {
  location?: Location;
  searchState: SearchStateName;
  searchResults?: {
    phrase: string;
    token: string;
    pages: IProductData[];
    totalItems: number;
  };

  onLoadMore: () => void;
  selectProduct: (code: EAN) => void;
}

const ProductsPage = (props: IProductsPage) => {
  const { location, searchState, searchResults, onLoadMore } = props;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.PRODUCTS));
    }
  }, []);

  if (!searchResults) {
    navigateTo(urls.pola.home());
    return null;
  }

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Znalezione produkty" />
      <Placeholder text="Lista produktów" />
      <DynamicProductResults
        {...searchResults}
        state={searchState}
        onSelect={props.selectProduct}
        onLoadMore={onLoadMore}
      />
    </PageLayout>
  );
};

export default connect(
  (state: IPolaState) => {
    const { app, search } = state;
    return {
      searchState: search.stateName,
      searchResults:
        search.stateName !== SearchStateName.INITIAL && search.stateName !== SearchStateName.LOADING
          ? {
              phrase: search.phrase,
              pages: reduceToFlatProductsList(search.resultPages),
              totalItems: search.totalItems,
              token: search.nextPageToken,
            }
          : undefined,
    };
  },
  {
    onLoadMore: searchDispatcher.invokeLoadMore,
    selectProduct: searchDispatcher.selectProduct,
  }
)(ProductsPage);

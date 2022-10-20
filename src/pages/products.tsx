import { PageType, urls } from 'app/website';
import React from 'react';
import { connect } from 'react-redux';

import { EAN, IProductData } from '@Domain/products';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import { navigateTo } from '@Utils/browser';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { DynamicProductResults } from '../search/components/results-list/DynamicProductResults';
import { reduceToFlatProductsList } from '../search/services/search-service';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';

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
  const { searchState, searchResults, onLoadMore } = props;

  if (!searchResults) {
    navigateTo(urls.pola.home());
    return null;
  }

  return (
    <PageLayout location={props.location} page={PageType.PRODUCTS}>
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

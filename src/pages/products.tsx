import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType, urls } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import { navigateTo } from '@Utils/browser';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { DynamicProductResults } from '../search/components/results-list/DynamicProductResults';
import { reduceToFlatProductsList } from '../search/services/search-service';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';
import {PageProps} from "gatsby";

const connector = connect(
  (state: IPolaState) => {
    const { search } = state;
    return {
      searchState: search.stateName,
      searchResults:
        search.stateName !== SearchStateName.INITIAL && search.stateName !== SearchStateName.LOADING
          ? {
              phrase: search.phrase,
              pages: search.resultPages ? reduceToFlatProductsList(search.resultPages) : [],
              totalItems: search.totalItems,
            }
          : undefined,
    };
  },
  {
    onLoadMore: searchDispatcher.invokeLoadMore,
    selectProduct: searchDispatcher.selectProduct,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type IProductsPage = PageProps<any> & ReduxProps & {};

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
      {searchResults && (
        <DynamicProductResults
          {...searchResults}
          state={searchState}
          onSelect={props.selectProduct}
          onLoadMore={onLoadMore}
        />
      )}
    </PageLayout>
  );
};

export default connector(ProductsPage);

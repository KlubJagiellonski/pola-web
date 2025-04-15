import styled from 'styled-components';

import { PageProps } from 'gatsby';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { PageType, urls } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { Spinner } from '@Components/Spinner';
import { PageLayout } from '@Layout/PageLayout';
import { navigateTo } from '@Utils/browser';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { DynamicProductResults } from '../search/components/results-list/DynamicProductResults';
import { reduceToFlatProductsList } from '../search/services/search-service';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';
import { selectedProductDispatcher } from '../search/state/selected-product-dispatcher';
import { SearchForm } from 'search/components/form/SearchForm';

import { Device, color } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => {
    const { app, search } = state;
    return {
      activePage: app.activePage,
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
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    invokeSearch: searchDispatcher.invokeSearch,
    invokeLoadMore: searchDispatcher.invokeLoadMore,
    clearResults: searchDispatcher.clearResults,
    onLoadMore: searchDispatcher.invokeLoadMore,
    selectProduct: selectedProductDispatcher.selectProduct,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type IProductsPage = PageProps<any> & ReduxProps & {};

const SearchContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: 0;
  padding-bottom: 70px;
  position: relative;
  align-items: center;
  flex-flow: row nowrap;
  text-align: left;
  background-color: ${color.background.gray};

  @media ${Device.mobile} {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

const ProductsPage = (props: IProductsPage) => {
  const { searchState, searchResults, onLoadMore, selectProduct } = props;

  if (!searchResults && props.activePage !== PageType.PRODUCTS) {
    const params = new URLSearchParams(props.location.search);
    const eanCode = params.get('ean');
    if (eanCode) {
      navigateTo(urls.pola.home() + `?ean=${eanCode}`);
    } else {
      navigateTo(urls.pola.home());
    }
    return;
  }

  let results = <React.Fragment />;
  switch (searchState) {
    case SearchStateName.INITIAL:
      break;
    case SearchStateName.LOADING:
      results = <Spinner text="Ładowanie..." styles={{ size: 250, color: color.button.red }} />;
      break;
    default:
      results = (
        <DynamicProductResults
          {...searchResults}
          state={searchState}
          onSelect={selectProduct}
          onLoadMore={onLoadMore}
        />
      );
      break;
  }

  return (
    <PageLayout location={props.location} page={PageType.PRODUCTS}>
      <SEOMetadata pageTitle="Znalezione produkty" />
      <Placeholder text="Lista produktów" />
      <SearchContainer>
        <SearchForm
          onInfoClicked={props.toggleSearchInfo}
          onSearch={props.invokeSearch}
          onEmptyInput={props.clearResults}
          searchState={searchState}
          showApps={false}
          variant="centered"
        />
      </SearchContainer>

      <ResultsContainer>{results}</ResultsContainer>
    </PageLayout>
  );
};

export default connector(ProductsPage);

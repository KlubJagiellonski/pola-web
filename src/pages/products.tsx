import styled from 'styled-components';

import { PageProps } from 'gatsby';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { PageType, urls } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import { navigateTo } from '@Utils/browser';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { DynamicProductResults } from '../search/components/results-list/DynamicProductResults';
import { reduceToFlatProductsList } from '../search/services/search-service';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';
import { SearchForm } from 'search/components/form/SearchForm';

import { Device, color, introHeight } from '@Styles/theme';

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
    selectProduct: searchDispatcher.selectProduct,
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

const ProductsPage = (props: IProductsPage) => {
  const { searchState, searchResults, onLoadMore } = props;

  if (!searchResults && props.activePage !== PageType.PRODUCTS) {
    navigateTo(urls.pola.home());
    return null;
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
          showApps={true}
          variant="centered"
        />
      </SearchContainer>

      {searchState === SearchStateName.LOADING ? (
        <div>Loading...</div>
      ) : (
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

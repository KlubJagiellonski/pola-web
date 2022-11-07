import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import SEOMetadata from '../../utils/browser/SEOMetadata';
import { IPolaState } from '../../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../../state/app/app-actions';
import { PageType, urls } from '../../domain/website';
import { PageSection } from '../../layout/PageSection';
import { ResponsiveImage } from '../../components/images/ResponsiveImage';
import { color, Device, fontSize, introHeight, lineHeight, margin, padding, pageWidth } from '../../styles/theme';
import styled from 'styled-components';
import BusinessTemplates from '../../templates/BusinessTemplate';
import { WebViewLayout } from 'layout/WebViewLayout';
import { reduceToFlatProductsList } from 'domain/products/search-service';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import { SearchForm } from 'search/form/SearchForm';
import { appDispatcher } from 'state/app/app-dispatcher';
import { searchDispatcher } from 'state/search/search-dispatcher';
import { SearchStateName } from 'state/search/search-reducer';
import { Article } from 'domain/articles';
import { Friend } from 'domain/friends';
import { ISearchResults, EAN } from 'domain/products';
import { DynamicProductResults } from 'search/results-list/DynamicProductResults';
import { ErrorBoundary } from '@sentry/gatsby';
import { SearchInput } from 'search/form/SearchInput';
import { TitleSection } from 'styles/GlobalStyle.css';

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  @media ${Device.mobile} {
    padding: ${padding.normal};
  }
  @media ${Device.desktop} {
    padding: ${padding.normal} 0;
    max-width: ${pageWidth};
  }
`;

const Background = styled.div<{ img?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  div {
    width: 100%;
    height: 100%;
  }

  opacity: 0.4;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 100%;
  padding-top: ${introHeight};
  padding-bottom: 70px;
  position: relative;
  text-align: left;

  @media ${Device.mobile} {
    padding: 100px 0 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const SearchTitle = styled(TitleSection)`
  font-size: ${fontSize.big};
  line-height: ${lineHeight.big};
  text-align: left;
  margin: 0 0 0.7em 0;

  @media ${Device.mobile} {
    width: 100%;
    text-align: center;
    margin-bottom: ${margin.normal};
  }
`;

const WrapperResult = styled(PageSection)`
  @media ${Device.mobile} {
    position: realtive;
    top: -18em;
    background-color: ${color.background.white};
    margin-left: 5px;
  }
`;

const connector = connect(
  (state: IPolaState) => {
    const { search, newsletter, articles, friends } = state;
    return {
      searchState: search.stateName,
      searchResults:
        search.stateName === SearchStateName.LOADED || search.stateName === SearchStateName.SELECTED
          ? {
              pages: reduceToFlatProductsList(search.resultPages),
              phrase: search.phrase,
              products: reduceToFlatProductsList(search.resultPages),
              totalItems: search.totalItems,
              token: search.nextPageToken,
            }
          : undefined,
      newsletterStatus: newsletter.status,
      follower: newsletter.status !== 'initial' ? newsletter.follower : undefined,
      articles: articles.data,
      friends: friends.data,
    };
  },
  {
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    invokeSearch: searchDispatcher.invokeSearch,
    invokeLoadMore: searchDispatcher.invokeLoadMore,
    clearResults: searchDispatcher.clearResults,
    selectProduct: searchDispatcher.selectProduct,
    onLoadMore: searchDispatcher.invokeLoadMore,
    subscribeEmail: newsletterDispatcher.requestSubscriptionForEmail,
    clearForm: newsletterDispatcher.clearSubscriptionFormData,
  }
);

type ISearchPage = ConnectedProps<typeof connector> & {
  location?: Location;
  searchState: SearchStateName;
  searchResults?: ISearchResults;
  articles?: Article[];
  activeTags: string[];
  friends?: Friend[];

  toggleSearchInfo: () => void;
  invokeSearch: (phrase: string) => void;
  invokeLoadMore: () => void;
  subscribeEmail: (email: string, name?: string | undefined) => void;
  clearResults: () => void;
  selectProduct: (code: EAN) => void;
  onLoadMore: () => void;
};

const SearchPage = (props: ISearchPage) => {
  const { location, searchState, searchResults, subscribeEmail, clearForm, newsletterStatus, follower, onLoadMore } =
    props;
  const dispatch = useDispatch();
  const isLoading = searchState === SearchStateName.LOADING;

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.BUSINESS));
    }
  }, []);

  return (
    <WebViewLayout styles={{ marginTop: padding.big }}>
      <SEOMetadata pageTitle="Wyszukiwarka tekstowa" />
      <PageSection size="full" styles={{ backgroundColor: color.background.search }}>
        <Background>
          <ResponsiveImage imageSrc={'background2.jpg'} />
        </Background>
        <Content>
          <ErrorBoundary scope="search-container">
            <SearchContainer>
              <SearchTitle>Sprawdź informacje o produkcie</SearchTitle>
              <SearchInput
                onInfoClicked={props.toggleSearchInfo}
                onSearch={props.invokeSearch}
                onEmptyInput={props.clearResults}
                disabled={isLoading}
              />
            </SearchContainer>
          </ErrorBoundary>
        </Content>
      </PageSection>
      <WrapperResult>
        {searchResults && (
          <DynamicProductResults
            {...searchResults}
            state={searchState}
            onSelect={props.selectProduct}
            onLoadMore={onLoadMore}
          />
        )}
      </WrapperResult>
    </WebViewLayout>
  );
};

export default connector(SearchPage);

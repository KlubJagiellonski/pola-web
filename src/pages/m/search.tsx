import { ResponsiveImage } from '../../components/images/ResponsiveImage';
import { PageSection } from '../../layout/PageSection';
import { Device, color, fontSize, introHeight, lineHeight, margin, padding, pageWidth } from '../../styles/theme';
import SEOMetadata from '../../utils/browser/SEOMetadata';
import { IFriendData } from 'friends';
import { IArticleData } from 'posts';
import { EAN, ISearchResults } from 'search';
import styled from 'styled-components';
import { TitleSection } from 'styles/GlobalStyle.css';

import React from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { loadBrowserLocation, selectActivePage } from '@App/state/app-reducer';
import { PageType } from '@App/website';

import { WebViewLayout } from 'layout/WebViewLayout';
import ErrorBoundary from 'utils/error-boundary';

import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import { SearchInput } from 'search/components/form/SearchInput';
import { DynamicProductResults } from 'search/components/results-list/DynamicProductResults';
import { reduceToFlatProductsList } from 'search/services/search-service';
import { searchDispatcher } from 'search/state/search-dispatcher';
import { SearchStateName } from 'search/state/search-reducer';

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
  articles?: IArticleData[];
  activeTags: string[];
  friends?: IFriendData[];

  toggleSearchInfo: () => void;
  invokeSearch: (phrase: string) => void;
  invokeLoadMore: () => void;
  subscribeEmail: (email: string, name?: string | undefined) => void;
  clearResults: () => void;
  selectProduct: (code: EAN) => void;
  onLoadMore: () => void;
};

const SearchPage = (props: ISearchPage) => {
  const { location, searchState, searchResults, onLoadMore } = props;
  const dispatch = useDispatch();
  const isLoading = searchState === SearchStateName.LOADING;

  React.useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(PageType.BUSINESS));
    }
  }, []);

  return (
    <WebViewLayout>
      <SEOMetadata pageTitle="Wyszukiwarka tekstowa" />
      <PageSection size="full" styles={{ backgroundColor: color.background.search }}>
        <Background>
          <ResponsiveImage title="search background" imageSrc={'background2.jpg'} />
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
            hideMissingProductInfo={true}
          />
        )}
      </WrapperResult>
    </WebViewLayout>
  );
};

export default connector(SearchPage);

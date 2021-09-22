import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { SearchForm } from '../search/form/SearchForm';
import Contents from '../components/Contents';
import { PageSection } from '../layout/PageSection';
import { Device, pageWidth, padding, color } from '../styles/theme';
import { IPolaState } from '../state/types';
import { searchDispatcher } from '../state/search/search-dispatcher';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { IProductData } from '../domain/products';
import { ResponsiveImage } from '../components/images/ResponsiveImage';
import { IFriend } from '../domain/friends';
import { SearchResultsList } from '../search/results-list/SearchResultsList';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { ButtonColor } from '../styles/button-theme';
import { SearchResultsHeader } from '../search/results-list/SearchResultsHeader';
import { PageType, urls } from '../domain/website';
import { Article } from '../domain/articles';
import { reduceSearchResults } from '../domain/products/search-service';
import { SearchStateName } from '../state/search/search-reducer';
import { MissingProductInfo } from '../search/results-list/MissingProductInfo';
import { FirstPageResults } from '../search/results-list/FirstPageResults';

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

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

  @media ${Device.mobile} {
    opacity: 0.2;
  }
`;

const WrapperContents = styled(PageSection)`
  @media ${Device.mobile} {
    padding: 0;
  } 
`

interface IHomePage {
  location?: Location;
  searchState: SearchStateName;
  searchResults?: ISearchResults;
  articles?: Article[];
  activeTags: string[];
  friends?: IFriend[];

  invokeSearch: (phrase: string) => void;
  invokeLoadMore: () => void;
  clearResults: () => void;
  selectProduct: (code: string) => void;
}

const HomePage = (props: IHomePage) => {
  const { location, searchState, searchResults } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.HOME));
    }
  }, []);

  const isLoading = searchState === SearchStateName.LOADING;

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Strona główna" />
      <PageSection size="full" styles={{ backgroundColor: color.background.search }}>
        <Background>
          <ResponsiveImage imageSrc={'background.png'} />
        </Background>
        <Content>
          <SearchForm onSearch={props.invokeSearch} isLoading={isLoading} />
        </Content>
      </PageSection>
      {searchResults && <FirstPageResults {...searchResults} state={searchState} onSelect={props.selectProduct} onClear={props.clearResults} />}
      <WrapperContents>
        <Contents articles={props.articles?.slice(0, 3)} friends={props.friends} />
      </WrapperContents>
    </PageLayout>
  );
};

export default connect(
  (state: IPolaState) => {
    const { app, search, articles, friends } = state;
    return {
      location: app.location,
      searchState: search.stateName,
      searchResults: search.stateName !== SearchStateName.INITIAL && search.stateName !== SearchStateName.LOADING ? {
        phrase: search.phrase,
        pages: reduceSearchResults(search.resultPages),
        totalItems: search.totalItems,
        token: search.nextPageToken,
      } : undefined,
      articles: articles.data,
      friends: friends.data,
    }
  },
  {
    invokeSearch: searchDispatcher.invokeSearch,
    invokeLoadMore: searchDispatcher.invokeLoadMore,
    clearResults: searchDispatcher.clearResults,
    selectProduct: searchDispatcher.selectProduct,
  }
)(HomePage);

import React from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ArticleData } from '@Domain/articles';
import { FriendData } from '@Domain/friends';
import { EAN, ISearchResults } from '@Domain/products';
import { PageType, urls } from '@Domain/website';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import { appDispatcher } from '@State/app/app-dispatcher';
import { IPolaState } from '@State/types';

import About from '@Components/About';
import DevelopmentSection from '@Components/DevelopmentSection';
import { InfoBox } from '@Components/InfoBox';
import Teams from '@Components/Teams';
import TeamsFriend from '@Components/TeamsFriend';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import SocialMedia from '@Components/social-media/SocialMedia';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import Friends from '../friends/components/Friends';
import { newsletterDispatcher } from '../newsletter/state/newsletter-dispatcher';
import ArticlesListPreview from '../posts/articles/list/ArticlesListPreview';
import { SearchForm } from '../search/components/form/SearchForm';
import { FirstPageResults } from '../search/components/results-list/FirstPageResults';
import { SearchResultsHeader } from '../search/components/results-list/SearchResultsHeader';
import { reduceToFlatProductsList } from '../search/services/search-service';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';

import { Device, color, padding, pageWidth } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => {
    const { search, newsletter, articles, friends } = state;
    return {
      searchState: search.stateName,
      searchResults:
        search.stateName === SearchStateName.LOADED || search.stateName === SearchStateName.SELECTED
          ? {
              phrase: search.phrase,
              products: reduceToFlatProductsList(search.resultPages),
              totalItems: search.totalItems,
              token: search.nextPageToken,
            }
          : undefined,
      newsletterStatus: newsletter.status,
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
    subscribeEmail: newsletterDispatcher.subscribeEmail,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

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

const WrapperContents = styled(PageSection)`
  @media ${Device.mobile} {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-top: ${padding.normal};
  display: grid;
  grid-gap: 15px;
  grid-template-areas:
    'articles development'
    'articles social-media'
    'articles about'
    'friends friends'
    'teams-friend teams';

  @media ${Device.mobile} {
    margin: 0;
    padding: 0;
    grid-gap: 0px;
    grid-template-areas:
      'development'
      'articles'
      'about'
      'social-media'
      'friends'
      'teams-friend'
      'teams';
  }
`;

type IHomePage = ReduxProps & {
  location?: Location;
  searchState: SearchStateName;
  searchResults?: ISearchResults;
  articles?: ArticleData[];
  activeTags: string[];
  friends?: FriendData[];

  toggleSearchInfo: () => void;
  invokeSearch: (phrase: string) => void;
  invokeLoadMore: () => void;
  clearResults: () => void;
  selectProduct: (code: EAN) => void;
};

const HomePage = (props: IHomePage) => {
  const { location, searchState, searchResults, subscribeEmail, newsletterStatus } = props;
  const dispatch = useDispatch();
  const freshArticles = props.articles?.slice(0, 3);
  const isLoaded = searchState === SearchStateName.LOADED || searchState === SearchStateName.SELECTED;
  const isLoading = searchState === SearchStateName.LOADING;
  const isError = searchState === SearchStateName.ERROR;

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.HOME));
      props.clearResults();
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Strona główna" />
      <PageSection size="full" styles={{ backgroundColor: color.background.search }}>
        <Background>
          <ResponsiveImage imageSrc={'background2.jpg'} />
        </Background>

        <Content>
          <SearchForm
            onInfoClicked={props.toggleSearchInfo}
            onSearch={props.invokeSearch}
            onEmptyInput={props.clearResults}
            isLoading={isLoading}
          />
        </Content>
      </PageSection>
      <PageSection>
        {(isLoaded || isLoading) && (
          <SearchResultsHeader
            phrase={searchResults?.phrase}
            totalItems={searchResults?.totalItems}
            searchState={searchState}
            resultsUrl={searchResults && searchResults.totalItems > 0 ? urls.pola.products() : undefined}
          />
        )}
        {searchResults && (
          <FirstPageResults
            {...searchResults}
            isLoaded={isLoaded}
            isLoading={isLoading}
            onSelect={props.selectProduct}
            onClear={props.clearResults}
          />
        )}
        {isError && (
          <InfoBox>
            <h3>Błąd Wyszukiwania</h3>
            <p>Spróbuj wprowadzić inną frazę...</p>
          </InfoBox>
        )}
      </PageSection>
      <WrapperContents>
        <Wrapper>
          <ArticlesListPreview articles={freshArticles} />
          <DevelopmentSection />
          <SocialMedia />
          <About />
          <Friends friends={props.friends} />
          <Teams />
          <TeamsFriend />
        </Wrapper>
      </WrapperContents>
    </PageLayout>
  );
};

export default connector(HomePage);

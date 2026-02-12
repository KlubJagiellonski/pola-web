import { IFriendData } from 'friends';
import { IArticleData } from 'posts';
import { EAN, ISearchResults } from 'search';
import styled from 'styled-components';

import { PageProps } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { PageType, urls } from '@App/website';

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

import Friends from 'friends/components/Friends';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import ArticlesListPreview from 'posts/articles/list/ArticlesListPreview';
import { SearchForm } from 'search/components/form/SearchForm';
import { FirstPageResults } from 'search/components/results-list/FirstPageResults';
import { SearchResultsHeader } from 'search/components/results-list/SearchResultsHeader';
import { reduceToFlatProductsList } from 'search/services/search-service';
import { searchDispatcher } from 'search/state/search-dispatcher';
import { SearchStateName, checkLoaded } from 'search/state/search-reducer';
import { selectedProductDispatcher } from 'search/state/selected-product-dispatcher';

import { Device, color, margin, padding, pageWidth } from '@Styles/theme';
import MyModal from '../components/Modal';

const connector = connect(
  (state: IPolaState) => {
    const { search, newsletter, articles, friends } = state;
    return {
      searchState: search.stateName,
      searchResults:
        search.stateName === SearchStateName.LOADED // || search.stateName === SearchStateName.SELECTED
          ? {
              phrase: search.phrase,
              products: reduceToFlatProductsList(search.resultPages),
              totalItems: search.totalItems,
              token: search.nextPageToken,
            }
          : undefined,
      newsletterStatus: newsletter.status,
      follower: newsletter.status !== 'initial' ? newsletter.follower : undefined,
      friends: friends.data,
      articles: articles.data,
    };
  },
  {
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    invokeSearch: searchDispatcher.invokeSearch,
    invokeLoadMore: searchDispatcher.invokeLoadMore,
    clearResults: searchDispatcher.clearResults,
    selectProduct: selectedProductDispatcher.selectProduct,
    subscribeEmail: newsletterDispatcher.requestSubscriptionForEmail,
    clearForm: newsletterDispatcher.clearSubscriptionFormData,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

const Content = styled.div<{ isSearchLoaded: boolean }>`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  @media ${Device.mobile} {
    padding: ${(props) => (props.isSearchLoaded ? '0' : padding.normal)};
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

const WrapperResult = styled(PageSection)`
  @media ${Device.mobile} {
    position: realtive;
    //top: -18em; // because results should be visible immediately on mobile screen
    background-color: ${color.background.white};
    margin-left: 5px;
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

const NewsletterContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 1rem;
`;

const SearchHeading = styled.h1`
  color: ${color.text.main};
  margin: 15px 0 ${margin.small} 0;
`;

const SearchDescription = styled.p`
  margin: 0 0 ${margin.normal} 0;
  color: ${color.text.main};
  font-weight: 600;
`;

const SeoSection = styled.section`
  width: 100%;
  padding: 3.5rem 1rem;

  background: ${color.background.light};

  @media ${Device.desktop} {
    padding: 4rem 0;
  }
`;

const SeoInner = styled.div`
  max-width: ${pageWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  overflow-x: hidden;

  @media ${Device.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SeoHeading = styled.h2`
  font-size: 2rem;
  line-height: 1.2;
  color: ${color.text.main};
  font-weight: 700;

  @media ${Device.mobile} {
    font-size: 1.6rem;
  }
`;

const SeoParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${color.text.secondary};
  margin-bottom: 1.25rem;
`;


type IHomePage = PageProps<any> &
  ReduxProps & {
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
  };

const HomePage = (props: IHomePage) => {
  const { searchState, searchResults, subscribeEmail, clearForm, newsletterStatus, follower } = props;
  const freshArticles = props.articles?.slice(0, 3);
  const isLoaded = checkLoaded(searchState);
  const isLoading = searchState === SearchStateName.LOADING;
  const isError = searchState === SearchStateName.ERROR;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => setIsModalOpen(true), 1000); // np. 1s opóźnienie
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout location={props.location} page={PageType.HOME}>
      <SEOMetadata pageTitle="Pola – wybieraj polskie produkty, wspieraj polskie firmy" />
      <PageSection size="full" styles={{ backgroundColor: color.background.search }}>
        <Background>
          <ResponsiveImage title="main background" imageSrc={'background2.jpg'} />
        </Background>
        <Content isSearchLoaded={isLoaded}>
          <SearchHeading as="h1">
           Pola – wyszukiwarka polskich produktów wspierająca patriotyzm gospodarczy
          </SearchHeading>
          <SearchDescription>
            Pola to bezpłatna aplikacja mobilna. Każda „Polska firma” jest wysoko oceniania. Dzięki niej znajdziesz też prawdziwy „Produkt Polski”.
          </SearchDescription>
          <SearchForm
            onInfoClicked={props.toggleSearchInfo}
            onSearch={props.invokeSearch}
            onEmptyInput={props.clearResults}
            searchState={searchState}
            showApps={true}
            variant={isLoaded ? 'centered' : 'wide'}
          />
          {!isLoaded && (
            <NewsletterContainer className="newsletter-container">
              <SubscribeDialog
                status={newsletterStatus}
                follower={follower}
                styles={{ spaceBottom: margin.small }}
                onSubmit={subscribeEmail}
                onClear={clearForm}
                stopExpanded={!!searchResults}
              />
            </NewsletterContainer>
          )}
        </Content>
      </PageSection>
      <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WrapperResult>
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
      </WrapperResult>
      <PageSection>
        <SeoSection>
          <SeoInner>
          <SeoHeading>
            Polskie produkty i patriotyzm gospodarczy
            <br />
            w codziennych zakupach
          </SeoHeading>
          <SeoParagraph>
              Patriotyzm gospodarczy to świadomy wybór produktów i usług, które realnie
              wspierają rozwój polskiej gospodarki, miejsc pracy oraz rodzimych firm.
              W praktyce oznacza to sięganie po polskie produkty – nie tylko z polskim
              kodem kreskowym, ale rzeczywiście wytwarzane przez firmy działające w Polsce.
          </SeoParagraph>

          <SeoParagraph>
              Aplikacja i wyszukiwarka Pola pomagają sprawdzić pochodzenie produktów
              dostępnych na sklepowych półkach. Dzięki analizie danych o producencie możesz szybko sprawdzić, czy dany zakup wspiera
              polską gospodarkę.
          </SeoParagraph>

          <SeoParagraph>
              Korzystając z Poli, wspierasz świadomą konsumpcję i rozwój patriotyzmu
              gospodarczego – bez rezygnowania z wygody codziennych zakupów.
          </SeoParagraph>
          </SeoInner>
        </SeoSection>
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

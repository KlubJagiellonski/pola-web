import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { SearchForm } from '../search/form/SearchForm';
import Contents from '../components/Contents';
import { PageSection } from '../layout/PageSection';
import { Device, pageWidth, padding, margin, color, fontSize } from '../styles/theme';
import { IPolaState } from '../state/types';
import { searchDispatcher } from '../state/search/search-dispatcher';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { IProductData } from '../domain/products';
import { ResponsiveImage } from '../components/images/ResponsiveImage';
import { IFriend } from '../domain/friends';
import { SearchResultsList } from '../search/results-list/SearchResultsList';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { SecondaryButton } from '../components/buttons/SecondaryButton';
import { ButtonColor } from '../styles/button-theme';
import { SearchResultsHeader } from '../search/results-list/SearchResultsHeader';
import { openNewTab } from '../utils/browser';
import { PageType, urls } from '../domain/website';
import { Article } from '../domain/articles';
import { reduceSearchResults } from '../domain/products/search-service';
import { SearchStateName } from '../state/search/search-reducer';

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
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;

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

const MissingProductInfo = styled.div`
  background-color: ${color.background.red};
  color: ${color.text.light};
  text-align: center;
  font-size: ${fontSize.big};
  padding: ${padding.normal};
  margin-top: ${margin.big};
`;

interface IHomePage {
    searchState: SearchStateName;

    location?: Location;
    phrase?: string;
    loadedSearchResults?: IProductData[];
    totalItems: number;
    token?: string;
    articles?: Article[];
    activeTags: string[];
    friends?: IFriend[];

    invokeSearch: (phrase: string) => void;
    invokeLoadMore: () => void;
    clearResults: () => void;
    selectProduct: (code: string, id: string) => void;
}

const HomePage = (props: IHomePage) => {
    const { phrase, loadedSearchResults, totalItems, location, searchState } = props;
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (location) {
            dispatch(LoadBrowserLocation(location));
            dispatch(SelectActivePage(PageType.HOME));
        }
    }, []);

    const handleCancel = () => {
        props.clearResults();
    };

    const emptyResults = !loadedSearchResults || loadedSearchResults.length < 1;
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
            <SearchResultsHeader
                phrase={phrase}
                totalItems={totalItems}
                searchState={searchState}
                resultsUrl={urls.pola.products}
            />
            {!emptyResults && (
                <PageSection>
                    <SearchResultsList
                        results={loadedSearchResults}
                        totalItems={totalItems}
                        actions={
                            <PrimaryButton color={ButtonColor.Gray} onClick={handleCancel}>
                                <span>Anuluj</span>
                            </PrimaryButton>
                        }
                        onSelect={props.selectProduct}
                    />
                    <MissingProductInfo>
                        <p>Nie znalazłeś czego szukasz?</p>
                        <SecondaryButton
                            onClick={() => openNewTab(urls.external.openFoods)}
                            color={ButtonColor.Red}
                            fontSize={fontSize.small}>
                            Zgłoś produkt do bazy
                        </SecondaryButton>
                    </MissingProductInfo>
                </PageSection>
            )}
            <WrapperContents>
                <Contents articles={props.articles?.slice(0, 3)} friends={props.friends} />
            </WrapperContents>
        </PageLayout>
    );
};

export default connect(
    (state: IPolaState) => ({
        searchState: state.search.stateName,

        location: state.app.location,
        phrase: state.search.phrase,
        loadedSearchResults: reduceSearchResults(state.search.resultPages),
        totalItems: state.search.totalItems,
        articles: state.articles.data,
        friends: state.friends.data,
    }),
    {
        invokeSearch: searchDispatcher.invokeSearch,
        invokeLoadMore: searchDispatcher.invokeLoadMore,
        clearResults: searchDispatcher.clearResults,
        selectProduct: searchDispatcher.selectProduct,
    }
)(HomePage);

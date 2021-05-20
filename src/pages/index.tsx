import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PageLayout } from '../layout/PageLayout';
import SEO from '../layout/seo';
import './index.css';
import { SearchContainer } from '../components/search';
import Contents from '../components/Contents';
import { PageSection } from '../layout/PageSection';
import { Device, pageWidth, padding, color } from '../styles/theme';
import { IPolaState } from '../state/types';
import { searchDispatcher } from '../state/search/search-dispatcher';
import { LoadBrowserLocation } from '../state/app/app-actions';
import { IProductData } from '../domain/products';
import { IArticle } from '../domain/articles';
import { ResponsiveImage } from '../components/responsive-image';

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  @media ${Device.mobile} {
    padding: ${padding.normal};
  }
  @media ${Device.desktop} {
    padding: ${padding.normal} 0;
    max-width: ${pageWidth};
  }
`;

export const Background = styled.div<{ img?: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: red;
  
  div{
    width: 100%;
    height: 100%;
  }
`

interface IMainPage {
  location: Location;
  searchResults: IProductData[];
  token?: string;
  isLoading?: boolean;
  articles?: IArticle[];

  invokeSearch: (phrase: string) => void;
  invokeLoadMore: () => void;
  selectProduct: (code: string) => void;
}

const MainPage = (props: IMainPage) => {
  const { searchResults, location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(LoadBrowserLocation(location));
  }, []);

  return (
    <PageLayout>
      <SEO title="Pola Web | Strona główna" />
      <PageSection size='full' backgroundColor={color.dark}>
        <Background>
          <ResponsiveImage imageSrc={'background.png'}/>
        </Background>
        <Content>
          <SearchContainer
            searchResults={searchResults}
            onSearch={props.invokeSearch}
            token={props.token}
            isLoading={props.isLoading}
            onLoadMore={props.invokeLoadMore}
            onSelect={props.selectProduct}
          />
        </Content>
      </PageSection>
      <PageSection>
        <Contents articles={props.articles} />
      </PageSection>
    </PageLayout>
  );
};

export default connect(
  (state: IPolaState) => ({
    searchResults: state.search.products,
    token: state.search.token,
    isLoading: state.search.isLoading,
    articles: state.articles.data,
  }),
  {
    invokeSearch: searchDispatcher.invokeSearch,
    invokeLoadMore: searchDispatcher.invokeLoadMore,
    selectProduct: searchDispatcher.selectProduct,
  }
)(MainPage);

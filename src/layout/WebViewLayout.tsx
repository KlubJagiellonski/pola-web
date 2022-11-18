import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { IPolaState } from '../state/types';
import { appDispatcher } from '../state/app/app-dispatcher';
import { ProductModal } from '../search/product-modal';
import { searchDispatcher } from '../state/search/search-dispatcher';
import ErrorBoundary from '../utils/error-boundary';
import { desktopHeaderHeight, Device, mobileHeaderHeight } from '../styles/theme';
import { StateLoader } from './StateLoader';
import '../styles/pola-web.css';
import { SearchStateName } from '../state/search/search-reducer';
import { SearchInfoModal } from '../search/form/SearchInfoModal';
import { CustomScrollbarDiv } from './CustomScrollbar';

const connector = connect(
  (state: IPolaState) => {
    const { app, search } = state;
    return {
      isSearchInfoVisible: app.isSearchInfoVisible,
      activePage: app.activePage,
      selectedProduct: search.stateName === SearchStateName.SELECTED ? search.selectedProduct : undefined,
    };
  },
  {
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    unselectProduct: searchDispatcher.unselectProduct,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ILayoutStyles = {
  marginTop?: string;
};

type IPageLayout = ReduxProps & {
  styles?: ILayoutStyles;
};

const LayoutContainer = styled(CustomScrollbarDiv)`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const PageContent = styled.main<ILayoutStyles>`
  width: 100%;
  margin: 0 auto;
  margin-top: 0;
  padding: 0;
  flex: 1 1 auto;
`;

const Layout: React.FC<IPageLayout> = ({
  isSearchInfoVisible,
  selectedProduct,
  children,
  toggleSearchInfo,
  unselectProduct,
  styles,
}) => (
  <ErrorBoundary scope="webview-layout">
    <StateLoader />
    <LayoutContainer id="layout-container">
      {selectedProduct && <ProductModal product={selectedProduct} onClose={unselectProduct} />}
      {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
      <PageContent {...styles}>{children}</PageContent>
    </LayoutContainer>
  </ErrorBoundary>
);

export const WebViewLayout = connector(Layout);
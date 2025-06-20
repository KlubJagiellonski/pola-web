import '../styles/pola-web.css';
import ErrorBoundary from '../utils/error-handling/error-boundary';
import styled from 'styled-components';

import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';

import { SearchInfoModal } from 'search/components/form/SearchInfoModal';
import { ProductModal } from 'search/components/product-modal';

import { CustomScrollbarDiv } from './CustomScrollbar';
import { StateLoader } from './StateLoader';
import { selectedProductDispatcher } from 'search/state/selected-product-dispatcher';


const connector = connect(
  (state: IPolaState) => {
    const { app, selectedProduct } = state;
    return {
      isSearchInfoVisible: app.isSearchInfoVisible,
      activePage: app.activePage,
      selectedProduct: selectedProduct.product,
    };
  },
  {
    toggleSearchInfo: appDispatcher.toggleSearchInfo,

    selectProduct: selectedProductDispatcher.selectProduct,

    // TODO: move modals' actions somewhere else
    unselectProduct: selectedProductDispatcher.unselectProduct,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ILayoutStyles = {
  marginTop?: string;
};

type IPageLayout = ReduxProps & {
  styles?: ILayoutStyles;
  children?: React.ReactNode;
};

const LayoutContainer = styled(CustomScrollbarDiv)`
  display: flex;
  flex-flow: column;
  height: 100vh;
  font-size: 0.7em;
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
}) => {
  return(
    <ErrorBoundary scope="webview-layout">
      <StateLoader />
      <LayoutContainer id="layout-container">
        {selectedProduct && <ProductModal product={selectedProduct} onClose={unselectProduct} />}
        {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
        <PageContent {...styles}>{children}</PageContent>
      </LayoutContainer>
    </ErrorBoundary>
  )
};

export const WebViewLayout = connector(Layout);

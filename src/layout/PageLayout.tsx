import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import styled from 'styled-components';

import { appDispatcher } from '@State/app/app-dispatcher';
import { searchDispatcher } from '@State/search/search-dispatcher';
import { SearchStateName } from '@State/search/search-reducer';
import { IPolaState } from '@State/types';

import Download from '@Components/Download';
import ErrorBoundary from '@Utils/error-boundary';

import { SearchInfoModal } from '../search/form/SearchInfoModal';
import { ProductModal } from '../search/product-modal';
import { CustomScrollbarDiv } from './CustomScrollbar';
import PageFooter from './PageFooter';
import { PageHeader } from './PageHeader';
import { StateLoader } from './StateLoader';

import '@Styles/pola-web.css';
import { Device, desktopHeaderHeight, mobileHeaderHeight } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => ({
    isSearchInfoVisible: state.app.isSearchInfoVisible,
    activePage: state.app.activePage,
    isMenuExpanded: state.app.isMenuExpanded,
    selectedProduct: state.search.stateName === SearchStateName.SELECTED ? state.search.selectedProduct : undefined,
  }),
  {
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    expandMenu: appDispatcher.expandMenu,
    unselectProduct: searchDispatcher.unselectProduct,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ILayoutStyles = {
  marginTop?: string;
};

type IPageLayout = ReduxProps & {
  styles?: ILayoutStyles;
  children: JSX.Element | JSX.Element[];
};

const LayoutContainer = styled(CustomScrollbarDiv)`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const PageContent = styled.main<ILayoutStyles>`
  width: 100%;
  margin: 0 auto;
  margin-top: ${(props) => props.marginTop || 0};
  padding: 0;
  flex: 1 1 auto;

  @media ${Device.mobile} {
    padding-top: ${mobileHeaderHeight};
  }
  @media ${Device.desktop} {
    padding-top: ${desktopHeaderHeight};
  }
`;

const Layout: React.FC<IPageLayout> = ({
  activePage,
  isMenuExpanded,
  isSearchInfoVisible,
  selectedProduct,
  children,
  toggleSearchInfo,
  expandMenu,
  unselectProduct,
  styles,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ErrorBoundary scope="page-layout">
      <StateLoader />
      <LayoutContainer id="layout-container">
        {selectedProduct && <ProductModal product={selectedProduct} onClose={unselectProduct} />}
        {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
        <PageHeader
          siteTitle={data.site.siteMetadata.title}
          activePage={activePage}
          isMenuExpanded={isMenuExpanded}
          onExpand={expandMenu}
        />
        <PageContent {...styles}>{children}</PageContent>
        <Download />
        <PageFooter />
      </LayoutContainer>
    </ErrorBoundary>
  );
};

export const PageLayout = connector(Layout);

import { ErrorBoundary } from '@sentry/gatsby';
import styled from 'styled-components';
import { InquiryResultModal } from 'suppliers/components/InquiryResultModal';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { PageType } from '@App/website';

import Download from '@Components/Download';

import { SearchInfoModal } from 'search/components/form/SearchInfoModal';
import { ProductModal } from 'search/components/product-modal';
import { searchDispatcher } from 'search/state/search-dispatcher';
import { SearchStateName } from 'search/state/search-reducer';

import { CustomScrollbarDiv } from './CustomScrollbar';
import { PageHeader } from './PageHeader';
import { StateLoader } from './StateLoader';
import PageFooter from './footer/PageFooter';

import '@Styles/pola-web.css';
import { Device, desktopHeaderHeight, mobileHeaderHeight } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => {
    const { app, search, suppliers } = state;
    return {
      isSearchInfoVisible: app.isSearchInfoVisible,
      activePage: app.activePage,
      isMenuExpanded: app.isMenuExpanded,
      selectedProduct: search.stateName === SearchStateName.SELECTED ? search.selectedProduct : undefined,
      suppliers: {
        isInquiryResultVisible:
          suppliers.status === SuppliersFormStatus.LOADED || suppliers.status === SuppliersFormStatus.CALCULATED
            ? suppliers.isResultDialogVisible
            : false,
        messages: suppliers.messages,
        totalScore: suppliers.status === SuppliersFormStatus.CALCULATED ? suppliers.totalScore : undefined,
      },
    };
  },
  {
    loadBrowserLocation: appDispatcher.loadBrowserLocation,
    selectActivePage: appDispatcher.selectActivePage,
    toggleSearchInfo: appDispatcher.toggleSearchInfo,
    expandMenu: appDispatcher.expandMenu,
    unselectProduct: searchDispatcher.unselectProduct,
    hideResultDialog: suppliersDispatcher.hideDialog,
    submitResult: suppliersDispatcher.submitForm,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ILayoutStyles = {
  marginTop?: string;
};

type IPageLayout = ReduxProps & {
  page: PageType;
  location?: Location;

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
  location,
  page,
  activePage,
  isMenuExpanded,
  isSearchInfoVisible,
  suppliers,
  hideResultDialog,
  submitResult,
  selectedProduct,
  children,
  toggleSearchInfo,
  expandMenu,
  unselectProduct,
  loadBrowserLocation,
  selectActivePage,
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

  useEffect(() => {
    if (location) {
      loadBrowserLocation(location);
      selectActivePage(page);
    }
  }, []);

  return (
    <ErrorBoundary scope="page-layout">
      <StateLoader />
      <LayoutContainer id="layout-container">
        {selectedProduct && <ProductModal product={selectedProduct} onClose={unselectProduct} />}
        {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
        {suppliers.isInquiryResultVisible && (
          <InquiryResultModal
            totalScore={suppliers.totalScore}
            messages={suppliers.messages}
            onClose={hideResultDialog}
            onSubmit={submitResult}
          />
        )}
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

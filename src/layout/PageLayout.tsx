import { appDispatcher } from 'app/state/app-dispatcher';
import { loadBrowserLocation, selectActivePage } from 'app/state/app-reducer';
import { PageType } from 'app/website';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { IPolaState } from '@State/types';

import Download from '@Components/Download';
import ErrorBoundary from '@Utils/error-boundary';

import { SearchInfoModal } from '../search/components/form/SearchInfoModal';
import { ProductModal } from '../search/components/product-modal';
import { searchDispatcher } from '../search/state/search-dispatcher';
import { SearchStateName } from '../search/state/search-reducer';
import { CustomScrollbarDiv } from './CustomScrollbar';
import PageFooter from './PageFooter';
import { PageHeader } from './PageHeader';
import PageFooter from './footer/PageFooter';
import { IPolaState } from '../state/types';
import { appDispatcher } from '../state/app/app-dispatcher';
import { ProductModal } from '../search/product-modal';
import { searchDispatcher } from '../state/search/search-dispatcher';
import ErrorBoundary from '../utils/error-boundary';
import { desktopHeaderHeight, Device, mobileHeaderHeight } from '../styles/theme';
import { StateLoader } from './StateLoader';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';
import { InquiryResultModal } from 'suppliers/components/InquiryResultModal';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(page));
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

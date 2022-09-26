import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { PageHeader } from './PageHeader';
import PageFooter from './footer/PageFooter';
import { IPolaState } from '../state/types';
import { appDispatcher } from '../state/app/app-dispatcher';
import { ProductModal } from '../search/product-modal';
import { searchDispatcher } from '../state/search/search-dispatcher';
import ErrorBoundary from '../utils/error-boundary';
import { desktopHeaderHeight, Device, mobileHeaderHeight } from '../styles/theme';
import { StateLoader } from './StateLoader';
import '../styles/pola-web.css';
import Download from '../components/Download';
import { SearchStateName } from '../state/search/search-reducer';
import { SearchInfoModal } from '../search/form/SearchInfoModal';
import { CustomScrollbarDiv } from './CustomScrollbar';
import { SuppliersFormStatus } from 'suppliers/state/suppliers-reducer';
import { InquiryResultModal } from 'suppliers/components/InquiryResultModal';
import { suppliersDispatcher } from 'suppliers/state/suppliers-dispatcher';

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

  return (
    <ErrorBoundary scope="page-layout">
      <StateLoader />
      <LayoutContainer id="layout-container">
        {selectedProduct && <ProductModal product={selectedProduct} onClose={unselectProduct} />}
        {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
        {suppliers.isInquiryResultVisible && (
          <InquiryResultModal onClose={hideResultDialog} onSubmit={submitResult} totalScore={suppliers.totalScore} />
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

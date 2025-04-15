import { InquiryResultModal } from 'modules/suppliers/components/SurveyResultModal';
import styled from 'styled-components';
import 'styles/pola-web.css';

import { graphql, navigate, useStaticQuery } from 'gatsby';
import React from 'react';
import { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { PageType } from '@App/website';

import Download from '@Components/Download';
import ErrorBoundary from '@Utils/error-handling/error-boundary';

import { SearchInfoModal } from 'search/components/form/SearchInfoModal';
import { ProductModal } from 'search/components/product-modal';
import { selectedProductDispatcher } from 'search/state/selected-product-dispatcher';

import { CustomScrollbarDiv } from './CustomScrollbar';
import { PageHeader } from './PageHeader';
import { StateLoader } from './StateLoader';
import PageFooter from './footer/PageFooter';

import { Device, desktopHeaderHeight, mobileHeaderHeight } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => {
    const { app, selectedProduct, inquiryResult } = state;
    return {
      // TODO: move modals' data somewhere else
      isSearchInfoVisible: app.isSearchInfoVisible,
      selectedProduct: selectedProduct.product,

      visible: inquiryResult.visible,
      score: inquiryResult.totalScore,
      inquiryResultMessages: inquiryResult.actionLabels,
    };
  },
  {
    loadBrowserLocation: appDispatcher.loadBrowserLocation,
    selectActivePage: appDispatcher.selectActivePage,
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
  loadBrowserLocation,
  page,
  children,
  styles,

  selectActivePage,
  selectProduct,
  isSearchInfoVisible,
  selectedProduct,
  unselectProduct,
  toggleSearchInfo,

  visible,
  score,
  inquiryResultMessages,
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
  }, [location?.pathname]);

  useEffect(() => {
    if (location) {
      const params = new URLSearchParams(location.search);
      const eanCode = params.get('ean');
      if (eanCode) {
        selectProduct(eanCode);
      }
    }
  }, [location?.search]);

  // TODO: handle all modal types with React portals
  // https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal
  return (
    <ErrorBoundary scope="page-layout">
      <ErrorBoundary scope="app-state-loader">
        <StateLoader />
      </ErrorBoundary>
      <LayoutContainer id="layout-container">
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => {
              navigate(location?.pathname || '', { replace: true });
              unselectProduct();
            }}
          />
        )}
        {isSearchInfoVisible && <SearchInfoModal onClose={toggleSearchInfo} />}
        {visible && inquiryResultMessages && <InquiryResultModal totalScore={score} messages={inquiryResultMessages} />}
        <PageHeader siteTitle={data.site.siteMetadata.title} />
        <PageContent {...styles}>{children}</PageContent>
        <Download />
        <PageFooter />
      </LayoutContainer>
    </ErrorBoundary>
  );
};

export const PageLayout = connector(Layout);

import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import SEOMetadata from '../../utils/browser/SEOMetadata';
import { IPolaState } from '../../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../../state/app/app-actions';
import { PageType } from '../../domain/website';
import { PageSection } from '../../layout/PageSection';
import { WebViewLayout } from 'layout/WebViewLayout';
import { reduceToFlatProductsList } from 'domain/products/search-service';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import { appDispatcher } from 'state/app/app-dispatcher';
import { searchDispatcher } from 'state/search/search-dispatcher';
import { SearchStateName } from 'state/search/search-reducer';
import { PartnerService } from 'domain/partners/partners-service';
import { PartnersList } from 'components/partners/PartnersList';
import { BuyPolishInitiative } from 'components/partners/BuyPolishInitiative';

type IPartnersPage = {
  location?: Location;
};

const PartnersPage = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.PARTNERS));
    }
  }, []);

  return (
    <WebViewLayout>
      <SEOMetadata pageTitle="Partnerzy" />
      <PageSection>
        <BuyPolishInitiative />
      </PageSection>
      <PageSection>
        <PartnersList partners={PartnerService.getAll()} />
      </PageSection>
    </WebViewLayout>
  );
};

export default PartnersPage;

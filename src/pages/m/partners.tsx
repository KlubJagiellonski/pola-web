import React from 'react';
import { useDispatch } from 'react-redux';

import SEOMetadata from '../../utils/browser/SEOMetadata';
import { PageSection } from '../../layout/PageSection';
import { WebViewLayout } from 'layout/WebViewLayout';
import { PartnerService } from 'domain/partners/partners-service';
import { PartnersList } from 'components/partners/PartnersList';
import { BuyPolishInitiative } from 'components/partners/BuyPolishInitiative';
import { loadBrowserLocation, selectActivePage } from '@App/state/app-reducer';
import { PageType } from '@App/website';

type IPartnersPage = {
  location?: Location;
};

const PartnersPage = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(PageType.PARTNERS));
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

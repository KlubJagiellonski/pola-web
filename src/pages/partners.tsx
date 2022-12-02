import React from 'react';
import { useDispatch } from 'react-redux';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import { PageSection } from '../layout/PageSection';
import { PartnerService } from '../domain/partners/partners-service';
import { PartnersList } from '../components/partners/PartnersList';
import Placeholder from '../components/Placeholder';
import { BuyPolishInitiative } from 'components/partners/BuyPolishInitiative';

interface IPartnersPage {
  location?: Location;
}

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
    <PageLayout>
      <SEOMetadata pageTitle="Partnerzy" />
      <Placeholder text="Partner aplikacji Pola" />
      <PageSection>
        <BuyPolishInitiative />
      </PageSection>
      <PageSection>
        <PartnersList partners={PartnerService.getAll()} />
      </PageSection>
    </PageLayout>
  );
};

export default PartnersPage;

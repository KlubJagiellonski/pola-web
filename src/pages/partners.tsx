import React from 'react';
import { GatsbyPage } from '@App/generics';
import { PageType } from '@App/website';
import { BuyPolishInitiative } from '@Components/partners/BuyPolishInitiative';
import { PartnersList } from '@Components/partners/PartnersList';
import Placeholder from '@Components/Placeholder';
import { PartnerService } from '@Domain/partners/partners-service';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface IPartnersPage extends GatsbyPage {}

const PartnersPage = (props: IPartnersPage) => {
  return (
    <PageLayout location={props.location} page={PageType.PARTNERS}>
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

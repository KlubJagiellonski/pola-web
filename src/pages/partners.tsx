import { BuyPolishInitiative } from 'partners/components/BuyPolishInitiative';
import { PartnersList } from 'partners/components/PartnersList';

import React from 'react';
import { useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from '@App/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { PageProps } from "gatsby";

interface IPartnersPage extends PageProps<any> { }

const PartnersPage = (props: IPartnersPage) => {
  const partners = useSelector((state: IPolaState) => state.partners.data);
  return (
    <PageLayout location={props.location} page={PageType.PARTNERS}>
      <SEOMetadata pageTitle="Partnerzy" />
      <Placeholder text="Partner aplikacji Pola" />
      <PageSection>
        {/* <BuyPolishInitiative /> */}
      </PageSection>
      <PageSection>
        <PartnersList partners={partners} />
      </PageSection>
    </PageLayout>
  );
};

export default PartnersPage;

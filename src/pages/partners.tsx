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

import { GatsbyPage } from '@App/generics';
import { IPolaState } from '@App/state';
import { PartnerService } from '@Domain/partners/partners-service';
import { PageType, urls } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import { PartnersList } from '@Components/partners/PartnersList';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { ExternalLink } from '@Utils/browser/links';

import { Text } from '@Styles/GlobalStyle.css';
import { Device, margin, padding } from '@Styles/theme';

const Wrapper = styled.div`
  text-align: center;
  margin-top: ${margin.veryBig};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TextSection = styled(Text)`
  margin: ${margin.big} 0;
  text-align: center;
`;

const ImageSection = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  align-items: center;
  margin: 0 ${padding.veryBig};
  padding: 0 ${padding.veryBig};

  li {
    flex: 1;
    width: 100%;
    margin: 0 ${padding.veryBig};

    img {
      width: 100%;
    }
  }

  @media ${Device.mobile} {
    padding: 0;
    flex-flow: column;
    max-width: 20em;
    gap: ${padding.normal};
    margin: 0 ${margin.big};

    li {
      margin: 0 ${margin.normal};
    }
  }
`;

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

import { PageSection } from '../../layout/PageSection';
import SEOMetadata from '../../utils/browser/SEOMetadata';
import { BuyPolishInitiative } from 'partners/components/BuyPolishInitiative';
import { PartnersList } from 'partners/components/PartnersList';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { loadBrowserLocation, selectActivePage } from '@App/state/app-reducer';
import { PageType } from '@App/website';

import { WebViewLayout } from 'layout/WebViewLayout';

type IPartnersPage = {
  location?: Location;
};

const PartnersPage = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();
  const partners = useSelector((state: IPolaState) => state.partners.data);

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
        {/* <BuyPolishInitiative /> */}
      </PageSection>
      <PageSection>
        <PartnersList partners={partners} />
      </PageSection>
    </WebViewLayout>
  );
};

export default PartnersPage;

import React from 'react';

import { GatsbyPage } from '@App/generics';
import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface ISupportPage extends GatsbyPage {}

const SupportPage = (props: ISupportPage) => {
  return (
    <PageLayout location={props.location} page={PageType.SUPPORT}>
      <SEOMetadata pageTitle="Wesprzyj aplikację" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default SupportPage;

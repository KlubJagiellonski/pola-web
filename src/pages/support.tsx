import { PageType } from 'app/website';
import React from 'react';
import { connect } from 'react-redux';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface ISupportPage {
  location?: Location;
}

const SupportPage = (props: ISupportPage) => {
  return (
    <PageLayout location={props.location} page={PageType.SUPPORT}>
      <SEOMetadata pageTitle="Wesprzyj aplikację" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(SupportPage);

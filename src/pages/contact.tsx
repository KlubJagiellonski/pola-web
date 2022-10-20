import React from 'react';
import { connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface IContactPage {
  location?: Location;
}

const ContactPage = (props: IContactPage) => {
  return (
    <PageLayout location={props.location} page={PageType.CONTACT}>
      <SEOMetadata pageTitle="Kontakt" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(ContactPage);

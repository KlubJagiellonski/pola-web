import React from 'react';

import { PageType } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import {PageProps} from "gatsby";

interface IContactPage extends PageProps<any> {}

const ContactPage = (props: IContactPage) => {
  return (
    <PageLayout location={props.location} page={PageType.CONTACT}>
      <SEOMetadata pageTitle="Kontakt" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default ContactPage;

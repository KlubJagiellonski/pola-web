import React from 'react';

import { PageType } from 'app/website';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import {PageProps} from "gatsby";

interface ISupportPage extends PageProps<any> {}

const SupportPage = (props: ISupportPage) => {
  return (
    <PageLayout location={props.location} page={PageType.SUPPORT}>
      <SEOMetadata pageTitle="Wesprzyj aplikację" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default SupportPage;

import React from 'react';

import { PageType } from 'app/website';

import { DevelopmentPlaceholder } from '@Layout/DevelopmentPlaceholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import {PageProps} from "gatsby";

interface INotFoundPage extends PageProps<any> {}

const NotFoundPage = (props: INotFoundPage) => {
  return (
    <PageLayout location={props.location} page={PageType.ERROR_404}>
      <SEOMetadata pageTitle="404: Not found" />
      <DevelopmentPlaceholder text="Strona nie istnieje" />
    </PageLayout>
  );
};

export default NotFoundPage;

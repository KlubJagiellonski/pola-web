import { PageProps } from 'gatsby';
import React from 'react';

import { PageType } from 'app/website';

import { Spinner } from '@Components/Spinner';
import { DevelopmentPlaceholder } from '@Layout/DevelopmentPlaceholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { color } from '@Styles/theme';

interface INotFoundPage extends PageProps<any> {}

const NotFoundPage = (props: INotFoundPage) => {
  const isHomePage = props.location.pathname === '/';
  return (
    <PageLayout location={props.location} page={PageType.ERROR_404}>
      <SEOMetadata pageTitle="404: Not found" />
      {isHomePage ? (
        <Spinner styles={{ size: 300, color: color.text.red }} />
      ) : (
        <DevelopmentPlaceholder text="Trwa ładowanie strony" />
      )}
    </PageLayout>
  );
};

export default NotFoundPage;

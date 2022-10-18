import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { IPolaState } from '@State/types';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import { PageType } from '@Domain/website';
import Placeholder from '@Components/Placeholder';

interface ISupportPage {
  location?: Location;
}

const SupportPage = (props: ISupportPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.SUPPORT));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Wesprzyj aplikację" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(SupportPage);

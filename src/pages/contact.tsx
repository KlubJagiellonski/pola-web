import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { PageType } from '@Domain/website';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import { IPolaState } from '@State/types';

import Placeholder from '@Components/Placeholder';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface IContactPage {
  location?: Location;
}

const ContactPage = (props: IContactPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.CONTACT));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Kontakt" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(ContactPage);

import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { DevelopmentPlaceholder } from '../layout/DevelopmentPlaceholder';
import { PageType } from '../domain/website';

interface IBusinessPage {
  location?: Location;
}

const BusinessPage = (props: IBusinessPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.BUSINESS));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Oferta Biznesowa" />
      <DevelopmentPlaceholder />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({ location: state.app.location }), {})(BusinessPage);

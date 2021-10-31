import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import Placeholder from '../components/Placeholder';

interface ITeamPage {
  location?: Location;
}

const TeamPage = (props: ITeamPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.TEAM));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Dołącz do zespołu Pola" />
      <Placeholder text="Strona w budowie" />
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(TeamPage);

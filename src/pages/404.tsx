import React from 'react';
import { useDispatch } from 'react-redux';
import { PageType } from '@Domain/website';
import { DevelopmentPlaceholder } from '@Layout/DevelopmentPlaceholder';
import { PageLayout } from '@Layout/PageLayout';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import SEOMetadata from '@Utils/browser/SEOMetadata';

interface INotFoundPage {
  location?: Location;
}

const NotFoundPage = (props: INotFoundPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.ERROR_404));
    }
  }, []);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="404: Not found" />
      <DevelopmentPlaceholder text="Strona nie istnieje" />
    </PageLayout>
  );
};

export default NotFoundPage;

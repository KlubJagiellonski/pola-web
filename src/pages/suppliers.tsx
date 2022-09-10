import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import Placeholder from '../components/Placeholder';
import { graphql, useStaticQuery } from 'gatsby';
import { PageSection } from 'layout/PageSection';

interface ISuppliersPage {
  location?: Location;
}

const SuppliersPage = (props: ISuppliersPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  const data: any = useStaticQuery(graphql`
    {
      suppliersJson {
        categories {
          categoryId
          header
          options {
            name
            score
          }
          order
        }
      }
    }
  `);

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.SUPPLIERS));
    }
  }, []);

  console.log('suppliers', data);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Przykładowy formularz dostawców" />
      <Placeholder text="Strona w budowie" />
      <PageSection>
        <h2>HELLO</h2>
      </PageSection>
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({}))(SuppliersPage);

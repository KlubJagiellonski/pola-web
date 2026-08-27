import styled from 'styled-components';

import React from 'react';

import { PageType } from 'app/website';

import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { padding } from '@Styles/theme';
import {PageProps} from "gatsby";
import BusinessAll from 'business/components/BussinesAll';


interface IBusinessPage extends PageProps<any> {}

const BusinessPage = (props: IBusinessPage) => {

  return (
    <PageLayout location={props.location} page={PageType.BUSINESS} styles={{ marginTop: padding.big }}>
      <SEOMetadata pageTitle="Oferta Biznesowa" />
      <BusinessAll {...props}/>
    </PageLayout>
  );
};

export default BusinessPage;

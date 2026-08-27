import styled from 'styled-components';

import React from 'react';

import { PageType } from 'app/website';

import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { padding } from '@Styles/theme';
import {PageProps} from "gatsby";
import BusinessAll from 'business/components/BussinesAll';
import { WebViewLayout } from '@Layout/WebViewLayout';


interface IBusinessPage extends PageProps<any> {}

const BusinessPage = (props: IBusinessPage) => {

  return (
    <WebViewLayout styles={{ marginTop: padding.big }}>
      <BusinessAll {...props}/>
    </WebViewLayout>
  );
};

export default BusinessPage;

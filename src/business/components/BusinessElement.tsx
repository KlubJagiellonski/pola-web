import styled from 'styled-components';

import React from 'react';

import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';

import { BusinessImage } from './BusinessImage';

import { Device, color, fontSize, introHeight, lineHeight, padding } from '@Styles/theme';

interface IBusinessElement {
  title: string;
  imageSrc: string;
  html: any;
}

const Wrapper = styled.div`
  padding-top: ${introHeight};
  margin-top: -${introHeight};

  @media ${Device.mobile} {
    padding-top: 120px;
    margin-top: -120px;
  }
`;

const TextSection = styled.div`
  margin-top: 5px;
  padding: 0;
  font-family: 'Merriweather';
  font-size: ${fontSize.small};
  color: ${color.text.secondary};
  line-height: ${lineHeight.normal};

  font-feature-settings: 'kern', 'liga', 'clig', 'calt';

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
`;

const Columns = styled(ColumnsLayout)`
  align-items: center;
  justify-content: center;
  margin-bottom: ${padding.veryBig};
  padding: 0 ${padding.big};

  @media ${Device.mobile} {
    padding: 0;
    gap: 0;
  }
`;

const BusinessElement: React.FC<IBusinessElement> = ({ html, title, imageSrc }) => {
  return (
    <Wrapper id="business-element">
      <Columns>
        <ContentColumn fraction={50}>
          <TextSection dangerouslySetInnerHTML={{ __html: html }} />
        </ContentColumn>
        {imageSrc && (
          <ContentColumn fraction={50}>
            <BusinessImage title={title} imageSrc={imageSrc} />
          </ContentColumn>
        )}
      </Columns>
    </Wrapper>
  );
};

export default BusinessElement;

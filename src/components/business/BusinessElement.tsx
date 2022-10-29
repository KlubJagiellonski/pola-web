import styled from 'styled-components';

//import Img, { FluidObject } from 'gatsby-image';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';

import { Device, color, fontSize, introHeight, lineHeight, padding } from '@Styles/theme';

interface BusinessElement {
  html: any;
  imgFluid?: any | any[] | null;
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

const BusinessElement: React.FC<BusinessElement> = ({ html, imgFluid }) => {
  return (
    <Wrapper id="business-element">
      <Columns>
        <ContentColumn fraction={50}>
          <TextSection dangerouslySetInnerHTML={{ __html: html }} />
        </ContentColumn>
        {imgFluid && (
          <ContentColumn fraction={50}>
            {' '}
            <GatsbyImage alt={imgFluid} image={getImage(imgFluid)} />
          </ContentColumn>
        )}
      </Columns>
    </Wrapper>
  );
};

export default BusinessElement;

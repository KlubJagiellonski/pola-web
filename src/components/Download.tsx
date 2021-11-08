import React from 'react';
import styled from 'styled-components';

import { color, fontSize, Device, padding, margin } from './../styles/theme';
import { TitleSection } from './../styles/GlobalStyle.css';
import { GooglePlayLink, AppStoreLink, HuaweiAppGalleryLink } from './links';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 11.4em;
  padding: ${padding.big} 0;
  background: ${color.background.black};

  @media ${Device.mobile} {
    min-height: initial;
    padding: ${padding.normal} 0;
  }
`;

const DownoladTitle = styled(TitleSection)`
  color: ${color.text.light};
  margin: ${margin.normal} 0 ${margin.veryBig} 0;
  font-size: ${fontSize.normal};

  @media ${Device.mobile} {
    margin: ${margin.small};
  }
`;

const DownloadLinks = styled.div`
  display: flex;
  align-items: center;

  @media ${Device.mobile} {
    flex-direction: column;
  }

  a {
    padding: ${padding.small};

    img {
      @media ${Device.mobile} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 8em;
        margin-top: ${margin.small};
      }
    }
  }
`;

const Download = () => {
  return (
    <Wrapper>
      <DownoladTitle>APLIKACJA POLA</DownoladTitle>
      <DownloadLinks>
        <GooglePlayLink />
        <AppStoreLink />
        <HuaweiAppGalleryLink />
      </DownloadLinks>
    </Wrapper>
  );
};

export default Download;

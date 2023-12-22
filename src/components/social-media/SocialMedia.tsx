import React from 'react';
import styled from 'styled-components';

import { Facebook, Instagram, Twitter } from './Icons';

import { TitleSection, WrapperSection } from '@Styles/GlobalStyle.css';
import { Device, color } from '@Styles/theme';

const Items = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 80%;
  float: left;

  @media ${Device.mobile} {
    width: 100%;
  }
`;

const Item = styled.a`
  flex: 1;
  text-align: center;
`;

const Title = styled(TitleSection)`
  width: 20%;
  float: left;
  text-align: center;
  margin: 0;

  @media ${Device.mobile} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Wrapper = styled(WrapperSection)``;

const Container = styled.div`
  min-height: 5em;
  height: 100%;
  grid-area: social-media;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Device.mobile} {
    padding: 30px 0;
    display: initial;
  }

  &:container(max-width: 450px){
    padding: 30px 0;
    display: initial;

    ${Items}{
      width: 100%;
    }

    ${Title}{
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

const SocialMedia = () => {
  return (
    <Container color={color.background.white}>
      <Title>Śledź nas na:</Title>
      <Items>
        <Facebook />
        <Instagram />
        <Twitter />
        <Item />
      </Items>
    </Container>
  );
};

export default SocialMedia;

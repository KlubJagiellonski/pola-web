import React from 'react';
import styled from 'styled-components';

import SocialImg from '../assets/social.png';
import { color, Device } from '../styles/theme';
import { WrapperSection, TitleSection } from '../styles/GlobalStyle.css';

const Wrapper = styled(WrapperSection)`
  min-height: 5em;
  height: 100%;
  grid-area: social-media;

  @media ${Device.desktop} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${Device.mobile} {
    padding: 30px 0;
  }
`;

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

const Item = styled.div`
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

const SocialMedia = () => {
  return (
    <Wrapper color={color.background.white}>
      <Title>Social Media</Title>
      <Items>
        <Item>
          <img src={SocialImg} />
        </Item>
        <Item>
          <img src={SocialImg} />
        </Item>
        <Item>
          <img src={SocialImg} />
        </Item>
        <Item>
          <img src={SocialImg} />
        </Item>
      </Items>
    </Wrapper>
  );
};

export default SocialMedia;

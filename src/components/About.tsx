import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { urls } from 'app/website';

import { ButtonFlavor, ButtonThemes } from './buttons/Button';
import { SecondaryButton } from './buttons/SecondaryButton';
import { ResponsiveImage } from './images/ResponsiveImage';

import { Text, TitleSection, WrapperSection } from '@Styles/GlobalStyle.css';
import { Device, color, fontSize, margin, padding } from '@Styles/theme';

const Wrapper = styled(WrapperSection)`
  grid-area: about;
  margin-top: 3rem;
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
  text-align: center;

  @media ${Device.mobile} {
    width: 100%;
    margin: 0 0.5rem;
  }
`;

const MockUp = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;

  .gatsby-image-wrapper {
    width: 100%;
    img {
      width: 100%;
      max-width: 100%;
      display: block;
      
    }

    div {
      height: 10em !important;
      @media ${Device.mobile} {
        height: 14em !important;
      }
    }
  }
`;

const Info = styled.div`
  background-color: ${color.background.dark};
  padding: ${padding.normal};
`;

const AboutButton = styled(SecondaryButton)`
  margin: ${margin.small} 0;
  font-weight: bold;
`;

const AboutTitle = styled(TitleSection)`
  color: ${color.text.light};
`;

const AboutText = styled(Text)`
  color: ${color.text.light};
`;

const About = () => {
  return (
    <Wrapper color={color.background.dark}>
      <Info>
        <AboutTitle>O Poli</AboutTitle>
        <AboutText>
          Masz dość masówki globalnych koncernów? Szukasz lokalnych firm tworzących unikatowe produkty? Pola pomoże Ci
          odnaleźć polskie wyroby. Zabierając Polę na zakupy, odnajdujesz produkty „z duszą” i wspierasz polską
          gospodarkę.
        </AboutText>
        <Link to={urls.pola.about()}>
          <AboutButton
            label="Dowiedz się więcej... "
            styles={{ ...ButtonThemes[ButtonFlavor.WHITE], fontSize: fontSize.small }}
            fontSize={fontSize.small}
          />
        </Link>
      </Info>
      <MockUp>
        <ResponsiveImage imageSrc="1-prom-strona.png" title={'info'} />
      </MockUp>
    </Wrapper>
  );
};

export default About;

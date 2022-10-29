import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { urls } from 'app/website';

import { ButtonFlavor, ButtonThemes } from './buttons/Button';
import { SecondaryButton } from './buttons/SecondaryButton';
import { AssetImage } from './images/AssetImage';

import { Text, TitleSection, WrapperSection } from '@Styles/GlobalStyle.css';
import { color, fontSize, margin, padding } from '@Styles/theme';

const Wrapper = styled(WrapperSection)`
  grid-area: about;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
`;

const MockUp = styled.div`
  height: 100%;

  .gatsby-image-wrapper {
    div {
      padding-bottom: 17.8em !important;
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
        <AssetImage imageSrc="1-prom-strona.png" />
      </MockUp>
    </Wrapper>
  );
};

export default About;

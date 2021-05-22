import React from 'react';
import { Wrapper, MockUp, Info, AboutTitle, AboutText, AboutButton } from './About.css';
import { color, fontSize } from '../styles/theme';
import { ButtonColor } from './buttons/Button';

const About = () => {
  return (
    <Wrapper color={color.background.dark}>
      <Info>
        <AboutTitle>
          O Poli
        </AboutTitle>
        <AboutText>
          Masz dość masówki globalnych koncernów? Szukasz lokalnych firm tworzących unikatowe produkty? Pola pomoże Ci odnaleźć polskie wyroby. Zabierając Polę na zakupy, odnajdujesz produkty „z duszą” i wspierasz polską gospodarkę.
        </AboutText>
        <AboutButton label='Dowiedz się więcej... ' color={ButtonColor.White} fontSize={fontSize.small}/>
      </Info>
      <MockUp>
        <p>Mock up telefonu z uruchomioną aplikacją</p>
      </MockUp>
    </Wrapper>
  );
};

export default About;

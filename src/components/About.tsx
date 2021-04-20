import React from 'react';
import { Wrapper } from './About.css';
import { theme } from '../styles/theme';
import { Text } from '../styles/GlobalStyle.css';

const About = () => {
  return (
    <Wrapper color={theme.dark}>
      <Text>O POLI / (EXPLAINER VIDEO w Przyszłości)(tekst dlaczego to ważne = krótkie info + czytaj więcej)</Text>
    </Wrapper>
  );
};

export default About;
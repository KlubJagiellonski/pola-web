import React from 'react';
import styled from 'styled-components';

import { WrapperTeams, Title, TextSection, ButtonTeams } from './Teams.css';
import { Text } from '../styles/GlobalStyle.css';
import { color } from '../styles/theme';
import { ButtonColor } from '../styles/button-theme';
import Icon from './../assets/ikona-przyjaciele.png';

const Wrapper = styled(WrapperTeams)`
  grid-area: teams;
`;

const Teams = () => {
  return (
    <Wrapper color={color.background.white}>
      <TextSection>
        <img src={Icon} />
        <Title>Zespół</Title>
        <Text>1-2 zdania: ogólnie kto tworzy Polę (jaka grupa ludzi np. studenci, członkowie Klubu itp.)</Text>
        <ButtonTeams label="DOŁĄCZ DO ZESPOŁU" color={ButtonColor.Red} />
      </TextSection>
    </Wrapper>
  );
};

export default Teams;

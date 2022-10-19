import { urls } from 'app/website';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';

import { ButtonTeams, IconTeams, TextSection, Title, WrapperTeams } from './Teams.css';
import { ResponsiveImage } from './images/ResponsiveImage';

import { Text } from '@Styles/GlobalStyle.css';
import { color } from '@Styles/theme';

const Wrapper = styled(WrapperTeams)`
  grid-area: teams-friend;
`;

const TeamsFriend = () => {
  return (
    <Wrapper color={color.background.white}>
      <TextSection>
        <IconTeams>
          <ResponsiveImage imageSrc="ikona-zespół.png" />
        </IconTeams>
        <Title>Dołącz do Przyjaciół Poli i odnieś sukces!</Title>
        <Text>
          Jeśli twoja firma produkuje w Polsce i posiada wyłącznie polski kapitał, możesz skorzystać z pakietu
          atrakcyjnych narzędzi promocyjnych
        </Text>
        <Link to={urls.pola.friends()}>
          <ButtonTeams label="POZNAJ SZCZEGÓŁY" styles={ButtonThemes[ButtonFlavor.RED]} />
        </Link>
      </TextSection>
    </Wrapper>
  );
};

export default TeamsFriend;

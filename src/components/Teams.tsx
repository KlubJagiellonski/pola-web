import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { urls } from '@Domain/website';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';

import { ButtonTeams, IconTeams, TextSection, Title, WrapperTeams } from './Teams.css';
import { ResponsiveImage } from './images/ResponsiveImage';

import { Text } from '@Styles/GlobalStyle.css';
import { color } from '@Styles/theme';

const Wrapper = styled(WrapperTeams)`
  grid-area: teams;

  .content {
    margin-top: -120px;
    padding-top: 120px;
  }
`;

const Teams = () => {
  return (
    <Wrapper color={color.background.white}>
      <div className="content" id={'contact'}>
        <TextSection>
          <IconTeams>
            <ResponsiveImage imageSrc="ikona-przyjaciele.png" />
          </IconTeams>
          <Title>Kontakt</Title>
          <Text>
            Działamy razem dla dobra wspólnego. Jeśli chcesz poświęcić chwilę, aby zaangażować się w prospołeczne
            działania, zachęcamy do kontaktu.
          </Text>
          <Text>
            <a href={urls.external.mail.Klub.href}>pola@klubjagiellonski.pl</a>, tel. 660 010 034
          </Text>
          <Link to={urls.pola.team()}>
            <ButtonTeams label="DOŁĄCZ DO ZESPOŁU" styles={ButtonThemes[ButtonFlavor.RED]} />
          </Link>
        </TextSection>
      </div>
    </Wrapper>
  );
};

export default Teams;

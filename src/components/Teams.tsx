import React from 'react';
import styled from 'styled-components';

import { WrapperTeams, Title, TextSection, ButtonTeams, IconTeams } from './Teams.css';
import { Text } from '../styles/GlobalStyle.css';
import { color } from '../styles/theme';
import { ButtonColor } from '../styles/button-theme';
import { ResponsiveImage } from './images/ResponsiveImage';
import { urls, hash } from '../domain/website';
import { Link } from 'gatsby';

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
      <div className="content" id={hash.contact.id}>
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
          <Link to={urls.pola.team}>
            <ButtonTeams label="DOŁĄCZ DO ZESPOŁU" color={ButtonColor.Red} />
          </Link>
        </TextSection>
      </div>
    </Wrapper>
  );
};

export default Teams;

import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { urls } from 'app/website';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';

import { PrimaryButton } from './buttons/PrimaryButton';
import { ResponsiveImage } from './images/ResponsiveImage';

import { Text } from '@Styles/GlobalStyle.css';
import { TitleSection, WrapperSection } from '@Styles/GlobalStyle.css';
import { color } from '@Styles/theme';
import { Device, margin, padding } from '@Styles/theme';

export const WrapperTeams = styled(WrapperSection)`
  height: 100%;
  min-height: 11.4em;
  padding: ${margin.normal};
  position: relative;
  padding: 0px;
  margin: 0px;
  padding-top: 10px;
`;

export const TextSection = styled.div`
  text-align: center;
  padding: ${padding.normal} ${padding.huge} ${padding.veryBig} ${padding.huge};

  @media ${Device.mobile} {
    padding: ${padding.normal} ${padding.big} ${padding.veryBig} ${padding.big};
  }
`;

export const Title = styled(TitleSection)`
  padding: ${padding.normal};
`;

export const ButtonTeams = styled(PrimaryButton)`
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  width: 100%;
  padding: ${padding.normal};

  @media ${Device.mobile} {
    position: relative;
    margin-top: ${margin.normal};
  }
`;

export const IconTeams = styled.div`
  margin: auto;
  width: 7.5em;
  height: 7.5em;
`;

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
            <ResponsiveImage title="team" imageSrc="ikona-przyjaciele.png" />
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

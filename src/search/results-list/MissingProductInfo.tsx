import React from 'react';
import styled from 'styled-components';

import { urls } from '@Domain/website';

import { InfoBox } from '@Components/InfoBox';
import { Title } from '@Components/Teams.css';
import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { SecondaryButton } from '@Components/buttons/SecondaryButton';
import { openNewTab } from '@Utils/browser';

import { Text } from '@Styles/GlobalStyle.css';
import { fontSize, padding } from '@Styles/theme';

const InfoTile = styled.div`
  padding-bottom: ${padding.big};
`;

const buttonStyle = { ...ButtonThemes[ButtonFlavor.RED], fontSize: fontSize.small, lowercase: true };

export const MissingProductInfo = () => (
  <InfoBox>
    <Title>Nie znalazłeś czego szukasz?</Title>
    <div className="content">
      <InfoTile>
        <Text>Zgłoś brakującą firmę, produkt lub błąd w danych.</Text>
        <a href={urls.external.mail.Klub.href}>
          <SecondaryButton styles={buttonStyle}>
            <p>pola@klubjagiellonski.pl</p>
          </SecondaryButton>
        </a>
      </InfoTile>
      <InfoTile>
        <Text>Twojej firmy nie ma w bazie?</Text>
        <SecondaryButton onClick={() => openNewTab(urls.external.links.form)} styles={buttonStyle}>
          <p>Wypełnij formularz</p>
        </SecondaryButton>
      </InfoTile>
    </div>
  </InfoBox>
);

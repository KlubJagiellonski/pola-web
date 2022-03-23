import React from 'react';
import { fontSize, padding } from '../../styles/theme';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ButtonThemes, ButtonFlavor } from '../../components/buttons/Button';
import { openNewTab } from '../../utils/browser';
import { urls } from '../../domain/website';
import { InfoBox } from '../../components/InfoBox';
import { Title } from '../../components/Teams.css';
import { Text } from '../../styles/GlobalStyle.css';
import styled from 'styled-components';

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

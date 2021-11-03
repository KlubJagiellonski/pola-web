import React from 'react';
import { fontSize } from '../../styles/theme';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ButtonThemes, ButtonFlavor } from '../../components/buttons/Button';
import { openNewTab } from '../../utils/browser';
import { urls } from '../../domain/website';
import { InfoBox } from '../../components/InfoBox';
import { Title } from '../../components/Teams.css';

export const MissingProductInfo = () => (
  <InfoBox>
    <Title>Nie znalazłeś czego szukasz?</Title>
    <Text>
      {`Zgłoś brakującą firmę, produkt lub błąd w danych: ${
        urls.external.mail.Klub instanceof URL ? (
          <a href={urls.external.mail.Klub.href}>pola@klubjagiellonski.pl</a>
        ) : (
          'pola@klubjagiellonski.pl'
        )
      }`}
    </Text>
    <Text>Twojej firmy nie ma w bazie?</Text>
    <SecondaryButton
      onClick={() => {
        if (urls.external.links.openFoods instanceof URL) {
          openNewTab(urls.external.links.openFoods);
        }
      }}
      styles={ButtonThemes[ButtonFlavor.RED]}
      fontSize={fontSize.small}>
      <p>Wypełnij formularz</p>
    </SecondaryButton>
  </InfoBox>
);

import React from 'react';
import styled from 'styled-components';
import { padding, margin, color, fontSize } from '../../styles/theme';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ButtonThemes, ButtonFlavor } from '../../components/buttons/Button';
import { openNewTab } from '../../utils/browser';
import { urls } from '../../domain/website';

const MissingProduct = styled.div`
  background-color: ${color.background.red};
  color: ${color.text.light};
  text-align: center;
  font-size: ${fontSize.big};
  padding: ${padding.normal};
  margin-top: ${margin.big};
`;

export const MissingProductInfo = () => (
  <MissingProduct>
    <p>Nie znalazłeś czego szukasz?</p>
    <SecondaryButton
      onClick={() => openNewTab(urls.external.openFoods)}
      styles={ButtonThemes[ButtonFlavor.RED]}
      fontSize={fontSize.small}>
      <p>Zgłoś produkt do bazy</p>
    </SecondaryButton>
  </MissingProduct>
);

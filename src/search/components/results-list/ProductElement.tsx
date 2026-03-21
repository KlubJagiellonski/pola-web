import { EAN, IProductData } from 'search';
import styled from 'styled-components';

import React from 'react';

import { AppSettings } from '@App/app-settings';

import { ScoreBar } from '@Components/ScoreBar';

import { RussiaInfoBox } from './RussiaInfoBox';

import { Device, color, fontSize, lineHeight, padding, margin } from '@Styles/theme';

const ListElement = styled.li`
  min-width: 40em;
  margin-bottom: ${padding.normal};
  background-color: ${color.background.lightGray};
  cursor: pointer;

  @media ${Device.mobile} {
    min-width: unset;
    width: 100%;
  }
`;

const ResultElement = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${padding.big};

  .name {
    font-size: ${fontSize.normal};
    font-weight: bold;
    margin-bottom: 0.5em;
    text-align: center;
    @media ${Device.mobile} {
      font-size: ${fontSize.small};
    }
  }
  .manufacturer,
  .brand {
    font-size: ${fontSize.small};
    line-height: ${lineHeight.normal};
    padding-left: ${padding.small};
  }

  .heading {
    font-size: ${fontSize.small};
    font-weight: 600;
  }
`;

const ScoreLabel = styled.div`
  display: inline-block;
  font-size: ${fontSize.small};
  margin-bottom: ${margin.normal};
`;

interface IResultProperty {
  value?: number | string;
  label: string;
  missingValuePlaceholder?: number | string;
}
const ResultProperty: React.FC<IResultProperty> = ({ value, label, missingValuePlaceholder }) =>
  value !== undefined ? (
    <div>
      <span className="heading">{`${label}:`}</span>
      <span className="brand">{value}</span>
    </div>
  ) : (
    <span>{missingValuePlaceholder}</span>
  );

interface ISearchResultElement {
  product: IProductData;
  onSelect: (code: EAN) => void;
}

export const SearchResultElement: React.FC<ISearchResultElement> = ({ product, onSelect }) => {
  const score = product.manufacturer?.plScore ?? product.company?.score ?? null;
  return (
    <ListElement onClick={(e) => onSelect(product.code)}>
      <ResultElement>
        <span className="name">{product.name}</span>
        {AppSettings.search?.SHOW_RESULT_BRAND && (
          <ResultProperty value={product.brand?.name} label="Marka" missingValuePlaceholder="nieznana marka" />
        )}
        {AppSettings.search?.SHOW_RESULT_MANUFACTURER && (
          <ResultProperty
            value={product.company?.name}
            label="Producent"
            missingValuePlaceholder="nieznany producent"
          />
        )}
        <RussiaInfoBox product={product} />
        <ScoreLabel>Nasza ocena: <b>{score ?? "-"}</b> pkt</ScoreLabel>
      
      <ScoreBar
        value={score}
        unit="pkt"
        missingValuePlaceholder="Brak wyniku w rankingu Poli"
        animation={{ duration: 1, delay: 0.2 }}
      />
      </ResultElement>
    </ListElement>
  );
};

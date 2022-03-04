import React from 'react';
import styled from 'styled-components';
import { EAN, IProductData } from '../../domain/products';
import { padding, color, fontSize, lineHeight, Device } from '../../styles/theme';
import { ScoreBar } from '../../components/ScoreBar';
import { AppSettings } from '../../state/app-settings';
import { RussiaInfoBox } from '../RussiaInfoBox';

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
  padding: ${padding.normal} ${padding.normal};

  .name {
    font-size: ${fontSize.normal};
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .manufacturer,
  .brand {
    font-size: ${fontSize.small};
    line-height: ${lineHeight.normal};
    padding-left: ${padding.small};
  }

  .underline {
    font-size: ${fontSize.small};
    text-decoration: underline;
  }
`;

interface IResultProperty {
  value?: number | string;
  label: string;
  missingValuePlaceholder?: number | string;
}
const ResultProperty: React.FC<IResultProperty> = ({ value, label, missingValuePlaceholder }) =>
  !!value ? (
    <div>
      <span className="underline">{`${label}:`}</span>
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
  return (
    <ListElement onClick={(e) => onSelect(product.code)}>
      <ResultElement>
        <span className="name">{product.name}</span>
        {AppSettings.search?.SHOW_RESULT_BRAND && (
          <ResultProperty value={product.brand?.name} label="Marka" missingValuePlaceholder="nieznana marka" />
        )}
        {AppSettings.search?.SHOW_RESULT_MANUFACTURER && (
          <ResultProperty value={product.company?.name} label="Producent" missingValuePlaceholder="nieznay producent" />
        )}
        <RussiaInfoBox product={product} />
      </ResultElement>
      <ScoreBar
        value={product.company?.score}
        unit="pkt"
        missingValuePlaceholder="Brak wyniku w rankingu Poli"
        animation={{ duration: 1, delay: 0.2 }}
      />
    </ListElement>
  );
};

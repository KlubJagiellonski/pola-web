import { EAN, IProductData } from 'search';
import styled from 'styled-components';

import React from 'react';

import { SearchResultElement } from './ProductElement';

import { Device, margin, padding } from '@Styles/theme';

const ResultsList = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  .products-list {
    padding: 0;
    list-style: none;
    max-width: 50em;

    @media ${Device.mobile} {
      min-width: unset;
      width: 100%;
      padding: 0 ${padding.normal};
    }
  }

  .actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-bottom: ${margin.normal};
  }
`;

interface ISearchResultsList {
  results?: IProductData[];
  totalItems: number;
  actions?: React.ReactNode | React.ReactNode[];

  onSelect: (code: EAN) => void;
}

export const SearchResultsList: React.FC<ISearchResultsList> = ({ results, actions, onSelect }) => {
  if (!results) {
    return null;
  }

  return (
    <ResultsList>
      <ul className="products-list">
        {results.map((product: IProductData, index: number) => (
          <SearchResultElement product={product} key={`${index}-${product.code}`} onSelect={onSelect} />
        ))}
      </ul>
      {actions && <div className="actions">{actions}</div>}
    </ResultsList>
  );
};

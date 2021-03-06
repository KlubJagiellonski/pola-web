import React from 'react';
import styled from 'styled-components';
import { IProductData } from '../../domain/products';
import { margin } from '../../styles/theme';
import { SearchResultElement } from './ProductElement';

const ResultsList = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  .products-list {
    padding: 0;
    list-style: none;
    max-width: 50em;
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
  actions?: React.ReactNode | React.ReactNode[];

  onSelect: (code: string, id: string) => void;
}

export const SearchResultsList: React.FC<ISearchResultsList> = ({ results, actions, onSelect }) => {
  if (!results) {
    return null;
  }

  return (
    <ResultsList>
      <ul className="products-list">
        {results.map((product: IProductData, index: number) => (
          <SearchResultElement product={product} key={product.code} onSelect={onSelect} />
        ))}
      </ul>
      {actions && <div className="actions">{actions}</div>}
    </ResultsList>
  );
};

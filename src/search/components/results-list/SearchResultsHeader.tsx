import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { PageType } from '@App/website';

import { PageSection } from '@Layout/PageSection';

import { SearchStateName } from 'search/state/search-reducer';

import { ProductCounter } from './ProductCounter';

import { Device, fontSize, lineHeight, margin, padding } from '@Styles/theme';

const Header = styled.header`
  font-size: ${fontSize.big};
  font-weight: bold;
  line-height: ${lineHeight.normal};
  margin: ${margin.normal} 0 ${margin.small} 0;

  @media ${Device.mobile} {
    padding-top: ${padding.normal};
  }
`;

interface ISearchResultsHeader {
  searchState: SearchStateName;
  totalItems?: number;
  phrase?: string;
  resultsUrl?: string;

  setActivePage?: (type: PageType) => void;
}

export const SearchResultsHeader: React.FC<ISearchResultsHeader> = ({
  phrase,
  totalItems,
  resultsUrl,
  setActivePage,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (setActivePage) {
      setActivePage(PageType.PRODUCTS);
    }
  };

  return (
    <PageSection styles={{ textAlign: 'left' }}>
      <Header>Uzyskano</Header>
      {resultsUrl ? (
        <Link to={resultsUrl} onClick={handleClick}>
          <ProductCounter phrase={phrase} amount={totalItems} />
        </Link>
      ) : (
        <ProductCounter phrase={phrase} amount={totalItems} />
      )}
    </PageSection>
  );
};

import React from 'react';
import styled from 'styled-components';
import { PageSection } from '../../layout/PageSection';
import { IProductData } from '../../domain/products';
import { Spinner } from '../../components/Spinner';
import { ProductCounter } from './ProductCounter';
import { Link } from 'gatsby';
import { fontSize, lineHeight, margin } from '../../styles/theme';
import { SearchStateName } from '../../state/search/search-reducer';
import { PageType } from '../../domain/website';

const Header = styled.header`
  font-size: ${fontSize.big};
  font-weight: bold;
  line-height: ${lineHeight.normal};
  margin: ${margin.normal} 0 ${margin.small} 0;
`;

interface ISearchResultsHeader {
    searchState: SearchStateName;
    phrase: string;
    resultsUrl: string;
    totalItems: number;

    setActivePage?: (type: PageType) => void;
}

export const SearchResultsHeader: React.FC<ISearchResultsHeader> = ({
    searchState,
    phrase,
    resultsUrl,
    totalItems,
    setActivePage,
}) => {
    const isLoading = searchState === SearchStateName.LOADING;

    let header: React.ReactNode;
    if (!phrase && !isLoading) {
        return null;
    }

    if (isLoading) {
        header = <Spinner text="Wyszukiwanie produktów..." />;
    }

    if (!header) {
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (setActivePage) {
                setActivePage(PageType.PRODUCTS);
            }
        };

        header = (
            <>
                <Header>Uzyskano</Header>
                <Link to={resultsUrl} onClick={handleClick}>
                    <ProductCounter phrase={phrase} amount={totalItems} />
                </Link>

            </>
        );
    }

    return <PageSection styles={{ textAlign: isLoading ? 'center' : 'left' }}>{header}</PageSection>;
};

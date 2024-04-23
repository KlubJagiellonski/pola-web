import styled from 'styled-components';

import React from 'react';

import { ContentColumn } from '@Layout/ColumnsLayout';
import { PageSection } from '@Layout/PageSection';

import { Device, fontSize, padding } from '@Styles/theme';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import '@Components/Pagination.css';
import ReactPaginate from 'react-paginate';
import { IMaterial } from 'materials';
import Material from './Material';

const PaginateWrapper = styled.div`
    width: fit-content;
    margin: auto;
    margin-top: -100px;
    padding-bottom: ${padding.veryBig};
`

interface IMaterials {
    materials: IMaterial[]
    pages: number
    page: number
    onPageChange: (selectedItem: { selected: number }) => void
}

const Materials: React.FC<IMaterials> = ({ materials, pages, page, onPageChange }) => {
    return (
        <PageSection>
            {materials.map(material => (
                <Material key={material.id} {...material} />
            ))}
            <PaginateWrapper>
                <ReactPaginate
                    previousLabel={'poprzednia'}
                    nextLabel={'następna'}
                    pageCount={pages}
                    onPageChange={onPageChange}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                    forcePage={page}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                />
            </PaginateWrapper>
        </PageSection>
    );
};

export default Materials;

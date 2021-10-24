import React from 'react';
import { PageSection } from '../../layout/PageSection';
import { EAN, IProductData } from '../../domain/products';
import { SearchResultsList } from '../../search/results-list/SearchResultsList';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { ButtonThemes, ButtonFlavor } from '../../components/buttons/Button';
import { SearchResultsHeader } from '../../search/results-list/SearchResultsHeader';
import { urls } from '../../domain/website';
import { SearchStateName } from '../../state/search/search-reducer';
import { MissingProductInfo } from '../../search/results-list/MissingProductInfo';

interface IFirstPageResults {
  state: SearchStateName;
  phrase: string;
  token: string;
  pages: IProductData[];
  totalItems: number;

  onSelect: (code: EAN) => void;
  onClear: () => void;
}

export const FirstPageResults: React.FC<IFirstPageResults> = ({
  state,
  phrase,
  pages,
  totalItems,
  onSelect,
  onClear,
}) => (
  <>
    <SearchResultsHeader phrase={phrase} totalItems={totalItems} searchState={state} resultsUrl={urls.pola.products} />
    <PageSection>
      <SearchResultsList
        results={pages}
        totalItems={totalItems}
        actions={
          <PrimaryButton styles={ButtonThemes[ButtonFlavor.GRAY]} onClick={onClear}>
            <span>Anuluj</span>
          </PrimaryButton>
        }
        onSelect={onSelect}
      />
      <MissingProductInfo />
    </PageSection>
  </>
);

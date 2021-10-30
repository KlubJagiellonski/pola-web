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
import { Spinner } from '../../components/Spinner';
import { InfoBox } from '../../components/InfoBox';

interface IFirstPageResults {
  state: SearchStateName;
  phrase: string;
  token: string;
  products: IProductData[];
  totalItems: number;

  onSelect: (code: EAN) => void;
  onClear: () => void;
}

export const FirstPageResults: React.FC<IFirstPageResults> = ({
  state,
  phrase,
  products,
  totalItems,
  onSelect,
  onClear,
}) => {
  let header: React.ReactNode;
  switch (state) {
    case SearchStateName.LOADED:
    case SearchStateName.SELECTED:
      header = (
        <SearchResultsHeader
          phrase={phrase}
          totalItems={totalItems}
          searchState={state}
          resultsUrl={urls.pola.products}
        />
      );
      break;
    case SearchStateName.LOADING:
      header = (
        <PageSection styles={{ textAlign: 'center' }}>
          <Spinner text="Wyszukiwanie produktów..." />
        </PageSection>
      );
      break;
    case SearchStateName.ERROR:
      header = (
        <PageSection styles={{ textAlign: 'center' }}>
          <InfoBox>
            <h3>Błąd Wyszukiwania</h3>
            <p>Spróbuj wprowadzić inną frazę...</p>
          </InfoBox>
        </PageSection>
      );
      break;
    case SearchStateName.INITIAL:
      header = null;
      break;
  }

  return (
    <>
      {header}
      {state === SearchStateName.LOADED && (
        <PageSection>
          <SearchResultsList
            results={products}
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
      )}
    </>
  );
};

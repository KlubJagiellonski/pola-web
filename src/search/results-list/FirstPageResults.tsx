import React from 'react';
import { EAN, IProductData } from '@Domain/products';
import { SearchResultsList } from '../../search/results-list/SearchResultsList';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { ButtonThemes, ButtonFlavor } from '@Components/buttons/Button';
import { SearchStateName } from '@State/search/search-reducer';
import { MissingProductInfo } from '../../search/results-list/MissingProductInfo';
import { Spinner } from '@Components/Spinner';

interface IFirstPageResults {
  phrase: string;
  token: string;
  products: IProductData[];
  totalItems: number;
  isLoaded: boolean;
  isLoading: boolean;

  onSelect: (code: EAN) => void;
  onClear: () => void;
}

export const FirstPageResults: React.FC<IFirstPageResults> = ({
  products,
  totalItems,
  onSelect,
  onClear,
  isLoaded,
  isLoading,
}) => {
  return (
    <>
      {isLoading && <Spinner text="Wyszukiwanie produktów..." />}
      {isLoaded && (
        <SearchResultsList
          results={products}
          totalItems={totalItems}
          actions={
            totalItems > 0 ? (
              <PrimaryButton styles={ButtonThemes[ButtonFlavor.GRAY]} onClick={onClear}>
                <span>Anuluj</span>
              </PrimaryButton>
            ) : undefined
          }
          onSelect={onSelect}
        />
      )}
      {(isLoaded || isLoading) && <MissingProductInfo />}
    </>
  );
};

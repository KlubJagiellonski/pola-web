import React from 'react';

import { EAN, IProductData } from '@Domain/products';

import { Spinner } from '@Components/Spinner';
import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';

import { MissingProductInfo } from './MissingProductInfo';
import { SearchResultsList } from './SearchResultsList';

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

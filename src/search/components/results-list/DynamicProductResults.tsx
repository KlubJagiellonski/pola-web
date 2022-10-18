import React from 'react';

import { EAN, IProductData } from '@Domain/products';

import { Spinner } from '@Components/Spinner';
import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { PageSection } from '@Layout/PageSection';

import { SearchStateName } from '../../state/search-reducer';
import { MissingProductInfo } from './MissingProductInfo';
import { SearchResultsHeader } from './SearchResultsHeader';
import { SearchResultsList } from './SearchResultsList';

import { color } from '@Styles/theme';

interface IDynamicProductResults {
  state: SearchStateName;
  phrase: string;
  token: string;
  pages: IProductData[];
  totalItems: number;

  onSelect: (code: EAN) => void;
  onLoadMore: () => void;
}

export const DynamicProductResults: React.FC<IDynamicProductResults> = ({
  state,
  phrase,
  pages,
  totalItems,
  onSelect,
  onLoadMore,
}) => {
  const loadButton =
    state === SearchStateName.LOADING ? (
      <PrimaryButton
        disabled={true}
        icon={<Spinner styles={{ size: 20, color: color.button.white }} />}
        styles={ButtonThemes[ButtonFlavor.RED]}
      />
    ) : (
      <PrimaryButton label="Wczytaj więcej" styles={ButtonThemes[ButtonFlavor.RED]} onClick={onLoadMore} />
    );

  return (
    <>
      <SearchResultsHeader phrase={phrase} totalItems={totalItems} searchState={state} />
      <PageSection>
        <SearchResultsList results={pages} totalItems={totalItems} onSelect={onSelect} actions={loadButton} />
        <MissingProductInfo />
      </PageSection>
    </>
  );
};

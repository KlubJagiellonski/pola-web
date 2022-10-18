import React from 'react';
import { PageSection } from '@Layout/PageSection';
import { color } from '@Styles/theme';
import { EAN, IProductData } from '@Domain/products';
import { SearchResultsList } from '../../search/results-list/SearchResultsList';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { ButtonThemes, ButtonFlavor } from '@Components/buttons/Button';
import { Spinner } from '@Components/Spinner';
import { SearchStateName } from '@State/search/search-reducer';
import { SearchResultsHeader } from '../../search/results-list/SearchResultsHeader';
import { MissingProductInfo } from '../../search/results-list/MissingProductInfo';

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

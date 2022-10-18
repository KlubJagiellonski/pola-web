import React from 'react';
import styled from 'styled-components';

import { IProductData, Product } from '@Domain/products';

import { color, fontSize, padding } from '@Styles/theme';

const InfoBox = styled.div`
  background-color: white;
  border: 2px solid ${color.background.red};
  border-radius: 1rem;
  margin: 0.25rem 0;
  padding: 0.25rem 0.5rem;
`;

interface IRussiaInfoBox {
  product: Product | IProductData;
}

export const RussiaInfoBox: React.FC<IRussiaInfoBox> = ({ product }) => {
  const isRussianProduct = product.code.startsWith('46');
  const isBelarussianProduct = product.code.startsWith('481');

  if (isRussianProduct || isBelarussianProduct) {
    return (
      <InfoBox>
        <span>Ten produkt pochodzi z kraju, który dokonał inwazji na Ukrainę. Zastanów się, czy chcesz go kupić.</span>
      </InfoBox>
    );
  }

  return null;
};

import React from 'react';
import styled from 'styled-components';
import { IManufacturer, Product } from '../../domain/products';
import { padding, fontSize } from '../../styles/theme';
import { ScoreBar } from '../../components/ScoreBar';
import { Field, ProductionField, ResearchField, RegisteredField, GlobalEntityField, IPolishValue } from './PolishValues';

const DetailsContainer = styled.div`
  padding: 0 ${padding.normal};

  .notes {
    font-size: ${fontSize.small};
  }
`;

interface IProductDetails {
  product: Product;
}

enum value {
  WORKERS = 'plWorkers',
  REGISTERED = 'plRegistered',
  CAPITAL = 'plCapital',
  RnD = 'plRnD',
  GLOBAL = 'plNotGlobEnt'
}

const getValueFromManufacturer = (manufacturer: IManufacturer, property: value): IPolishValue => {
  const value = manufacturer[property];
  const notes = manufacturer[property + '_notes' as keyof IManufacturer] as string;

  return { value, notes };
}

export const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const manufacturer = product.manufacturer;
  const workersValue = getValueFromManufacturer(manufacturer, value.WORKERS);
  const researchValue = getValueFromManufacturer(manufacturer, value.RnD);
  const registeredValue = getValueFromManufacturer(manufacturer, value.REGISTERED);
  const globalValue = getValueFromManufacturer(manufacturer, value.GLOBAL);

  return (
    <DetailsContainer>
      <h3>{product.name}</h3>
      <Field>
        <span>Punkty w rankingu Poli</span>
        <ScoreBar value={product.manufacturer.plScore || 0} unit="pkt" animation={{ duration: 1, delay: 0.2 }} />
      </Field>
      <Field>
        <span>udział polskiego kapitału</span>
        <ScoreBar value={product.manufacturer.plCapital || 0} unit="%" animation={{ duration: 1, delay: 0.2 }} />
        <p className='notes'>{product.manufacturer.plCapital_notes}</p>
      </Field>
      <ProductionField value={workersValue.value} notes={workersValue.notes} />
      <ResearchField value={researchValue.value} notes={researchValue.notes} />
      <RegisteredField value={registeredValue.value} notes={registeredValue.notes} />
      <GlobalEntityField value={globalValue.value} notes={globalValue.notes} />
      <Field>
        <p>{product.manufacturer.name}</p>
      </Field>
    </DetailsContainer>
  );
};

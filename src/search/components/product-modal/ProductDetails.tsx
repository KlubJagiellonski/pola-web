import React from 'react';
import styled from 'styled-components';

import { Product } from '@Domain/products';
import { AppSettings } from '@State/app-settings';

import { ScoreBar } from '@Components/ScoreBar';

import { RussiaInfoBox } from '../results-list/RussiaInfoBox';
import { Field, PolishPropertyName, ValueCheckboxField, getPropertiesFromManufacturer } from './PolishValues';

import { color, fontSize, padding } from '@Styles/theme';

const DetailsContainer = styled.div`
  padding: ${padding.normal};
  border-top: 1px solid ${color.background.transparencyGrey};

  header {
    display: flex;
    flex-flow: column;
    align-items: start;
    margin-bottom: 1em;
  }

  .property,
  .notes {
    margin-top: 0.5em;
  }

  .underline {
    text-decoration: underline;
  }

  .notes {
    font-size: ${fontSize.small};
  }

  .property {
    margin-bottom: 0.25em;
  }
`;

interface IProductDetails {
  product: Product;
}

export const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const manufacturer = product.manufacturer;
  const workersProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.WORKERS);
  const researchProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.RnD);
  const registeredProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.REGISTERED);
  const notGlobalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.NOT_GLOBAL);
  const capitalProperty = getPropertiesFromManufacturer(manufacturer, PolishPropertyName.CAPITAL);

  return (
    <DetailsContainer>
      <header>
        <h3>{product.name}</h3>
      </header>
      <RussiaInfoBox product={product} />
      <Field>
        <p className="property underline">{product.manufacturer.name}</p>
        <p className="property">{product.manufacturer.description}</p>
      </Field>
      <Field>
        <p className="property underline">Punkty w rankingu Poli:</p>
        <ScoreBar
          value={product.manufacturer.plScore}
          unit="pkt"
          missingValuePlaceholder="brak punktacji w rankingu Poli"
          animation={{ duration: 1, delay: 0.2 }}
        />
      </Field>
      <Field>
        <p className="property underline">Udział polskiego kapitału:</p>
        <ScoreBar
          value={capitalProperty.value}
          unit="%"
          missingValuePlaceholder="nieznany udział kapitału"
          animation={{ duration: 1, delay: 0.2 }}
        />
        {AppSettings.SHOW_POLISH_VALUE_NOTES && <p className="notes">{capitalProperty.notes}</p>}
      </Field>
      <ValueCheckboxField
        condition={workersProperty.value === 100}
        trueLabel="produkuje w Polsce"
        falseLabel="produkuje poza terytorium Polski"
        notes={workersProperty.notes}
      />
      <ValueCheckboxField
        condition={researchProperty.value === 100}
        trueLabel="prowadzi badania i rozwój w Polsce"
        falseLabel="prowadzi badania i rozwój poza terytorium Polski"
        notes={researchProperty.notes}
      />
      <ValueCheckboxField
        condition={registeredProperty.value === 100}
        trueLabel="zarejestrowana w Polsce"
        falseLabel="zarejestrowana poza terytorium Polski"
        notes={registeredProperty.notes}
      />
      <ValueCheckboxField
        condition={notGlobalProperty.value === 100}
        trueLabel="nie jest częścią zagranicznego koncernu"
        falseLabel="jest częścią zagranicznego koncernu"
        notes={notGlobalProperty.notes}
      />
    </DetailsContainer>
  );
};

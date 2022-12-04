import { IManufacturer } from 'search';
import styled from 'styled-components';

import React from 'react';

import { AppSettings } from 'app/app-settings';

import { Checkbox } from '@Components/checkbox';

import { padding } from '@Styles/theme';

export const Field = styled.div`
  margin-bottom: ${padding.normal};
`;

export interface IValueCheckbox {
  condition: boolean;
  trueLabel: string;
  falseLabel: string;
  notes: string;
}

export enum PolishPropertyName {
  WORKERS = 'plWorkers',
  REGISTERED = 'plRegistered',
  CAPITAL = 'plCapital',
  RnD = 'plRnD',
  NOT_GLOBAL = 'plNotGlobEnt',
}

export const getPropertiesFromManufacturer = (manufacturer: IManufacturer, name: PolishPropertyName) => {
  const value = manufacturer[name];
  const notes = manufacturer[(name + '_notes') as keyof IManufacturer] as string;

  return { value, notes };
};

export const ValueCheckboxField: React.FC<IValueCheckbox> = ({ condition, trueLabel, falseLabel, notes }) => {
  const label = trueLabel;
  return (
    <Field>
      <Checkbox label={label} checked={condition} readonly={true} />
      {AppSettings.SHOW_POLISH_VALUE_NOTES && <p className="notes">{notes}</p>}
    </Field>
  );
};

import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../components/checkbox';
import { padding } from '../../styles/theme';

export const Field = styled.div`
  margin-bottom: ${padding.normal};
`;

export interface IValueCheckbox {
    checked: boolean;
    label: string;
    notes: string;
}

export const ValueCheckboxField: React.FC<IValueCheckbox> = ({ checked, label, notes }) => (<Field>
    <Checkbox label={label} checked={checked} readonly={true} />
    <p className='notes'>{notes}</p>
</Field>)

export interface IPolishValue {
    value: number;
    notes: string;
}

export const ProductionField: React.FC<IPolishValue> = ({ value, notes }) => {
    const checked = value > 50;
    const label = checked ? 'produkuje w Polsce' : 'produkuje poza terytorium Polski';
    return <ValueCheckboxField checked={checked} label={label} notes={notes} />;
}

export const ResearchField: React.FC<IPolishValue> = ({ value, notes }) => {
    const checked = value > 50;
    const label = checked ? 'prowadzi badania i rozwój w Polsce' : 'prowadzi badania i rozwój poza terytorium Polski';
    return <ValueCheckboxField checked={checked} label={label} notes={notes} />;
}

export const RegisteredField: React.FC<IPolishValue> = ({ value, notes }) => {
    const checked = value > 50;
    const label = checked ? 'zajerestrowana w Polsce' : 'zajerestrowana poza terytorium Polski';
    return <ValueCheckboxField checked={checked} label={label} notes={notes} />;
}

export const GlobalEntityField: React.FC<IPolishValue> = ({ value, notes }) => {
    const checked = value === 0;
    const label = checked ? 'nie jest częścią zagranicznego koncernu' : 'jest częścią zagranicznego koncernu';
    return <ValueCheckboxField checked={checked} label={label} notes={notes} />;
}
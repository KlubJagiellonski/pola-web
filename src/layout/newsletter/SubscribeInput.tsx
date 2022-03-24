import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonThemes } from '../../components/buttons/Button';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { FormInput } from '../../components/form-input';
import { fontSize, color, padding } from '../../styles/theme';
import { validateEmail } from '../../utils/strings';

type InputType = 'text' | 'email';

const Container = styled.div`
  min-width: 20em;
  background-color: green; // ${color.background.white};
  border-radius: 1.5em;
  padding: 0.2em 0.2em 0.2em 1.5em;
`;

interface ISubscribeInput {
  name?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SubscribeInput: React.FC<ISubscribeInput> = ({ name, type = 'text', value, placeholder, onChange }) => {
  return (
    <Container>
      <FormInput name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
    </Container>
  );
};

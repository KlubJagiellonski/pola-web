import React from 'react';
import styled from 'styled-components';

import { FormInput } from '@Components/form-input';
import { ErrorMessage } from '@Components/form-input/FormToast';

import { color } from '@Styles/theme';

type InputType = 'text' | 'email';

const Container = styled.div`
  min-width: 20em;
`;

const InputContainer = styled.div`
  background-color: ${color.background.white};
  border-radius: 1.5em;
  padding: 0.4em 0.8em;
`;

interface ISubscribeInput {
  name?: string;
  type?: InputType;
  value?: string;
  errorMessage?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SubscribeInput: React.FC<ISubscribeInput> = ({
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  errorMessage,
}) => {
  return (
    <Container>
      <InputContainer>
        <FormInput name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
      </InputContainer>
      {errorMessage && <ErrorMessage styles={{ marginHorizontal: '1em' }}>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

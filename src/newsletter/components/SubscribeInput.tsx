import React from 'react';
import styled from 'styled-components';

import { FormInput } from '@Components/form-input';
import { ErrorMessage } from '@Components/form-input/FormToast';

import { color } from '@Styles/theme';

type InputType = 'text' | 'email';

const Container = styled.div`
  min-width: 20em;
  .error-message {
    line-height: 1.8em;
    padding-left: 1em;
    color: ${(p) => color.text.fail};
  }
`;

const InputContainer = styled.div`
  background-color: ${color.background.white};
  border-radius: 1.5em;
  padding: 0.4em 0.8em;
`;

interface ISubscribeInput {
  value: string;
  name?: string;
  type?: InputType;
  errorMessage?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SubscribeInput: React.FC<ISubscribeInput> = ({
  value,
  name,
  type = 'text',
  placeholder,
  onChange,
  errorMessage,
}) => {
  return (
    <Container>
      <InputContainer className="input-container">
        <FormInput name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
      </InputContainer>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </Container>
  );
};

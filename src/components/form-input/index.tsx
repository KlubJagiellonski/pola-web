import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { getGuid } from '@Utils/data/random-number';

import { color, fontSize } from '@Styles/theme';

const InputContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const StyledInput = styled.input`
  background: ${color.background.white};
  border: none;
  outline: none;
  box-shadow: none;
  font-size: ${fontSize.normal};
`;

interface IFormInput {
  value: string;
  type?: 'text' | 'email';
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const FormInput: React.FC<IFormInput> = ({
  value,
  type = 'text',
  name = `input_${getGuid()}`,
  placeholder,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  return (
    <InputContainer>
      <StyledInput
        name={name}
        type={type}
        value={value}
        disabled={!onChange}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

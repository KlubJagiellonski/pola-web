import React, { ChangeEvent } from 'react';
import { Validator } from '../../state/types';
import { getGuid } from '../../utils/data/random-number';

interface IInput {
  value?: string;
  type?: 'text' | 'email';
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  validator?: Validator<string>;
}

export const Input: React.FC<IInput> = ({
  value,
  type = 'text',
  name = `input_${getGuid()}`,
  placeholder,
  onChange,
  validator,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  const validationMessage = value && validator && validator(value);

  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        disabled={!onChange}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {validationMessage && <h2>{validationMessage}</h2>}
    </>
  );
};

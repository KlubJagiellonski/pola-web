import React, { ChangeEvent } from 'react';
import { getGuid } from '../../utils/data/random-number';

interface IInput {
  value?: string;
  type?: 'text' | 'email';
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<IInput> = ({
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
    <input
      name={name}
      type={type}
      value={value}
      disabled={!onChange}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

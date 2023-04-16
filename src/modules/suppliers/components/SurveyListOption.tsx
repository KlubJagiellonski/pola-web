import { pgeTheme, px } from '../styles/inquiry-theme';
import styled from 'styled-components';

import * as React from 'react';

const OptionContainer = styled.label`
  align-items: flex-start;
  position: relative;
  padding-left: ${pgeTheme.space.large};
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked {
      & ~ .checkmark {
        background-color: ${pgeTheme.colors.optionSelected};

        &:after {
          display: block;
        }
      }
      & ~ .option-name {
        font-weight: 600;
        color: ${pgeTheme.colors.optionSelected};
      }
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: ${px(pgeTheme.space.checkmark)};
    width: ${px(pgeTheme.space.checkmark)};
    background-color: ${pgeTheme.colors.option};
    border-radius: 50%;

    &:after {
      content: '';
      position: absolute;
      display: none;

      top: ${px((pgeTheme.space.checkmark - pgeTheme.space.checkmarkCenter) / 2)};
      left: ${px((pgeTheme.space.checkmark - pgeTheme.space.checkmarkCenter) / 2)};
      width: ${px(pgeTheme.space.checkmarkCenter)};
      height: ${px(pgeTheme.space.checkmarkCenter)};
      border-radius: 50%;
      background: white;
    }
  }

  &:hover input {
    & ~ .checkmark {
      background-color: ${pgeTheme.colors.optionHover};
    }
    & ~ .option-name {
      color: ${pgeTheme.colors.optionSelected};
    }
  }
`;

export interface ISurveyListOption {
  name: string;
  groupName: string;
  score?: number;

  onSelect: () => void;
}

export const SurveyListOption: React.FC<ISurveyListOption> = (props: ISurveyListOption) => {
  const { name, groupName, score, onSelect } = props;
  const text = score ? `${name} (${score})` : name;

  return (
    <OptionContainer className="container">
      <input
        type="radio"
        name={groupName}
        title={name}
        onChange={(e: React.FormEvent<HTMLInputElement>) => onSelect()}
      />
      <span className="checkmark"></span>
      <span className="option-name">{text}</span>
    </OptionContainer>
  );
};

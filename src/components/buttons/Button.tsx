import styled from 'styled-components';
import { color, padding } from '../../styles/theme';

export const Button = styled.button<{ theme: IButtonTheme }>`
  box-sizing: border-box;
  cursor: pointer;
  color: ${props => props.theme.color.text};
  background-color: ${props => props.theme.color.background};
  border: none;
  padding: ${padding.small} ${padding.normal};
  white-space: nowrap;
  font-weight: bold;
  transition-duration: 0.5s;

  &:hover {
    background-color: ${props => props.theme.color.hover};
  }

  &:focus {
    outline: none;
  }

  &.disabled {
    cursor: default;
    background-color: ${color.button.disabled};
    font-weight: 400;
  }
`;

interface IButtonTheme {
  color: {
    background: string;
    hover: string;
    text: string;
  };
}

export const getButtonColor = (buttonColor?: ButtonColor): IButtonTheme => {
  switch (buttonColor) {
    case ButtonColor.Red:
      return {
        color: {
          background: color.button.red,
          hover: color.button.redLight,
          text: color.text.light,
        },
      };
      case ButtonColor.LightGray:
        return {
          color: {
            background: color.button.lightGray,
            hover: color.button.white,
            text: color.text.primary,
          },
        };
    case ButtonColor.Gray:
    default:
      return {
        color: {
          background: color.button.gray,
          hover: color.button.disabled,
          text: color.text.primary,
        },
      };
  }
};

export enum ButtonColor {
  Gray,
  LightGray,
  Red,
}
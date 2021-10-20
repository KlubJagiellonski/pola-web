import styled from 'styled-components';
import { IButtonTheme } from '../../styles/button-theme';
import { color, padding } from '../../styles/theme';

export const Button = styled.button<{ theme: IButtonTheme; disabled?: boolean }>`
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border: none;
  padding: ${padding.small} ${padding.normal};
  white-space: nowrap;
  font-weight: bold;
  transition-duration: 0.5s;
  font-size: ${(props) => (props.theme.fontSize ? props.theme.fontSize : '18px')};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
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

import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { ButtonThemes, IButtonTheme } from '../../styles/button-theme';
import { color, Device, fontSize } from '../../styles/theme';

const ButtonContainer = styled(Button)`
  border-radius: 20px;
  border: 2px solid ${color.border.white};
  font-weight: 300;
  text-transform: uppercase;

  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`;

export interface ISecondaryButton {
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  styles: IButtonTheme;
  fontSize?: string;
  className?: string;
  children?: React.ReactNode;

  onClick?: () => void;
}

export const SecondaryButton: React.FC<ISecondaryButton> = ({
  label,
  icon,
  className,
  disabled,
  styles,
  fontSize,
  children,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    !disabled && onClick && onClick();
  };

  const themeColor = ButtonThemes[styles.color];

  const theme = {
    color: themeColor,
    fontSize: styles.fontSize,
  };

  return (
    <ButtonContainer theme={theme} className={className} onClick={handleClick} disabled={disabled}>
      {icon}
      {label}
      {children}
    </ButtonContainer>
  );
};

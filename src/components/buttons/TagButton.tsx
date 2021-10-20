import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { ButtonColor, ButtonThemes } from '../../styles/button-theme';
import { color } from '../../styles/theme';

const ButtonContainer = styled(Button)`
  border-radius: 20px;
  border: 2px solid ${color.border.white};
  font-weight: 300;
  text-transform: uppercase;
`;

export interface ITagButton {
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  styles: IButtonTheme;
  className?: string;
  children?: React.ReactNode;

  onClick?: () => void;
}

export const TagButton: React.FC<ITagButton> = ({ label, icon, className, disabled, styles, children, onClick }) => {
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

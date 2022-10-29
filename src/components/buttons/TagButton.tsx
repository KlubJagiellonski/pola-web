import styled from 'styled-components';

import React from 'react';

import { TAG_SEPARATOR } from 'posts/services/url-service';

import { Button, IButtonTheme } from './Button';

import { color, fontSize } from '@Styles/theme';

const ButtonContainer = styled(Button)`
  border-radius: 20px;
  border: 2px solid ${color.border.white};
  font-weight: 300;
  text-transform: uppercase;
  font-size: ${fontSize.small};
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

  return (
    <ButtonContainer theme={styles} className={className} onClick={handleClick} disabled={disabled}>
      {icon}
      {label.replaceAll(TAG_SEPARATOR, ' ')}
      {children}
    </ButtonContainer>
  );
};

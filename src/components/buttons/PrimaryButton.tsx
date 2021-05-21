import React from 'react';
import {ButtonColor, Button, getButtonColor} from './Button'

export interface IPrimaryButton {
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  color?: ButtonColor;
  className?: string;

  onClick?: () => void;
}

export const PrimaryButton: React.FC<IPrimaryButton> = ({ label, icon, className, disabled, color, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    !disabled && onClick && onClick();
  };

  const theme = getButtonColor(color);

  return (
    <Button theme={theme} className={className} onClick={handleClick}>
      {icon}
      {label}
    </Button>
  );
};
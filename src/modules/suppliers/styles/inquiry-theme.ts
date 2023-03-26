import { color, margin } from 'styles/theme';

export const pgeTheme = {
  colors: {
    line: color.text.red,
    option: color.border.grey,
    optionHover: color.button.redLight,
    optionSelected: color.text.red,
  },
  space: {
    small: margin.small,
    normal: margin.normal,
    large: margin.big,
    checkmark: 25,
    checkmarkCenter: 9,
  },
};

export const px = (size: number): string => size + 'px';

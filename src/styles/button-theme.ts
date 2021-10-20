import { color } from './theme';

export interface IButtonColors {
  background: string;
  hover: string;
  text: string;
}

export interface IButtonTheme {
  colors: IButtonColors;
  fontSize?: string;
}

export type IButtonThemes = {
  [name in ButtonColor]: IButtonTheme;
};

export enum ButtonColor {
  GRAY = 'Gray',
  LIGHT_GRAY = 'LightGray',
  RED = 'Red',
  WHITE = 'White',
  WHITE_RED = 'WhiteRed',
}

export const ButtonThemes: IButtonThemes = {
  [ButtonColor.RED]: {
    colors: {
      background: color.button.red,
      hover: color.button.redLight,
      text: color.text.light,
    },
  },
  [ButtonColor.WHITE_RED]: {
    colors: {
      background: color.button.white,
      hover: color.button.white,
      text: color.text.red,
    },
  },
  [ButtonColor.WHITE]: {
    colors: {
      background: color.button.white,
      hover: color.button.white,
      text: color.text.primary,
    },
  },
  [ButtonColor.LIGHT_GRAY]: {
    colors: {
      background: color.button.lightGray,
      hover: color.background.gray,
      text: color.text.primary,
    },
  },
  [ButtonColor.GRAY]: {
    colors: {
      background: color.button.gray,
      hover: color.button.disabled,
      text: color.text.primary,
    },
  },
};

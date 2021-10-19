import { color } from './theme';

export interface IButtonColor {
  background: string;
  hover: string;
  text: string;
  fontSize?: string;
}

// export enum ButtonTheme {
//   [ButtonColor.Red]: {
//     background: color.button.red,
//     hover: color.button.redLight,
//     text: color.text.light,
//   }
// }

// export enum ButtonTheme {
//   [ButtonColor.Red]: {
//     background: color.button.red,
//     hover: color.button.redLight,
//     text: color.text.light,
//   }
// }
export type IButtonThemes = {
  [name in ButtonColor]: IButtonColor;
};

export enum ButtonColor {
  Gray = 'gray',
  LightGray = 'lightGray',
  Red = 'red',
  White = 'white',
  WhiteRed = 'whiteRed',
}

export const ButtonThemes: IButtonThemes = {
  [ButtonColor.Red]: {
    background: color.button.red,
    hover: color.button.redLight,
    text: color.text.light,
  },
  [ButtonColor.WhiteRed]: {
    background: color.button.white,
    hover: color.button.white,
    text: color.text.red,
  },
  [ButtonColor.White]: {
    background: color.button.white,
    hover: color.button.white,
    text: color.text.primary,
  },
  [ButtonColor.LightGray]: {
    background: color.button.lightGray,
    hover: color.background.gray,
    text: color.text.primary,
  },
  [ButtonColor.Gray]: {
    background: color.button.gray,
    hover: color.button.disabled,
    text: color.text.primary,
  },
};

export const getButtonTheme = (buttonColor?: ButtonColor): IButtonColor => {
  switch (buttonColor) {
    case ButtonColor.Red:
      return {
        background: color.button.red,
        hover: color.button.redLight,
        text: color.text.light,
      };
    case ButtonColor.WhiteRed:
      return {
        background: color.button.white,
        hover: color.button.white,
        text: color.text.red,
      };
    case ButtonColor.White:
      return {
        background: color.button.white,
        hover: color.button.white,
        text: color.text.primary,
      };
    case ButtonColor.LightGray:
      return {
        background: color.button.lightGray,
        hover: color.background.gray,
        text: color.text.primary,
      };
    case ButtonColor.Gray:
    default:
      return {
        background: color.button.gray,
        hover: color.button.disabled,
        text: color.text.primary,
      };
  }
};

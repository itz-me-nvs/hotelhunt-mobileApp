import Color from 'color';
import {ThemeType} from '../models/component.type';

/* Color Theme constants */
export const lightTheme: ThemeType = {
  primary: 'rgba(12, 96, 243, 1)',
  'primary-75': 'rgba(12, 96, 243, 0.75)',
  'primary-50': 'rgba(12, 96, 243, 0.5)',
  'primary-25': 'rgba(12, 96, 243, 0.25)',
  'primary-15': 'rgba(12, 96, 243, 0.15)',

  secondary: 'rgba(70, 95, 124, 1)',
  'secondary-75': 'rgba(70, 95, 124, 0.75)',
  'secondary-50': 'rgba(70, 95, 124, 0.5)',
  'secondary-25': 'rgba(70, 95, 124, 0.25)',

  background: '#FFFFFF',

  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',

  gray: '#BFBFBF',
  grayLight: '#EFEFEF',
  grayDark: '#6D6D6D',

  black: '#000000',
  white: '#FFFFFF',
  'white-75': 'rgba(255, 255, 255, 0.75)',

  pageHeader: 'rgba(12, 96, 243, 1)',
  'pageHeader-50': 'rgba(12, 96, 243, 0.05)',
  fancyLightBlue: 'rgba(120, 185, 235, 1)',
  'fancyLightBlue-75': 'rgba(120, 185, 235, 0.75)',
  'fancyLightBlue-50': 'rgba(120, 185, 235, 0.5)',
  'fancyLightBlue-25': 'rgba(120, 185, 235, 0.25)',
  'fancyLightBlue-13': 'rgba(120, 185, 235, 0.13)',
  'fancyActiveLightBlue-15': 'rgba(146, 183, 255, 0.15)',

  //rgba colors
  green: 'rgba(71, 79, 94, 0.75)',
  red: 'rgba(255, 0, 0, 0.75)',
  blue: 'rgba(0, 0, 255, 0.75)',
};

/*
Generating dark theme from light theme.
HSL color model to adjust the lightness and saturation values of the colors to create their dark theme variants.
*/

const generateDarkColor = <T extends ThemeType>(lightTheme: T) => {
  const darkTheme: T = {} as T;

  for (const [key, value] of Object.entries(lightTheme)) {
    const hsl = Color(value).hsl().array() as [number, number, number];

    // We invert the lightness value to generate the corresponding dark color.
    hsl[2] = 100 - hsl[2];

    // We reduce the saturation value by 60% to generate the corresponding dark color.
    hsl[1] = hsl[1] * 0.6;

    darkTheme[key as keyof ThemeType] = Color.hsl(hsl).hex();
  }
  return darkTheme;
};

export const darkTheme = generateDarkColor(lightTheme);
console.log(darkTheme);

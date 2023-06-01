import {TextProps} from 'react-native';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native/types';
import {RouterPathList} from './app.type';

/* Basic component type */
export type TypographyComponentType = {
  children: any;
  color?: keyof ThemeType;

  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontFamily?: 'Regular' | 'Bold' | 'Medium' | 'SemiBold';
  fontSize?: 24 | 20 | 18 | 16 | 14 | 11 | 12 | 10 | 8 | 6;
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: StyleProp<TextStyle>;
  theme?: ThemeType;
} & TextProps;

export type ButtonComponentType = {
  children: any;
  color?: keyof ThemeType;
  style?: StyleProp<ViewStyle>;
  theme?: ThemeType;
} & TouchableOpacityProps;

export type PageHeaderComponentType = {
  children?: any;
  title: string;
  subtitle?: string;
  icon?: string;
  fancy?: boolean;

  routerPath?: RouterPathList;
  ScrollBackgroundColor?: keyof ThemeType;
  animatedValue?: any;
};

export type NoDataComponentType = {
  title?: string;
  subtitle?: string;
  icon?: string;
};

export type SnackBarComponentType = {
  message: string;
  type: StatusType;
  duration?: number;
  onClose?: () => void;
  onAction?: () => void;
  actionText?: string;
  visible: boolean;
};

export type StatusType = 'success' | 'danger' | 'warning' | 'info';

/* Theme constant type */

export type ThemeType = {
  primary: string;
  'primary-75': string;
  'primary-50': string;
  'primary-25': string;
  'primary-15': string;

  secondary: string;
  'secondary-75': string;
  'secondary-50': string;
  'secondary-25': string;

  background: string;

  success: string;
  warning: string;
  error: string;

  gray: string;
  grayLight: string;
  grayDark: string;

  black: string;
  white: string;
  'white-75': string;

  // rgba colors
  red: string;
  green: string;
  blue: string;

  // custom fancy colors
  pageHeader: string;
  'pageHeader-50': string;
  fancyLightBlue: string;
  'fancyLightBlue-75': string;
  'fancyLightBlue-50': string;
  'fancyLightBlue-25': string;
  'fancyLightBlue-13': string;
  'fancyActiveLightBlue-15': string;
};

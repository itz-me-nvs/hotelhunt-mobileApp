// Context and Reducer Types

import {UserAccountType} from '../services/db';
import {ThemeType} from './component.type';

export type UserContextType = {
  state: UserStateType;
  dispatch: React.Dispatch<AppContextActionType>;
};

export type AppContextActionType =
  | {
      type: 'LOGIN_USER';
      payload: UserAccountType;
    }
  | {
      type: 'LOGOUT_USER';
    }
  | {
      type: 'THEME';
      payload: Partial<ThemeType>;
    };

export type UserStateType = {
  isLoggedIn: boolean;
} & UserAccountType;

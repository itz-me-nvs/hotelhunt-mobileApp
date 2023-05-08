import {useReducer} from 'react';
import {USER_LOCAL_STORAGE_KEY} from '../../shared/constants/app.constant';
import {
  AppContextActionType,
  UserStateType,
} from '../../shared/models/app.type';
import useAsyncStorage from './useAsynStorage';

const initialUserState: UserStateType = {
  email: '',
  name: '',
  address: {
    latitude: 0,
    longitude: 0,
  },
  admin: {
    hotels: [],
  },
  cart: [],
  mobileno: '',
  notifications: [],
  uid: '',
  isLoggedIn: false,
};

const UserReducer = (state: UserStateType, action: AppContextActionType) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    case 'LOGOUT_USER':
      // remove user from local storage to log user out

      return initialUserState;

    default:
      return state;
  }
};

const PersistedReducer = () => {
  const {value} = useAsyncStorage<UserStateType>(USER_LOCAL_STORAGE_KEY);
  return useReducer(UserReducer, value!);
};

export {UserReducer, PersistedReducer};

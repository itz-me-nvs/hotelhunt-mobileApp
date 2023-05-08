// make a context for the user

import {createContext, useMemo} from 'react';
import {UserContextType} from '../../shared/models/app.type';
import {PersistedReducer} from './UserReducer';

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Global User Provider (Store) for the app
const UserProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [state, dispatch] = PersistedReducer();

  // memoized state and dispatch
  const UserMemoizedState = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <UserContext.Provider value={UserMemoizedState}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

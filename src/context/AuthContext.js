import React from 'react';
import Configure from '../component/configure';
import { useApolloClient } from '@apollo/client';

export const AuthContext = React.createContext({ isAuth: false, login: () => {}, logout: () => {} });

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [isAuth, setAuth] = React.useState(!!localStorage.getItem(Configure.userTokenField));

  const contextValue = React.useMemo(() => {
    const logout = () => {
      const keysToRemove = [Configure.userTokenField, 'WTK', 'BTK', 'CTK'];
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      client.clearStore();
      client.resetStore();
      setAuth(false);
    };

    const login = () => {
      setAuth(true);
    };

    return { isAuth, login, logout };
  }, [isAuth]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

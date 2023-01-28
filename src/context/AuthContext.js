import React from 'react';
import Configure from '../component/configure';
import { useApolloClient } from '@apollo/client';

export const AuthContext = React.createContext({
  isAuth: false,
  step: 'closed',
  login: () => {},
  logout: () => {},
  openModal: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [isAuth, setAuth] = React.useState(!!localStorage.getItem(Configure.userTokenField));
  const [step, setStep] = React.useState('closed');

  const contextValue = React.useMemo(() => {
    const logout = () => {
      const keysToRemove = [Configure.userTokenField, 'WTK', 'BTK', 'CTK'];
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      client.clearStore().then();
      client.resetStore().then();
      setAuth(false);
    };

    const login = () => {
      setAuth(true);
    };

    const openModal = (currentStep) => {
      setStep(currentStep);
    };

    return { isAuth, step, openModal, login, logout };
  }, [isAuth, step]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

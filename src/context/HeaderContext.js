import React from 'react';

export const HeaderContext = React.createContext({
  mode: 'default',
  content: '',
  setMode: (currentMode) => {},
  setContent: (currentContent) => {},
});
export const useHeader = () => React.useContext(HeaderContext);

export function HeaderProvider({ children }) {
  const [mode, setMode] = React.useState('default');
  const [content, setContent] = React.useState('');

  const contextValue = React.useMemo(() => {
    return { mode, content, setMode, setContent };
  }, [mode, content]);

  return <HeaderContext.Provider value={contextValue}>{children}</HeaderContext.Provider>;
}
export const HeaderConsumer = HeaderContext.Consumer;

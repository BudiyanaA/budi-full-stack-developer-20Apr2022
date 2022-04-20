import { createContext, useContext, useState } from 'react';
import { object, func } from 'prop-types';

// init AppContext
const AppContext = createContext();

// Init Provider
export function AppWrapper({ children }) {
  const [sidebarActive, setSidebarActive] = useState(0);

  return (
    <AppContext.Provider value={{ sidebarActive, setSidebarActive }}>
      {children}
    </AppContext.Provider>
  );
}

AppWrapper.propTypes = {
  reducer: func,
  initialState: object,
};

export function useAppState() {
  return useContext(AppContext);
}

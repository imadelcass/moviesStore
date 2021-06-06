import { createContext, useState } from 'react';

export const LocalhostContext = createContext();

export const LocalhostProvider = ({ children }) => {
  const [data, setData] = useState('fgdg');

  return (
    <LocalhostContext.Provider value={{ data, setData }}>
      {children}
    </LocalhostContext.Provider>
  );
};


import { createContext, useState } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(2);

  return (
    <PaginationContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PaginationContext.Provider>
  );
};

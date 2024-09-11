import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedValues, setSelectedValues] = useState({});

  return (
    <DataContext.Provider value={{ selectedValues, setSelectedValues }}>
      {children}
    </DataContext.Provider>
  );
};

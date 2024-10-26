import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext({
  fetchData: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const fetchData = () => {
    setUpdateFlag((prev) => !prev); // Đảo ngược trạng thái để kích hoạt re-fetch
  };

  return (
    <DataContext.Provider value={{ fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

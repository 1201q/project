import React, { useState, createContext, useContext } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSidebarChattingOpen, setIsSidebarChattingOpen] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isUserModalOpen,
        setIsUserModalOpen,
        isSidebarChattingOpen,
        setIsSidebarChattingOpen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};

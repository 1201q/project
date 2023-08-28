import React, { useState, createContext, useContext } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("main"); // main, calendar
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSidebarChattingOpen, setIsSidebarChattingOpen] = useState(false);
  const [isSidebarProjectOpen, setIsSidebarProjectOpen] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isUserModalOpen,
        setIsUserModalOpen,
        isSidebarChattingOpen,
        setIsSidebarChattingOpen,
        isSidebarProjectOpen,
        setIsSidebarProjectOpen,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};

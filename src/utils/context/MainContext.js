import React, { useState, createContext, useContext } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("dashboard"); // main, calendar, dashboard, schedulePage, MemoPage, ProjectPage
  const [currentHomeContents, setCurrentHomeContents] = useState("dashboard");
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
        currentHomeContents,
        setCurrentHomeContents,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};

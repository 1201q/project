import React, { useState, createContext, useContext, useEffect } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("dashboard"); // main, calendar, dashboard, schedulePage, MemoPage, ProjectPage
  const [currentHomeContents, setCurrentHomeContents] = useState("dashboard");
  const [todoMode, setTodoMode] = useState("week");
  const [projectPageMode, setProjectPageMode] = useState("myproject");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSidebarChattingOpen, setIsSidebarChattingOpen] = useState(false);
  const [isSidebarProjectOpen, setIsSidebarProjectOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const chattingOpen = JSON.parse(localStorage.getItem("isChattingOpen"));
      const projectOpen = JSON.parse(localStorage.getItem("isProjectOpen"));
      const todoMode = localStorage.getItem("todoMode");
      const projectPageMode = localStorage.getItem("projectPageMode");

      if (chattingOpen === null) {
        localStorage.setItem("isChattingOpen", false);
      } else {
        setIsSidebarChattingOpen(chattingOpen);
      }

      if (projectOpen === null) {
        localStorage.setItem("isProjectOpen", false);
      } else {
        setIsSidebarProjectOpen(projectOpen);
      }

      if (todoMode === null) {
        localStorage.setItem("todoMode", "week");
      } else {
        setTodoMode(todoMode);
      }

      if (projectPageMode === null) {
        localStorage.setItem("projectPageMode", "myproject");
      } else {
        setProjectPageMode(projectPageMode);
      }
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        projectPageMode,
        setProjectPageMode,
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
        todoMode,
        setTodoMode,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};

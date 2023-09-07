import React, { useState, createContext, useContext } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectListData, setProjectListData] = useState([]);
  return (
    <ProjectContext.Provider
      value={{
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
        projectListData,
        setProjectListData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};

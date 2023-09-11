import React, { useState, createContext, useContext } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [isProjectDataLoading, setIsProjectDataLoading] = useState(true);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectListData, setProjectListData] = useState([]);
  const [joinedProjectList, setJoinedProjectList] = useState([]);
  return (
    <ProjectContext.Provider
      value={{
        isProjectDataLoading,
        setIsProjectDataLoading,
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
        projectListData,
        setProjectListData,
        joinedProjectList,
        setJoinedProjectList,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};

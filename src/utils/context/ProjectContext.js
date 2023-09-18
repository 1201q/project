import React, { useState, createContext, useContext } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [isProjectDataLoading, setIsProjectDataLoading] = useState(true);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectListData, setProjectListData] = useState([]);
  const [joinedProjectList, setJoinedProjectList] = useState([]);
  const [selectedProjectUid, setSelectedProjectUid] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState(null); // 선택한 프로젝트 데이터
  const [selectedProjectMembersData, setSelectedProjectMembersData] = useState(
    []
  ); // 선택한 프로젝트 멤버의 데이터 배열

  const [selectedProjectGroup, setSelectedProjectGroup] = useState([]);
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
        selectedProjectUid,
        setSelectedProjectUid,
        selectedProjectData,
        setSelectedProjectData,
        selectedProjectMembersData,
        setSelectedProjectMembersData,
        selectedProjectGroup,
        setSelectedProjectGroup,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};

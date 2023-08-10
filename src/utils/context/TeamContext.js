import React, { useState, createContext, useContext } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [joinedTeamList, setJoinedTeamList] = useState([]);
  const [isJoinedTeamListModal, setIsJoinedTeamListModal] = useState(false);
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  return (
    <TeamContext.Provider
      value={{
        joinedTeamList,
        setJoinedTeamList,
        isJoinedTeamListModal,
        setIsJoinedTeamListModal,
        selectedTeamData,
        setSelectedTeamData,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  return useContext(TeamContext);
};

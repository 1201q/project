import React, { useState, createContext, useContext } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [joinedTeamList, setJoinedTeamList] = useState([]);
  return (
    <TeamContext.Provider value={{ joinedTeamList, setJoinedTeamList }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  return useContext(TeamContext);
};

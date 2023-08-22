import React, { useState, createContext, useContext } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [joinedTeamList, setJoinedTeamList] = useState([]); // 내가 소속중인 팀 리스트
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null); // 선택한 팀 데이터
  const [selectedTeamMembersData, setSelectedTeamMembersData] = useState([]); // 선택한 팀 멤버의 데이터 배열

  const [isTeamSettingModal, setIsTeamSettingModal] = useState(false); // 설정 모달 출력 부울 여부
  const [isSettingModalLoading, setIsSettingModalLoading] = useState(false);

  return (
    <TeamContext.Provider
      value={{
        joinedTeamList,
        setJoinedTeamList,
        selectedTeam,
        setSelectedTeam,
        selectedTeamData,
        setSelectedTeamData,
        selectedTeamMembersData,
        setSelectedTeamMembersData,
        // 모달
        isTeamSettingModal,
        setIsTeamSettingModal,
        isSettingModalLoading,
        setIsSettingModalLoading,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  return useContext(TeamContext);
};

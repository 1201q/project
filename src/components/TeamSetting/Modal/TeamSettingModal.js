import { useTeam } from "@/utils/context/TeamContext";
import { motion } from "framer-motion";
import styled from "styled-components";
import * as colors from "../../../styles/colors";
import X from "../../../assets/x.svg";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { updateTeamData } from "@/utils/firebase/team";

import { TeamName } from "./Contents/TeamName";
import { TeamDescription } from "./Contents/TeamDescription";
import { TeamDelete } from "./Contents/TeamDelete";
import { TeamHandOver } from "./Contents/TeamHandOver";
import { TeamInvite } from "./Contents/TeamInvite";
import { TeamMemberSetting } from "./Contents/TeamMemberSetting";
import { TeamAdminSetting } from "./Contents/TeamAdminSetting";
import TeamModalLoading from "./Contents/TeamModalLoading";
import { useEffect, useState } from "react";

export default function TeamSettingModal() {
  const user = useAuth();
  const {
    setIsTeamSettingModal,
    isSettingModalLoading,
    setIsSettingModalLoading,
    selectedTeamData,
  } = useTeam();
  const [menuSelect, setMenuSelect] = useState("teamName");
  const [teamName, setTeamName] = useState(selectedTeamData.teamName);
  const [teamDescription, setTeamDescription] = useState(
    selectedTeamData.teamDescription
  );

  const renderAuthorityInfo = (item) => {
    const isOwner = item.teamOwner === user.user.uid;
    const isAdmin =
      item.teamAdminMembers.filter((uid) => uid === user.user.uid).length > 0
        ? true
        : false;

    if (isOwner) {
      return <AdminInfo styledbg={colors.calendar.blue}>소유자</AdminInfo>;
    } else if (isAdmin) {
      return <AdminInfo styledbg={colors.calendar.gray}>관리자</AdminInfo>;
    } else {
      return (
        <AdminInfo
          styledbg={colors.background.gray}
          style={{ color: colors.font.black }}
        >
          정회원
        </AdminInfo>
      );
    }
  };

  const renderContents = () => {
    const sideMenu = {
      teamName: TeamName,
      teamDescription: TeamDescription,
      teamDelete: TeamDelete,
      teamHandOver: TeamHandOver,
      teamInvite: TeamInvite,
      teamMemberSetting: TeamMemberSetting,
      teamAdminSetting: TeamAdminSetting,
    };

    const SelectedComponent = sideMenu[menuSelect];
    if (SelectedComponent) {
      return (
        <SelectedComponent
          teamName={teamName}
          setTeamName={setTeamName}
          teamDescription={teamDescription}
          setTeamDescription={setTeamDescription}
          onUpdateTeamData={onUpdateTeamData}
        />
      );
    }
  };

  const onUpdateTeamData = async (field, value) => {
    setIsSettingModalLoading(true);
    if (field === "teamName" && selectedTeamData.teamName === value) {
      console.log("기존과 같아요");
      return;
    }
    if (
      field === "teamDescription" &&
      selectedTeamData.teamDescription === value
    ) {
      console.log("기존과 설명이 같아요");
      return;
    }

    const update = await updateTeamData(
      "team",
      selectedTeamData.docId,
      field,
      value
    );

    if (!update) {
      setIsSettingModalLoading(false);
    } else {
      console.log(update);
      setIsSettingModalLoading(false);
    }
  };

  return (
    <Container>
      <ModalContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeaderContainer>
          <CloseButton onClick={() => setIsTeamSettingModal(false)}>
            <X width={13} height={13} fill={colors.font.darkgray} />
          </CloseButton>
          <HeaderText>팀 설정</HeaderText>{" "}
          <TeamHeaderText>{selectedTeamData.teamName}</TeamHeaderText>
          {renderAuthorityInfo(selectedTeamData)}
        </HeaderContainer>
        {/* 컨텐츠 */}
        <FlexDiv>
          <SidebarContainer>
            {/* 팀 설정*/}
            <SidebarMenuContainer>
              <SideMainMenu>팀 설정</SideMainMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamName");
                }}
              >
                <SideMenuText>팀 이름 변경</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamDescription");
                }}
              >
                <SideMenuText>팀 소개 변경</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamDelete");
                }}
              >
                <SideMenuText>팀 삭제</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamHandOver");
                }}
              >
                <SideMenuText>팀 양도</SideMenuText>
              </SideSubMenu>
            </SidebarMenuContainer>
            {/* 멤버 */}
            <SidebarMenuContainer>
              <SideMainMenu>팀원 설정</SideMainMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamInvite");
                }}
              >
                <SideMenuText>팀원 초대</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamMemberSetting");
                }}
              >
                <SideMenuText>팀원 관리</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("teamAdminSetting");
                }}
              >
                <SideMenuText>관리자 권한 관리</SideMenuText>
              </SideSubMenu>
            </SidebarMenuContainer>
          </SidebarContainer>
          <ContentsContainer>
            {!isSettingModalLoading ? (
              renderContents()
            ) : (
              <TeamModalLoading text={"업데이트 중.."} />
            )}
          </ContentsContainer>
        </FlexDiv>
      </ModalContainer>
    </Container>
  );
}

// container
const Container = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  color: #373c3e;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 700px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;
  background-color: red;
  z-index: 900;
  background-color: white;
  /* padding: 25px; */
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.border.deepgray};
  width: 100%;
  padding: 20px 25px;
`;

const FlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 470px;
  padding: 20px;
`;

const ContentsContainer = styled(motion.div)`
  width: 100%;
  overflow-y: auto;
`;

const SidebarContainer = styled.div`
  width: 200px;
  min-width: 200px;

  height: 100%;
  padding-top: 10px;
  margin-right: 25px;
`;

const SidebarMenuContainer = styled.div`
  margin-bottom: 30px;
`;

// modeal header
const HeaderText = styled.p`
  /* margin-bottom: 30px; */
  font-size: 30px;
  font-weight: 800;
`;
const TeamHeaderText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.font.gray};
  opacity: 0.5;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 9px;
`;
const AdminInfo = styled.div`
  width: 48px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.styledbg};
  color: white;
  border-radius: 5px;
  margin-top: 12px;
`;
const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 20px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

// sidebar
const SideMainMenu = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${colors.font.darkgray};
  margin-bottom: 10px;
  margin-left: 7px;
`;

const SideSubMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 0px;
  border-radius: 7px;
  margin-bottom: 1px;

  svg {
    margin-left: 11px;
  }

  &:hover {
    background-color: #ededed;
    opacity: 0.8;
    p {
      font-weight: 600;
    }
  }
`;

const SideMenuText = styled.p`
  margin-left: 8px;
  font-size: 17px;
  font-weight: 500;
  color: ${colors.font.darkgray};
`;

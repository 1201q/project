import { useTeam } from "@/utils/context/TeamContext";
import { motion } from "framer-motion";
import styled from "styled-components";
import * as colors from "../../../styles/colors";
import X from "../../../assets/x.svg";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useState } from "react";
import { updateTeamData } from "@/utils/firebase/setting";

export default function TeamSettingModal() {
  const {
    isJoinedTeamListModal,
    setJoinedTeamList,
    setIsJoinedTeamListModal,
    selectedTeamData,
  } = useTeam();
  const user = useAuth();
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
    }
  };

  const renderContents = () => {
    if (menuSelect === "teamName") {
      return (
        <>
          <MenuHeader>팀 이름 변경</MenuHeader>
          <MenuTopDescription>팀 이름을 변경할 수 있습니다.</MenuTopDescription>
          <Input
            type="text"
            name="title"
            placeholder={!teamName ? "팀 이름을 입력해주세요." : teamName}
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
          />
          <SaveBtn
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onUpdateTeamData("teamName", teamName);
            }}
          >
            저장
          </SaveBtn>
        </>
      );
    } else if (menuSelect === "teamDescription") {
      return (
        <>
          <MenuHeader>팀 소개 변경</MenuHeader>
          <MenuTopDescription>
            팀 소개 문장을 변경할 수 있습니다.
          </MenuTopDescription>
          <InputArea
            placeholder={
              !teamDescription ? "팀 이름을 입력해주세요." : teamDescription
            }
            value={teamDescription}
            onChange={(e) => {
              setTeamDescription(e.target.value);
            }}
          />
          <SaveBtn
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onUpdateTeamData("teamDescription", teamDescription);
            }}
          >
            저장
          </SaveBtn>
        </>
      );
    } else if (menuSelect === "teamDelete") {
      return (
        <>
          <p
            style={{
              color: "#d32f2f",
              fontWeight: 700,
              fontSize: "25px",
              marginTop: "10px",
            }}
          >
            팀을 삭제합니다. 팀을 삭제하게 되면 복구할 수 없습니다. 신중히
            결정해 주세요.
          </p>
          <SaveBtn
            styledbg={"#D32F2F"}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
          >
            삭제
          </SaveBtn>
        </>
      );
    } else if (menuSelect === "teamHandOver") {
    } else if (menuSelect === "memberInvite") {
      return (
        <>
          <MenuInnerBigText>{selectedTeamData.teamCode}</MenuInnerBigText>
          <MenuInnerSmallText>
            위의 6자리 팀 코드를 팀원에게 알려주세요
          </MenuInnerSmallText>
        </>
      );
    } else if (menuSelect === "memberList") {
    }
  };

  const onUpdateTeamData = async (field, value) => {
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
      setIsJoinedTeamListModal(false);
    } else {
      console.log(update);
    }
  };

  return (
    <Container>
      <ModalContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeaderContainer>
          <CloseButton onClick={() => setIsJoinedTeamListModal(false)}>
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
                  setMenuSelect("memberInvite");
                }}
              >
                <SideMenuText>팀원 초대</SideMenuText>
              </SideSubMenu>
              <SideSubMenu
                onClick={() => {
                  setMenuSelect("memberList");
                }}
              >
                <SideMenuText>팀원 관리</SideMenuText>
              </SideSubMenu>
            </SidebarMenuContainer>
          </SidebarContainer>
          {/* 컨텐츠 select */}
          {/* 팀 이름 변경 */}
          <ContentsContainer>{renderContents()}</ContentsContainer>
          {/* 팀 이름 변경 */}
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
  width: 900px;
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
  padding: 20px;
`;

const ContentsContainer = styled.div`
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 200px;
  min-width: 200px;
  margin-right: 25px;
  height: 100%;
  padding-top: 10px;
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

// contents
const MenuHeader = styled.div`
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${colors.border.deepgray};
  font-size: 20px;

  color: ${colors.font.darkgray};
`;

const MenuTopDescription = styled.p`
  margin-bottom: 15px;
  font-size: 17px;
`;

const MenuInnerBigText = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 80px;
  margin-top: 80px;
  margin-bottom: 30px;
  margin-right: 30px;
`;

const MenuInnerSmallText = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 300;
  font-size: 20px;
  margin-right: 30px;
`;

// input
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  outline: none;
  font-size: 15px;
  background-color: ${colors.background.gray};
  border: 1px solid ${colors.background.gray};
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border-radius: 7px;
  outline: none;
  font-size: 15px;
  background-color: ${colors.background.gray};
  border: 1px solid ${colors.background.gray};
  resize: none;
`;

const SaveBtn = styled(motion.button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: fit-content;

  background-color: ${(props) =>
    props.styledbg ? props.styledbg : colors.calendar.mint};
  color: white;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  font-size: 15px;
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

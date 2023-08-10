import { useTeam } from "@/utils/context/TeamContext";
import { motion } from "framer-motion";
import styled from "styled-components";
import * as colors from "../../../styles/colors";
import X from "../../../assets/x.svg";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function TeamSettingModal() {
  const {
    isJoinedTeamListModal,
    setJoinedTeamList,
    setIsJoinedTeamListModal,
    selectedTeamData,
  } = useTeam();
  const user = useAuth();
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
        <ContentsContainer>
          <Menu>
            <MenuHeader>팀 멤버 관리</MenuHeader>
            <MenuLink>멤버 목록 보기</MenuLink>
          </Menu>
          <Menu>
            <MenuHeader>팀 이름 변경</MenuHeader>
            <div style={{ display: "flex" }}>
              <TitleInput
                type="text"
                name="title"
                placeholder="이름을 입력하세요"
              />
              <SaveBtn>저장하기</SaveBtn>
            </div>
          </Menu>
          <Menu>
            <MenuHeader>팀 소개 변경</MenuHeader>
            <MenuLink>팀 소개 변경하기</MenuLink>
          </Menu>
          <Menu>
            <MenuHeader>초대하기</MenuHeader> <MenuLink>팀 초대하기</MenuLink>
          </Menu>
          <Menu>
            <MenuHeader>관리자 권한 관리</MenuHeader>
          </Menu>
          <Menu>
            <MenuHeader>팀 삭제</MenuHeader>
          </Menu>
          <Menu>
            <MenuHeader>소유자 권한 양도</MenuHeader>
          </Menu>
          <Menu>
            <MenuHeader>소유자 권한 양도</MenuHeader>
          </Menu>
        </ContentsContainer>
      </ModalContainer>
    </Container>
  );
}

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
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 1200px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;
  background-color: red;
  z-index: 900;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContentsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  margin-top: 30px;
  width: 100%;
  height: 460px;
  overflow-y: auto;
  padding-right: 20px;
`;

// header
const HeaderText = styled.p`
  /* margin-bottom: 30px; */
  font-size: 30px;
  font-weight: 800;
`;
const TeamHeaderText = styled.p`
  /* margin-bottom: 30px; */

  font-size: 18px;
  font-weight: 700;
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
  margin-top: 10px;
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

// 메뉴
const Menu = styled.div`
  min-height: 150px;
`;

const MenuHeader = styled.div`
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${colors.border.deepgray};
  font-size: 20px;

  color: ${colors.font.darkgray};
`;

const MenuLink = styled.a`
  font-size: 20px;
  color: ${colors.calendar.mint};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

// input
const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  outline: none;
  font-size: 15px;
  background-color: ${colors.background.gray};
  border: 1px solid ${colors.background.gray};
`;

const SaveBtn = styled.button`
  width: 100px;
  background-color: ${colors.calendar.mint};
  border: none;
  border-radius: 7px;
  margin-left: 20px;
  font-size: 15px;
  color: white;
  font-weight: 700;
`;

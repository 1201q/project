import styled from "styled-components";
import { motion } from "framer-motion";
import * as colors from "../styles/colors";
import { useRouter } from "next/router";
import { logout } from "@/utils/firebase/auth";
import { useRef } from "react";

// svg
import User from "../assets/user-no-circle.svg";
import UserSetting from "../assets/user.svg";
import Users from "../assets/users-alt.svg";
import Lock from "../assets/lock.svg";
import PlusLogo from "../assets/plus-small2.svg";

export default function UserModal() {
  const router = useRouter();

  return (
    <ModalContainer
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {/* 프로필 */}
      <ProfileContainer>
        <User width={150} height={150} fill={"#7F7F7F"} />

        <DisplayName>황준서</DisplayName>
      </ProfileContainer>
      {/* 팀 목록 */}
      <MainContentsContainer>
        <Team>
          <TeamProfileImg>팀</TeamProfileImg>
          <TeamProfileText>더조은요양원</TeamProfileText>
        </Team>
        <Team>
          <TeamProfileImg>팀</TeamProfileImg>
          <TeamProfileText>더조은요양원</TeamProfileText>
        </Team>
        <Team>
          <TeamProfileImg>팀</TeamProfileImg>
          <TeamProfileText>더조은요양원</TeamProfileText>
        </Team>
        <Team>
          <TeamProfileImg
            styledbg={"white"}
            styledborder={`2px solid ${colors.border.deepgray}`}
          >
            <PlusLogo
              width={15}
              height={15}
              fill={colors.font.gray}
              style={{ marginLeft: "1px" }}
            />
          </TeamProfileImg>
          <TeamProfileText style={{ color: colors.font.gray }}>
            새로운 팀에 참가하기
          </TeamProfileText>
        </Team>
      </MainContentsContainer>
      {/* 바텀 설정 */}
      <SettingContainer>
        <EmailContainer>
          <EmailText>1201q@naver.com</EmailText>
        </EmailContainer>
        <Menu>
          <Users
            width={13}
            height={13}
            fill={colors.font.darkgray}
            style={{ marginTop: "2px" }}
          />
          <MenuText>팀 관리</MenuText>
        </Menu>
        <Menu>
          <UserSetting
            width={13}
            height={13}
            fill={colors.font.darkgray}
            style={{ marginTop: "2px" }}
          />
          <MenuText>계정 설정</MenuText>
        </Menu>
        <LogoutContainer>
          <Menu
            onClick={() => {
              const confirm = window.confirm("로그아웃 하시겠어요?");

              if (confirm) {
                logout();
                router.replace("/auth/login");
              }
            }}
          >
            <Lock width={13} height={13} />
            <MenuText>로그아웃</MenuText>
          </Menu>
        </LogoutContainer>
      </SettingContainer>
    </ModalContainer>
  );
}

// container
const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 5px;
  left: 232px;
  width: 260px;
  height: 100%;
  max-height: 480px;
  background-color: white;
  z-index: 101;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 5px rgba(0, 0, 0, 0.05);
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 170px;
  min-height: 170px;
  background-color: rgb(109, 109, 109);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const MainContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 13px 10px;
  height: 100%;
  overflow-y: scroll;
`;

const SettingContainer = styled.div`
  padding: 10px;
  background-color: ${colors.background.gray};
  border-top: 1px solid ${colors.border.deepgray};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const LogoutContainer = styled.div`
  border-top: 1px solid ${colors.border.deepgray};
  padding-top: 10px;
  margin-top: 10px;
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 5px 6px;
`;

// name
const DisplayName = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  color: white;
  bottom: 20px;
  left: 20px;
`;

// menu
const Menu = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 0px;
  border-radius: 7px;

  &:hover {
    background-color: #ededed;
    opacity: 0.8;
    p {
      font-weight: 600;
    }
  }

  svg {
    margin-left: 7px;
  }
`;

const MenuText = styled.p`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.font.darkgray};
`;

const EmailText = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${colors.font.darkgray};
`;

// team
const Team = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 7px;
  border-radius: 7px;
  margin-bottom: 5px;
  svg {
    margin-left: 7px;
  }

  &:hover {
    background-color: #ededed;
    opacity: 0.8;
  }
`;

const TeamProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.styledbg ? props.styledbg : colors.others.orange};
  border: ${(props) => (props.styledborder ? props.styledborder : "none")};
  color: white;
  font-size: 13px;
  margin-right: 10px;
`;

const TeamProfileText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.font.black};
`;

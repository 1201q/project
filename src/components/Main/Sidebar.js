import styled from "styled-components";
import Image from "next/image";
import * as colors from "../../styles/colors";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// svg
import Search from "../../assets/search.svg";
import Home from "../../assets/home.svg";
import Check from "../../assets/check-circle.svg";
import List from "../../assets/list.svg";
import AngleRight from "../../assets/angle-small-right.svg";
import Lock from "../../assets/lock.svg";
import PlusLogo from "../../assets/plus-small.svg";
import UserThumnail from "../../assets/user-no-circle.svg";

import { logout } from "@/utils/firebase/auth";
import { useRouter } from "next/router";
import UserModal from "./UserModal";
import { useTeam } from "@/utils/context/TeamContext";

const Sidebar = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChattingOpen, setIsChattingOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const { selectedTeamMembersData, isTeamDataLoading } = useTeam();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <Container>
      <Wrapper>
        {/* 프로필 */}
        <ProfileContainer>
          <ProfileWrapper
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <ProfileImage>나</ProfileImage>
            <ProfileName>
              {userData ? userData.user.displayName : "익명"}
            </ProfileName>
          </ProfileWrapper>
        </ProfileContainer>
        {/* 검색 */}
        <InputContainer>
          <Search width={13} height={13} />
          <MenuInput placeholder="Search"></MenuInput>
        </InputContainer>
        {/* 메뉴 */}
        <TopMenuContainer>
          <Menu onClick={() => router.push("/")}>
            <Home width={18} height={18} />
            <MenuText>홈</MenuText>
          </Menu>
          <Menu>
            <List width={18} height={18} />
            <MenuText>전체 일정</MenuText>
          </Menu>
          <Menu>
            <Check width={18} height={18} />
            <MenuText>오늘 할 일</MenuText>
          </Menu>
          <Menu>
            <Search width={18} height={18} />
            <MenuText>탐색</MenuText>
          </Menu>
        </TopMenuContainer>

        <MenuContainer>
          <MenuController
            onClick={() => {
              setIsChattingOpen((prev) => !prev);
            }}
          >
            <p>채팅</p>
            <PlusLogo width={17} height={17} fill={colors.font.gray} />
          </MenuController>
          {isChattingOpen && !isTeamDataLoading && (
            <UserContainer>
              {selectedTeamMembersData.map((user) => (
                <User
                  key={user.uid}
                  onClick={() => {
                    console.log(user);
                  }}
                >
                  <UserProfileImage>
                    <UserThumnail
                      width={17}
                      height={17}
                      fill={"white"}
                      style={{ marginTop: "7px" }}
                    />
                  </UserProfileImage>
                  <UserNameText>{user.name}</UserNameText>
                </User>
              ))}
            </UserContainer>
          )}
        </MenuContainer>
        {/* 모달 */}
        {isModalOpen && (
          <div ref={modalRef}>
            <UserModal />
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  width: 240px;
  min-width: 240px;
  min-height: 100vh;
  height: 100%;
  border-right: 0.5px solid ${colors.border.deepgray};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 0px 0px;
`;

const ProfileWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
    opacity: 0.95;
  }
`;

// 컨테이너
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.border.gray};
  padding: 0px 10px;
  height: 61px;
`;
const TopMenuContainer = styled.div`
  padding: 8px;
  border-bottom: 2px solid ${colors.border.deepgray};
`;

const UserContainer = styled.div`
  padding: 8px;
  background-color: ${colors.background.gray};
`;

const MenuContainer = styled.div``;
const InputContainer = styled.div`
  padding: 8px;

  svg {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
  }
`;

// 프로필

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 7px;
  background-color: ${colors.others.orange};
  color: white;
  font-weight: 700;
  margin-right: 15px;
`;
const ProfileName = styled.p`
  color: ${colors.font.black};
  font-weight: 800;
  font-size: 19px;
`;

// 메뉴

const Menu = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0px;
  border-radius: 7px;
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

const MenuController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 10px 10px 17px;
  color: ${colors.font.darkgray};
  background-color: white;
  border-bottom: 2px solid ${colors.border.deepgray};
  cursor: pointer;
`;
const MenuText = styled.p`
  margin-left: 17px;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.font.darkgray};
`;
const MenuInput = styled.input`
  width: 100%;
  height: 35px;
  background-color: ${colors.background.gray};
  border: 1px solid ${colors.border.gray};
  border-radius: 7px;
  outline: none;
  color: ${colors.font.black};
  font-weight: 500;
  padding-left: 30px;
  padding-right: 10px;
`;

// 팀
const User = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 7px;

  &:hover {
    background-color: #ededed;
    opacity: 0.8;
  }
`;

const UserProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  background-color: ${colors.calendar.mint};
  border-radius: 50%;
  overflow: hidden;
`;

const UserNameText = styled.p`
  margin-left: 15px;
  font-size: 15px;
  font-weight: 400;
  color: ${colors.font.darkgray};
`;

export default Sidebar;

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
import { useMain } from "@/utils/context/MainContext";

const Sidebar = ({ userData }) => {
  const {
    isUserModalOpen,
    setIsUserModalOpen,
    isSidebarChattingOpen,
    setIsSidebarChattingOpen,
    isSidebarProjectOpen,
    setIsSidebarProjectOpen,
  } = useMain();

  const modalRef = useRef(null);
  const topRef = useRef(null);
  const router = useRouter();
  const { selectedTeamMembersData, isTeamDataLoading } = useTeam();
  const { currentTab, setCurrentTab } = useMain();
  const [topMenuHeight, setTopMenuHeight] = useState(0);

  useEffect(() => {
    if (topRef.current) {
      const height = topRef.current.getBoundingClientRect().height;
      setTopMenuHeight(height);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isUserModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsUserModalOpen(false);
      }
    };

    if (isUserModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isUserModalOpen]);

  return (
    <Container>
      <Wrapper>
        <Top ref={topRef}>
          {/* 프로필 */}
          <ProfileContainer>
            <ProfileWrapper
              onClick={() => {
                setIsUserModalOpen(true);
              }}
            >
              <ProfileImage>나</ProfileImage>
              <ProfileName>
                {userData.user ? userData.user.displayName : ""}
              </ProfileName>
            </ProfileWrapper>
          </ProfileContainer>
        </Top>
        <Bottom styledMarginTop={`${topMenuHeight}px`}>
          {/* 검색 */}
          <InputContainer>
            <Search width={13} height={13} />
            <MenuInput placeholder="Search"></MenuInput>
          </InputContainer>
          {/* 메뉴 */}
          <TopMenuContainer>
            <Menu
              onClick={() => {
                setCurrentTab("main");
              }}
            >
              <Home width={18} height={18} />
              <MenuText>홈</MenuText>
            </Menu>
            <Menu
              onClick={() => {
                setCurrentTab("calendar");
              }}
            >
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
                setIsSidebarChattingOpen((prev) => !prev);
              }}
            >
              <p>멤버</p>
              <PlusLogo width={17} height={17} fill={colors.font.gray} />
            </MenuController>
            {isSidebarChattingOpen && !isTeamDataLoading && (
              <UserContainer
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{ duration: 0.2 }}
              >
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
          <MenuContainer>
            <MenuController
              onClick={() => {
                setIsSidebarProjectOpen((prev) => !prev);
              }}
            >
              <p>프로젝트</p>
              <PlusLogo width={17} height={17} fill={colors.font.gray} />
            </MenuController>
            {isSidebarProjectOpen && !isTeamDataLoading && (
              <UserContainer
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{ duration: 0.2 }}
              >
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
        </Bottom>
        {/* 모달 */}
        {isUserModalOpen && (
          <div ref={modalRef}>
            <UserModal />
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 240px;
  min-width: 240px;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  background-color: white;
  overflow-y: scroll;
  border-right: 0.5px solid ${colors.border.deepgray};

  ::-webkit-scrollbar {
    display: none;
  }

  /* Optional: Style the scrollbar track and thumb */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
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

const Top = styled.div`
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  position: fixed;
  background-color: white;
  border-right: 0.5px solid ${colors.border.deepgray};
  z-index: 100;
`;

const Bottom = styled.div`
  margin-top: ${(props) =>
    props.styledMarginTop ? props.styledMarginTop : "61px"};
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
  border-bottom: 1.5px solid ${colors.border.deepgray};
`;

const UserContainer = styled(motion.div)`
  padding: 8px;
  background-color: ${colors.background.gray};
  z-index: 99;
`;

const MenuContainer = styled.div`
  border-bottom: 1.5px solid ${colors.border.deepgray};
`;
const InputContainer = styled.div`
  position: relative;
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
  /* border-top: 2px solid ${colors.border.deepgray}; */
  /* border-bottom: 2px solid ${colors.border.deepgray}; */
  cursor: pointer;
  z-index: 100;
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

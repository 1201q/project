import styled from "styled-components";
import Image from "next/image";
import * as colors from "../../../styles/colors";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// svg
import Search from "../../../assets/search.svg";
import Home from "../../../assets/home.svg";
import Check from "../../../assets/check-circle.svg";
import List from "../../../assets/list.svg";
import PlusLogo from "../../../assets/plus-small.svg";
import UserThumnail from "../../../assets/user-no-circle.svg";
import Tags from "../../../assets/tags.svg";

import { useRouter } from "next/router";
import { useTeam } from "@/utils/context/TeamContext";
import { useMain } from "@/utils/context/MainContext";
import { useProject } from "@/utils/context/ProjectContext";

export default function SidebarBottom() {
  const {
    isSidebarChattingOpen,
    setIsSidebarChattingOpen,
    isSidebarProjectOpen,
    setIsSidebarProjectOpen,
  } = useMain();

  const { selectedTeamMembersData, isTeamDataLoading } = useTeam();
  const { setCurrentTab } = useMain();
  const { projectListData } = useProject();
  const router = useRouter();

  return (
    <Container>
      {/* 검색 */}
      <InputContainer>
        <Search width={13} height={13} fill="#7D7E87" />
        <MenuInput placeholder="Search"></MenuInput>
      </InputContainer>
      {/* 메뉴 */}
      <TopMenuContainer>
        <Menu
          onClick={() => {
            setCurrentTab("dashboard");
            router.replace("/");
          }}
        >
          <Home width={18} height={18} />
          <MenuText>대시보드</MenuText>
        </Menu>
        <Menu
          onClick={() => {
            setCurrentTab("calendar");
            router.push({ query: { page: "calendar" } });
          }}
        >
          <List width={18} height={18} />
          <MenuText>전체 일정</MenuText>
        </Menu>
        <Menu
          onClick={() => {
            setCurrentTab("todo");
            router.push({ query: { page: "todo" } });
          }}
        >
          <Check width={18} height={18} />
          <MenuText>할 일</MenuText>
        </Menu>
        <Menu
          onClick={() => {
            setCurrentTab("prjectExplore");
            router.push({ query: { page: "project_explore" } });
          }}
        >
          <Search width={18} height={18} fill="#f7f7f7" />
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
            initial={{ y: 0, opacity: 0 }}
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
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {projectListData.map((project) => (
              <Project
                key={project.projectUID}
                onClick={() => {
                  console.log(project);
                }}
              >
                <ProjectColor styledbg={colors.calendar[project.color]}>
                  <Tags
                    width={14}
                    height={14}
                    fill={colors.background.midnight}
                  />
                </ProjectColor>
                <UserNameText>{project.projectName}</UserNameText>
              </Project>
            ))}
          </UserContainer>
        )}
      </MenuContainer>
    </Container>
  );
} // 컨테이너
const Container = styled.div`
  margin-top: 61px;
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

const TopMenuContainer = styled.div`
  padding: 8px;
  border-bottom: 1.5px solid ${colors.border.darkgray};
`;

const MenuContainer = styled.div`
  border-bottom: 1.5px solid ${colors.border.darkgray};
`;

const UserContainer = styled(motion.div)`
  padding: 8px;
  background-color: #343541;
  z-index: 99;
`;

// 메뉴
const Menu = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;

  cursor: pointer;
  padding: 10px 0px;
  border-radius: 7px;
  svg {
    margin-left: 10px;
  }

  &:hover {
    background-color: #343541;

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
  color: ${colors.font.white};
  background-color: ${colors.background.midnight};

  cursor: pointer;
  z-index: 100;
`;
const MenuText = styled.p`
  margin-left: 17px;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.font.white};
`;
const MenuInput = styled.input`
  width: 100%;
  height: 35px;
  background-color: #343541;
  border: 1px solid ${colors.border.darkgray};
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
    opacity: 0.7;
  }
`;

const Project = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 7px;

  &:hover {
    opacity: 0.7;
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

const ProjectColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  background-color: ${(props) => props.styledbg};
  border-radius: 20%;
  overflow: hidden;
`;

const UserNameText = styled.p`
  margin-left: 15px;
  font-size: 15px;
  font-weight: 400;
  color: ${colors.font.white};
`;

const ProjectNameText = styled.p`
  /* margin-left: 15px; */
  font-size: 15px;
  font-weight: 400;
  color: ${colors.font.white};
`;

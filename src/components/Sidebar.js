import styled from "styled-components";
import Image from "next/image";
import * as colors from "../styles/colors";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// svg
import Search from "../assets/search.svg";
import Home from "../assets/home.svg";
import Check from "../assets/check-circle.svg";
import List from "../assets/list.svg";
import AngleRight from "../assets/angle-small-right.svg";
import Lock from "../assets/lock.svg";
import PlusLogo from "../assets/plus-small.svg";
import { logout } from "@/utils/firebase/auth";
import { useRouter } from "next/router";
import UserModal from "./UserModal";

const Sidebar = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

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
        <MenuContainer>
          <Menu onClick={() => router.push("/")}>
            <Home width={14} height={14} />
            <MenuText>홈</MenuText>
          </Menu>
          <Menu onClick={() => router.push("/team")}>
            <Search width={14} height={14} />
            <MenuText>탐색</MenuText>
          </Menu>
          <Menu>
            <Check width={14} height={14} />
            <MenuText>오늘 할 일</MenuText>
          </Menu>
          <Menu>
            <List width={14} height={14} />
            <MenuText>전체 일정</MenuText>
          </Menu>
        </MenuContainer>
        {/* 팀 목록 */}
        <TeamContainer>
          <MenuHeader>나의 팀</MenuHeader>
          <Team>
            <Menu>
              <AngleRight
                width={14}
                height={14}
                style={{ marginLeft: "7px" }}
                fill={"#7D7E87"}
              />
              <MenuText>홈</MenuText>
            </Menu>
            <ProjectContainer>
              <VerticalLine></VerticalLine>
              <Project>
                <Menu>
                  <MenuText>프로젝트</MenuText>
                </Menu>
                <Menu>
                  <MenuText>프로젝트</MenuText>
                </Menu>
                <Menu style={{ marginBottom: 0 }}>
                  <MenuText>프로젝트</MenuText>
                </Menu>
              </Project>
            </ProjectContainer>
          </Team>
        </TeamContainer>
        {/* 새로운 팀 가입 */}
        <TeamContainer>
          <Menu whileTap={{ scale: 0.96 }}>
            <PlusLogo width={17} height={17} fill={"#7D7E87"} />
            <MenuText>새로운 팀 가입하기</MenuText>
          </Menu>
        </TeamContainer>
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
  background-color: ${colors.background.gray};
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
  padding: 5px;
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
const MenuContainer = styled.div`
  padding: 8px;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  padding: 8px;

  svg {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
  }
`;

const TeamContainer = styled.div`
  border-top: 1px solid ${colors.border.gray};
  padding: 8px;
  margin-bottom: 20px;
`;

const ProjectContainer = styled.div`
  display: flex;
  height: 100%;
`;

// 프로필

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
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

const LogOutBtn = styled.button`
  border: none;
  background: none;
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

const MenuText = styled.p`
  margin-left: 8px;
  font-size: 17px;
  font-weight: 500;
  color: ${colors.font.darkgray};
`;

const MenuInput = styled.input`
  width: 100%;
  height: 35px;
  background-color: white;
  border: 2px solid ${colors.border.deepgray};
  border-radius: 7px;
  outline: none;
  color: ${colors.font.black};
  font-weight: 500;
  padding-left: 30px;
  padding-right: 10px;
`;

const MenuHeader = styled.p`
  color: ${colors.font.darkgray};
  margin-bottom: 5px;
  padding: 10px;
`;

// 프로젝트
const Team = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const VerticalLine = styled.div`
  &::before {
    content: "";
    width: 1px;
    background-color: ${colors.border.deepgray};
    height: 90%;
    display: block;
    margin-left: 12px;
    margin-right: 12px;
  }
`;

export default Sidebar;

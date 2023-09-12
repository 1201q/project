import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import NewProjectModal from "./NewProjectModal";
import { useProject } from "@/utils/context/ProjectContext";
import Project from "./Project";

import A from "../../../assets/a.svg";
import User from "../../../assets/user.svg";
import Users from "../../../assets/users-alt.svg";
import Info from "../../../assets/info.svg";
import Setting from "../../../assets/settings (3).svg";
import { useMain } from "@/utils/context/MainContext";

export default function ProjectExplore() {
  const {
    isNewProjectModalOpen,
    setIsNewProjectModalOpen,
    projectListData,
    joinedProjectList,
  } = useProject();

  const { projectPageMode, setProjectPageMode } = useMain();

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeaderContainer>
        <HeaderText>
          {projectPageMode === "all" && "모든 프로젝트"}
          {projectPageMode === "myproject" && "나의 프로젝트"}
        </HeaderText>
        <ControlBtn
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsNewProjectModalOpen(true);
          }}
        >
          새로운 프로젝트 생성{" "}
        </ControlBtn>
        {projectPageMode === "all" && (
          <ControlBtn
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                setProjectPageMode(() => {
                  localStorage.setItem("projectPageMode", "myproject");
                  return "myproject";
                });
              }
            }}
          >
            내가 속한 프로젝트만 보기
          </ControlBtn>
        )}
        {projectPageMode === "myproject" && (
          <ControlBtn
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (typeof window !== "undefined") {
                setProjectPageMode(() => {
                  localStorage.setItem("projectPageMode", "all");
                  return "all";
                });
              }
            }}
          >
            전체 프로젝트 보기
          </ControlBtn>
        )}
      </HeaderContainer>
      <Contents>
        <ListHeaderContainer>
          <Box maxwidth={"70px"}></Box>
          <Box maxwidth={"400px"}>
            <A width={13} height={13} fill={colors.font.gray} />
            프로젝트 이름
          </Box>
          <Box maxwidth={"100px"}>
            <User width={16} height={16} fill={colors.font.gray} />
            소유자
          </Box>
          <Box maxwidth={""}>
            <Info width={16} height={16} fill={colors.font.gray} />
            프로젝트 소개
          </Box>{" "}
          <Box maxwidth={"90px"}>
            <Users width={13} height={13} fill={colors.font.gray} />
            인원
          </Box>
        </ListHeaderContainer>

        {projectPageMode === "all" &&
          projectListData &&
          projectListData.map((item, index) => (
            <Project
              idx={index + 1}
              key={`my-${item.projectUID}`}
              color={item.color}
              title={item.projectName}
              ownerName={item.projectOwnerKRname}
              description={item.projectDescription}
              members={item.projectMembers}
            />
          ))}

        {projectPageMode === "myproject" &&
          joinedProjectList &&
          joinedProjectList.map((item, index) => (
            <Project
              idx={index + 1}
              key={`my-${item.projectUID}`}
              color={item.color}
              title={item.projectName}
              ownerName={item.projectOwnerKRname}
              description={item.projectDescription}
              members={item.projectMembers}
            />
          ))}
      </Contents>
      {isNewProjectModalOpen && <NewProjectModal />}
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  max-height: 99vh;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid ${colors.border.gray};
  height: 61px;
`;

const HeaderText = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
  margin-right: 20px;
`;

const Contents = styled.div`
  /* margin-top: 5px; */
  width: 100%;
  max-height: 90vh;
  overflow-y: scroll;
  /* padding: 5px 10px 30px 10px; */
  background-color: white;
`;

const ControlBtn = styled(motion.button)`
  font-weight: 800;
  height: 30px;
  background: none;
  border: 2px solid ${colors.border.deepgray};
  color: ${colors.font.black};
  border-radius: 7px;
  cursor: pointer;
  padding: 0px 13px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.05);
  margin-left: 10px;
`;

const MenuHeaderText = styled.p`
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.font.black};

  margin-left: 15px;
`;

const List = styled.div`
  margin-bottom: 50px;
`;

const ListHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${colors.background.gray};
  /* border-top: 1px solid ${colors.border.gray}; */
  border-bottom: 1px solid ${colors.border.gray};

  svg {
    margin-right: 8px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxwidth};
  color: ${colors.font.darkgray};
  font-size: 15px;
  font-weight: 700;
  padding: 10px 10px;
`;

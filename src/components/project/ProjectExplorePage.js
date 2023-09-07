import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import NewProjectModal from "./NewProjectModal";
import { useProject } from "@/utils/context/ProjectContext";
import Project from "./Project";

export default function ProjectExplore() {
  const {
    isNewProjectModalOpen,
    setIsNewProjectModalOpen,
    projectListData,
    joinedProjectList,
  } = useProject();
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeaderContainer>
        <HeaderText>프로젝트</HeaderText>
        <ControlBtn
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsNewProjectModalOpen(true);
          }}
        >
          프로젝트 생성{" "}
        </ControlBtn>
      </HeaderContainer>
      <Contents>
        <MenuHeaderText>내 프로젝트</MenuHeaderText>
        <List>
          {joinedProjectList &&
            joinedProjectList.map((item) => (
              <Project
                key={`my-${item.projectUID}`}
                color={item.color}
                title={item.projectName}
              />
            ))}
        </List>
        <MenuHeaderText>프로젝트 탐색</MenuHeaderText>
        <List>
          {projectListData &&
            projectListData.map((item) => (
              <Project
                key={`${item.projectUID}`}
                color={item.color}
                title={item.projectName}
              />
            ))}
        </List>
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
  /* cursor: pointer; */
`;

const Contents = styled.div`
  margin-top: 5px;
  width: 100%;
  max-height: 90vh;
  overflow-y: scroll;
  padding: 5px 10px 30px 10px;
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
  margin-left: 30px;
`;

const MenuHeaderText = styled.p`
  width: 150px;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.font.black};
  margin-bottom: 10px;
  margin-left: 15px;
  margin-top: 10px;
`;

const List = styled.div`
  margin-bottom: 50px;
`;

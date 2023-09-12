import styled from "styled-components";
import { color, motion } from "framer-motion";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import * as colors from "../../styles/colors";

import ProjectCard from "./ProjectCard";
import Welcome from "./Welcome";
import Schedule from "./Schedule";
import { useState, useEffect, useRef } from "react";
import { useProject } from "@/utils/context/ProjectContext";
import { Ring } from "@uiball/loaders";

dayjs.extend(isSameOrBefore);

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function Dashboard() {
  const { projectListData, joinedProjectList, isProjectDataLoading } =
    useProject();
  const projectContainerRef = useRef();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  const onWheel = (e) => {
    if (projectContainerRef.current) {
      projectContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const onMouseMove = (e) => {
    setIsScrollbarVisible(true);
  };

  const onMouseLeave = (e) => {
    setIsScrollbarVisible(false);
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* 상단 welcome */}
      <TopInfoContainer>
        <Welcome />
      </TopInfoContainer>
      <MenuHeaderText>프로젝트</MenuHeaderText>
      {/* 프로젝트 */}
      <ProjectContainer
        ref={projectContainerRef}
        onWheel={onWheel}
        onMouseEnter={onMouseMove}
        onMouseLeave={onMouseLeave}
        scrollbarVisible={isScrollbarVisible}
      >
        {isProjectDataLoading ? (
          <LoadingContainer>
            <Ring />
          </LoadingContainer>
        ) : (
          <>
            {joinedProjectList &&
              joinedProjectList.map((item) => (
                <ProjectCard
                  key={item.projectUID}
                  title={item.projectName}
                  color={item.color}
                  members={item.projectMembers}
                  projectuid={item.projectUID}
                />
              ))}
          </>
        )}
      </ProjectContainer>
      <Div>
        <div style={{ width: "60%", minWidth: "814px" }}>
          <Schedule />
        </div>
        <div style={{ width: "40%", minWidth: "407px" }}>
          <ContentsContainer>
            <ContainerHeader>메모장</ContainerHeader>
          </ContentsContainer>
        </div>
      </Div>
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  max-height: 100vh;
  padding: 15px 25px;
  overflow-y: scroll;
  background-color: ${colors.background.gray2};
`;

const Div = styled.div`
  display: flex;
  gap: 25px;
`;

const TopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
`;

const ProjectContainer = styled.div`
  width: 100%;
  min-height: 160px;
  margin-bottom: 25px;
  display: flex;

  grid-gap: 20px;
  overflow-x: scroll;
  padding-bottom: 10px;
  transition: all 0.5s;

  ::-webkit-scrollbar {
    display: ${(props) => (props.scrollbarVisible ? "" : "none")};
  }
`;

const ContentsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  padding: 0px;

  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.1) 0px 1px 1px -1px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const ContainerHeader = styled.div`
  width: 100%;
  padding: 20px 20px 15px 20px;
  position: sticky;
  font-size: 20px;
  font-weight: 600;
  top: 0px;
  left: 0px;
`;
const MenuHeaderText = styled.p`
  width: 150px;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.font.black};
  margin-bottom: 10px;
  /* margin-left: 15px; */
  margin-top: 10px;
`;

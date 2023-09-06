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
import { useState, useEffect } from "react";

dayjs.extend(isSameOrBefore);

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function Dashboard() {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* 상단 welcome */}
      <TopInfoContainer>
        <Welcome />
      </TopInfoContainer>
      <MenuHeaderText>프로젝트</MenuHeaderText>
      {/* 프로젝트 */}
      <ProjectContainer>
        <ProjectCard />
        <ProjectCard />
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
  margin-bottom: 35px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const ContentsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  padding: 0px;

  background-color: white;
  border-radius: 10px;
`;

const MenuHeaderText = styled.p`
  width: 150px;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.font.black};
  margin-bottom: 10px;
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

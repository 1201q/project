import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import { useEffect, useState, useRef } from "react";
import { useProject } from "@/utils/context/ProjectContext";

export default function ProjectPageHeader({ menuArr, setTab }) {
  const { selectedProjectData } = useProject();
  const [underbar, setUnderBar] = useState(0);

  const getMenuText = (menu) => {
    if (menu === "work") {
      return "업무";
    } else if (menu === "feed") {
      return "피드";
    } else if (menu === "schedule") {
      return "일정";
    } else if (menu === "gantt") {
      return "간트차트";
    } else if (menu === "setting") {
      return "설정";
    }
  };

  return (
    <Container>
      <InfoContainer>
        <Thumnail color={colors.calendar[selectedProjectData.color]}></Thumnail>
        <FlexDiv>
          <ProjectName>{selectedProjectData.projectName}</ProjectName>
          <Description>{selectedProjectData.projectDescription}</Description>
        </FlexDiv>
      </InfoContainer>
      <MenuContainer>
        <MenuLine>
          <ButtonContainer>
            {menuArr.map((item, idx) => (
              <Menu
                onClick={() => {
                  setTab(item);
                  setUnderBar(idx);
                }}
              >
                {getMenuText(item)}
              </Menu>
            ))}
          </ButtonContainer>
          <BottomLineContainer x={underbar * 100}></BottomLineContainer>
        </MenuLine>
      </MenuContainer>
    </Container>
  );
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Container = styled.div`
  height: 135px;
  border-bottom: 1px solid ${colors.border.gray};
  padding: 20px 30px;
  background-color: white;
  position: relative;
`;
const InfoContainer = styled.div`
  display: flex;
`;
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40px;
  padding: 0px 30px;
  position: absolute;
  bottom: 4px;
  left: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const BottomLineContainer = styled.div`
  width: 100px;
  border-radius: 10px;
  background-color: ${colors.font.black};
  height: 4px;
  transform: ${(props) => `translateX(${props.x}px)`};
  transition-duration: 0.2s;
`;

// /
const Thumnail = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  margin-right: 20px;
`;
const ProjectName = styled.p`
  font-size: 23px;
  font-weight: 700;
`;
const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.font.gray};
  margin-top: 4px;
  margin-left: 1px;
`;
const MenuLine = styled.div`
  width: 500px;
  height: 100%;
`;
const Menu = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

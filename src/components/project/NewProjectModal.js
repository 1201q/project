import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as colors from "../../styles/colors";

// svg
import X from "../../assets/x.svg";
import Checkbox from "../../assets/checkbox.svg";
import Calendar from "../../assets/calendar.svg";
import Ex from "../../assets/cross-small.svg";

import A from "../../assets/a.svg";
// 함수, context
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";

// datepicker

import { addSchedule } from "@/utils/firebase/calendar";
import { useTeam } from "@/utils/context/TeamContext";
import { addProject } from "@/utils/firebase/project";

export default function NewProjectModal({ setIsNewProjectModalOpen }) {
  const { selectedTeamData, selectedTeamMembersData } = useTeam();
  const user = useAuth();

  const [selectedUserIndexArr, setSelectedUserIndexArr] = useState(
    Array(selectedTeamMembersData.length).fill(false)
  );
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState(false);
  const controls = useAnimationControls();

  const handleCheckbox = (index) => {
    setSelectedUserIndexArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  const onExecute = () => {
    if (projectTitle !== "" && projectDescription !== "") {
      setError(false);

      let correctUserArr = [];

      selectedTeamMembersData
        .filter((user, index) => {
          if (selectedUserIndexArr[index]) {
            return user;
          }
        })
        .map((filteredUser) => {
          correctUserArr.push(filteredUser.uid);
        });

      addNewProject(correctUserArr);
    } else {
      setError(true);
      shakeModal();

      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  const addNewProject = async (userArr) => {
    const data = {
      teamUID: selectedTeamData.teamUID,
      teamDocId: selectedTeamData.docId,
      projectName: projectTitle,
      projectDescription: projectDescription,
      projectUID: uuidv4(),
      createdAt: dayjs().format(""),
      projectOwner: user.user.uid,
      projectOwnerKRname: user.user.displayName,
      projectMembers: [user.user.uid, ...userArr],
    };
    const update = await addProject(
      "project",
      selectedTeamData.teamUID,
      "data",
      data
    );

    if (!update) {
      setIsNewProjectModalOpen(false);
    } else {
      console.log(update);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;

    if (name === "title") {
      setProjectTitle(value);
    } else if (name === "description") {
      setProjectDescription(value);
    }
  };
  const shakeModal = () => {
    controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.3,
      },
    });
  };

  return (
    <Container>
      <ModalContainer transition={{ duration: 0.1 }} animate={controls}>
        <HeaderText>새로운 프로젝트 생성</HeaderText>
        <ContentsContainer>
          {/* 사이드바 */}
          <SidebarContainer>
            <SmallHeaderText>프로젝트 제목</SmallHeaderText>
            <TitleInput
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              onChange={onChange}
              value={projectTitle}
            />
            <SmallHeaderText>프로젝트 소개</SmallHeaderText>
            <TitleInput
              type="text"
              name="description"
              placeholder="소개 내용을 입력하세요"
              onChange={onChange}
              value={projectDescription}
            />

            <Center>
              {error && (
                <ErrorPopup
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <IconContainer>
                    <Ex width={17} height={17} fill={colors.calendar.red} />
                  </IconContainer>
                  제목과 소개를 입력해주세요.
                </ErrorPopup>
              )}
            </Center>
          </SidebarContainer>
          {/* 멤버 테이블 */}
          <MemberContainer>
            <SmallHeaderText>
              초대할 팀원을 선택하세요. 0명이어도 돼요.
            </SmallHeaderText>
            <MemberListContainer>
              {/* table 헤더 */}
              <MemberListHeader>
                <Box maxwidth={"60px"}>
                  <Checkbox
                    width={12}
                    height={12}
                    fill={colors.font.gray}
                    style={{ marginLeft: "10px" }}
                  />
                </Box>
                <Box>
                  <A
                    width={12}
                    height={12}
                    fill={colors.font.gray}
                    style={{ marginRight: "5px" }}
                  />
                  이름
                </Box>
              </MemberListHeader>
              {/* table */}
              <MemberTable>
                {selectedTeamMembersData.map((item, index) => (
                  <Col key={item.uid}>
                    <Box maxwidth={"50px"}>
                      {user.user.uid !== selectedTeamMembersData[index].uid && (
                        <input
                          type="checkbox"
                          onChange={() => {
                            handleCheckbox(index);
                          }}
                          checked={selectedUserIndexArr[index]}
                        />
                      )}
                    </Box>
                    <Box>{item.name}</Box>
                  </Col>
                ))}
              </MemberTable>
            </MemberListContainer>
          </MemberContainer>
        </ContentsContainer>
        {/* 버튼 컨테이너 */}
        <ButtonContainer>
          <SaveButton
            whileHover={{ backgroundColor: colors.background.gray }}
            whileTap={{ scale: 0.95 }}
            styledbg={"white"}
            styledfont={colors.font.darkgray}
            onClick={() => {
              setIsNewProjectModalOpen((prev) => !prev);
            }}
          >
            취소
          </SaveButton>

          <SaveButton
            styledfont={"white"}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            style={error && { cursor: "not-allowed" }}
            styledbg={error ? "#D32F2F" : "#1A73E8"}
            onClick={() => {
              if (!error) {
                onExecute();
              }
            }}
          >
            생성
          </SaveButton>
        </ButtonContainer>
        <CloseButton
          onClick={() => {
            setIsNewProjectModalOpen((prev) => !prev);
          }}
        >
          <X width={13} height={13} fill={colors.font.darkgray} />
        </CloseButton>
      </ModalContainer>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 800px;
  max-width: 90vw;

  height: 560px;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  /* background-color: gray; */
  height: 100%;
`;

const SidebarContainer = styled.div`
  /* background-color: red; */
  width: 100%;
  /* padding-right: 10px; */
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
  display: flex;
`;

const MemberContainer = styled.div`
  width: 100%;
  height: 370px;
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const MemberListContainer = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 7px;

  /* padding: 10px; */
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

// header
const HeaderText = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 800;
`;

const SmallHeaderText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: ${colors.font.darkgray};
`;

// input
const TitleInput = styled.input`
  width: 100%;
  padding: 10px;

  border-radius: 7px;

  outline: none;
  font-size: 15px;
  background-color: ${(props) =>
    props.errorbg ? "rgba(236, 112, 99, 0.1)" : colors.background.gray};
  border: ${(props) =>
    props.errorborder
      ? "2px solid rgba(236, 112, 99, 0.5)"
      : `1px solid ${colors.background.gray}`};
  margin-bottom: 30px;
`;

// button
const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 20px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

const SaveButton = styled(motion.button)`
  width: fit-content;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  background-color: ${(props) => props.styledbg};
  color: ${(props) => props.styledfont};
  font-size: 15px;
  margin-left: 10px;
`;

const MemberListHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.font.darkgray};
  width: 100%;
  background-color: ${colors.background.gray};
  padding: 10px;
`;

const MemberTable = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  overflow-y: scroll;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxwidth};
  /* padding: 0px 10px; */
`;

const Col = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  border-bottom: 1px solid ${colors.border.deepgray};
  padding-left: 20px;
`;

// popup
const ErrorPopup = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.calendar.red};
  color: white;
  border-radius: 10px;
  border: 2px solid ${colors.border.deepgray};
  width: fit-content;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.05);
  font-weight: 700;
  font-size: 13px;
  padding: 7px 12px;
  margin-top: 5px;
`;

import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import { useEffect, useState, useRef } from "react";
import Play from "../../../assets/play.svg";
import { v4 as uuidv4 } from "uuid";

import ArrowDown from "../../../assets/arrow-small-down.svg";
import ArrowUp from "../../../assets/arrow-small-up.svg";
import Emergency from "../../../assets/light-emergency-on.svg";
import Minus from "../../../assets/minus-small.svg";
import { Ring } from "@uiball/loaders";

import Search from "../../../assets/search.svg";
import AddWorkModal from "./modal/AddWorkModal";
import { useProject } from "@/utils/context/ProjectContext";
import { updateProjectData } from "@/utils/firebase/project";
import { useTeam } from "@/utils/context/TeamContext";
import { useRouter } from "next/router";
import { observeDocumentChanges } from "@/utils/firebase/db";

export default function WorkPage() {
  const router = useRouter();
  const { selectedTeamUid, selectedTeamData } = useTeam();
  const {
    selectedProjectUid,
    selectedProjectData,
    selectedProjectMembersData,
  } = useProject();
  const newGroupInputRef = useRef(null);
  const workContentsContainerRef = useRef(null);

  const renderStatus = (status) => {
    if (status === "request") {
      return <Status styledbgcolor={"#00B2FF"}>요청</Status>;
    } else if (status === "progress") {
      return <Status styledbgcolor={"#00B01C"}>진행</Status>;
    } else if (status === "complete") {
      return <Status styledbgcolor={"#402A9D"}>완료</Status>;
    } else if (status === "feedback") {
      return <Status styledbgcolor={"#FD7900"}>피드백</Status>;
    } else if (status === "pending") {
      return <Status styledbgcolor={"#777777"}>보류</Status>;
    }
  };

  const renderPriority = (priority) => {
    if (priority === "urgent") {
      return (
        <Priority>
          <Emergency fill={colors.calendar.red} width={20} height={20} />
          긴급
        </Priority>
      );
    } else if (priority === "high") {
      return (
        <Priority>
          <ArrowUp fill={colors.calendar.red} width={20} height={20} />
          높음
        </Priority>
      );
    } else if (priority === "medium") {
      return (
        <Priority>
          <Minus fill={colors.calendar.blue} width={20} height={20} />
          중간
        </Priority>
      );
    } else if (priority === "low") {
      return (
        <Priority>
          <ArrowDown fill={colors.calendar.gray} width={20} height={20} />
          낮음
        </Priority>
      );
    } else {
      return <Priority>-</Priority>;
    }
  };

  const [isWorkLoading, setIsWorkLoading] = useState(true);
  const [work, setWork] = useState([]);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [isAddGroupMode, setIsAddGroupMode] = useState(false);
  const [groupCount, setGroupCount] = useState(0);

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        isAddGroupMode &&
        newGroupInputRef.current &&
        !newGroupInputRef.current.contains(e.target)
      ) {
        setIsAddGroupMode(false);
        console.log();
      }
    };

    if (isAddGroupMode) {
      document.addEventListener("mousedown", handleOutSideClick);
    }

    return () => {
      document.addEventListener("mousedown", handleOutSideClick);
    };
  }, [isAddGroupMode]);

  useEffect(() => {
    setWork([]);
    const callback = (data) => {
      setWork(data?.work);
      setIsWorkLoading(false);
      setGroupCount(selectedProjectData?.projectGroup?.length);
    };

    if (selectedProjectUid) {
      const update = observeDocumentChanges(
        "project-work",
        selectedProjectUid,
        callback
      );

      if (!update) {
        setIsWorkLoading(false);
        console.log(selectedProjectMembersData);
      }
    }
  }, [selectedProjectUid]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let originData = selectedProjectData;
      let groupArr = originData.projectGroup;
      groupArr.push(e.target.value);
      originData.projectGroup = groupArr;

      updateProjectData("project", selectedTeamUid, "data", originData);
      setIsAddGroupMode(false);
    }
  };

  const groupingWorkRender = () => {
    const groupData = selectedProjectData.projectGroup;
    const workData = work;

    const sortedWorkArr = groupData?.map((group) =>
      workData?.filter((work) => work.group === group)
    );

    const ungroupedWorkArr = workData.filter(
      (work) => !groupData.includes(work.group)
    );

    const getUserName = (uidArr) => {
      let nameArr = [];
      uidArr?.map((uid) => {
        nameArr.push(
          selectedProjectMembersData.find((user) => user.uid === uid)?.name
        );
      });
      return nameArr.join(",");
    };

    return (
      <>
        {groupData?.map((group, gidx) => (
          <Group key={uuidv4()}>
            <GroupHeader key={`h-${gidx}`}>
              <GroupBtn>
                <Play width={10} height={10} fill={colors.font.black} />
              </GroupBtn>
              {group}
            </GroupHeader>
            {sortedWorkArr[gidx].map((work, iidx) => (
              <Row key={`r-${iidx}`}>
                <Box style={{ alignItems: "flex-start", paddingLeft: "30px" }}>
                  {work.title}
                </Box>
                <Box maxwidth={"150px"}>{renderStatus(work.status)}</Box>
                <Box maxwidth={"150px"}>{renderPriority(work.priority)}</Box>
                <Box maxwidth={"150px"}>
                  {work?.manager.length > 0 ? getUserName(work?.manager) : "-"}
                </Box>
                <Box maxwidth={"150px"}>
                  {dayjs(work.start).format(
                    `${
                      dayjs().isSame(work.start, "D") ? "오늘" : ` M월 D일`
                    } HH:mm`
                  )}
                </Box>
                <Box maxwidth={"150px"}>
                  {dayjs(work.end).format(
                    `${
                      dayjs().isSame(work.end, "D") ? "오늘" : ` M월 D일`
                    } HH:mm`
                  )}
                </Box>
              </Row>
            ))}
          </Group>
        ))}
        <Group>
          <GroupHeader key={uuidv4()}>
            <GroupBtn>
              <Play width={10} height={10} fill={colors.font.black} />
            </GroupBtn>
            분류 없음
          </GroupHeader>
          {ungroupedWorkArr.map((work) => (
            <Row key={uuidv4()}>
              <Box
                style={{
                  alignItems: "flex-start",
                  paddingLeft: "30px",
                }}
              >
                {work.title}
              </Box>
              <Box maxwidth={"150px"}>{renderStatus(work?.status)}</Box>
              <Box maxwidth={"150px"}>{renderPriority(work?.priority)}</Box>
              <Box maxwidth={"150px"}>
                {work?.manager.length > 0 ? getUserName(work?.manager) : "-"}
              </Box>
              <Box maxwidth={"150px"}>
                {" "}
                {dayjs(work?.start).format(
                  `${
                    dayjs().isSame(work.start, "D") ? "오늘" : ` M월 D일`
                  } HH:mm`
                )}
              </Box>
              <Box maxwidth={"150px"}>
                {" "}
                {dayjs(work.end).format(
                  `${dayjs().isSame(work.end, "D") ? "오늘" : ` M월 D일`} HH:mm`
                )}
              </Box>
            </Row>
          ))}
        </Group>
      </>
    );
  };

  return (
    <>
      {isWorkLoading ? (
        <Ring />
      ) : (
        <Container>
          <ControllerContainer>
            <div style={{ position: "relative" }}>
              <SearchInput placeholder="업무명을 검색해보세요." />
              <Search
                width={14}
                height={14}
                fill={colors.font.darkgray}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "26%",
                  marginLeft: "15px",
                }}
              />
            </div>
            <div>
              <ControllerBtn
                onClick={() => {
                  setIsAddGroupMode(true);
                }}
              >
                그룹 추가
              </ControllerBtn>
              <ControllerBtn onClick={() => setIsAddWorkModalOpen(true)}>
                업무 추가
              </ControllerBtn>
            </div>
          </ControllerContainer>
          <TableHeaderContainer>
            <HeaderBox>업무명</HeaderBox>
            <HeaderBox maxwidth={"150px"}> 상태</HeaderBox>
            <HeaderBox maxwidth={"150px"}>우선순위</HeaderBox>
            <HeaderBox maxwidth={"150px"}>담당자</HeaderBox>
            <HeaderBox maxwidth={"150px"}>시작일</HeaderBox>
            <HeaderBox maxwidth={"150px"}>마감일</HeaderBox>
          </TableHeaderContainer>
          <ContentsContainer groupcount={groupCount}>
            {isAddGroupMode && (
              <NewGroup>
                <input
                  type="text"
                  placeholder="새로운 그룹을 추가합니다. 추가할 그룹명을 입력하세요."
                  ref={newGroupInputRef}
                  onKeyDown={handleKeyDown}
                />
              </NewGroup>
            )}
            {groupingWorkRender()}
          </ContentsContainer>
          {isAddWorkModalOpen && (
            <AddWorkModal setIsAddWorkModalOpen={setIsAddWorkModalOpen} />
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div``;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: white;
  border: none;
  position: sticky;
  top: 50px;
`;

const ControllerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0px 30px;
  background-color: white;
  position: sticky;
  top: 0;
`;

const ContentsContainer = styled.div`
  overflow-y: scroll;
  margin-bottom: ${(props) => `${40 * props.groupcount}px`};
`;

const HeaderBox = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxwidth};
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${colors.border.deepgray};
  border-bottom: 2px solid ${colors.border.deepgray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: ${colors.font.gray};

  :hover {
    border: 2px solid rgba(139, 0, 234, 0.4);
    background-color: #f5f3ff;
  }
`;

const Box = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxwidth};

  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid ${colors.border.deepgray};
  border-right: 1px solid ${colors.border.deepgray};
  border-bottom: 1px solid ${colors.border.deepgray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  color: ${colors.font.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    border: 2px solid rgba(139, 0, 234, 0.4);
    background-color: #f5f3ff;
  }
`;
const Row = styled.div`
  display: flex;
  height: 40px;
  background-color: white;
`;

const Group = styled.div``;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: ${colors.background.gray2};
  padding-left: 30px;
  font-weight: 700;
  font-size: 18px;

  :hover {
    background-color: #f5f3ff;
  }
`;

const GroupBtn = styled.button`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 7px;
  border: 2px solid ${colors.border.deepgray};
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

const NewGroup = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  /* background-color: #f5f3ff; */
  padding-left: 30px;
  font-weight: 700;

  input {
    font-size: 14px;
    width: 100%;
    background-color: #f5f3ff;
    border-radius: 7px;
    border: 2px solid rgba(139, 0, 234, 0.4);
    outline: none;
    height: 28px;
    padding: 10px;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
  width: 72px;
  height: 26px;
  border-radius: 25px;
  background-color: ${(props) => props.styledbgcolor};
  color: white;
  font-weight: 500;
  font-size: 12px;
`;

const Priority = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: 500;
  svg {
    margin-right: 5px;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  height: 30px;

  border: 1px solid ${colors.border.gray};
  border-radius: 5px;
  outline: none;
  padding-left: 40px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  :focus {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`;

const ControllerBtn = styled.button`
  width: 80px;
  height: 30px;
  font-weight: 700;
  margin-left: 10px;
  border-radius: 7px;
  border: 2px solid ${colors.border.gray};
  background-color: white;

  :hover {
    border: 2px solid #6449fc;
    color: #6449fc;
  }
`;

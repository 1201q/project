import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import { useEffect, useState, useRef } from "react";

import { Ring } from "@uiball/loaders";

import Search from "../../../../assets/search.svg";
import AddWorkModal from "../modal/AddWorkModal";
import { useProject } from "@/utils/context/ProjectContext";
import { updateProjectData } from "@/utils/firebase/project";
import { useTeam } from "@/utils/context/TeamContext";
import { observeDocumentChanges } from "@/utils/firebase/db";
import SettingModal from "../modal/SettingModal";
import WorkTable from "./WorkTable";

export default function WorkPage({ isAddGroupMode, setIsAddGroupMode }) {
  const { selectedTeamUid } = useTeam();
  const { selectedProjectUid, selectedProjectData, isOptionPopupVisible } =
    useProject();
  const newGroupInputRef = useRef(null);

  const [isWorkLoading, setIsWorkLoading] = useState(true);
  const [work, setWork] = useState([]);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [groupCount, setGroupCount] = useState(0);

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        isAddGroupMode &&
        newGroupInputRef.current &&
        !newGroupInputRef.current.contains(e.target)
      ) {
        setIsAddGroupMode(false);
      }
    };

    if (isAddGroupMode) {
      newGroupInputRef.current.focus();
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
            <HeaderBox style={{ minWidth: "200px" }}>업무명</HeaderBox>
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
            <WorkTable work={work} />
          </ContentsContainer>
          {isAddWorkModalOpen && (
            <AddWorkModal setIsAddWorkModalOpen={setIsAddWorkModalOpen} />
          )}
          <SettingModal />
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
  z-index: 3;
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
  z-index: 3;
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

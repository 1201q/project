import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../../styles/colors";
import { v4 as uuidv4 } from "uuid";
import Play from "../../../../assets/play.svg";
import { useProject } from "@/utils/context/ProjectContext";
import TableBox from "./TableBox";

import ArrowDown from "../../../../assets/arrow-small-down.svg";
import ArrowUp from "../../../../assets/arrow-small-up.svg";
import Emergency from "../../../../assets/light-emergency-on.svg";
import Minus from "../../../../assets/minus-small.svg";

export default function Group({
  groupName,
  workArray,
  setPopupPosition,
  setWorkId,
  setClickedWorkData,
}) {
  const { selectedProjectMembersData } = useProject();

  const getUserName = (uidArr) => {
    let nameArr = [];
    uidArr?.map((uid) => {
      nameArr.push(
        selectedProjectMembersData.find((user) => user.uid === uid)?.name
      );
    });
    return nameArr.join(",");
  };

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

  const handleClick = (event, ref, workid, data) => {
    setPopupPosition(ref);
    setWorkId(workid);
    setClickedWorkData(data);
    console.log(event, ref, workid, data);
  };

  return (
    <Container>
      <GroupHeader>
        <GroupBtn>
          <Play width={10} height={10} fill={colors.font.black} />
        </GroupBtn>
        {groupName}
      </GroupHeader>
      {workArray.map((work, idx) => (
        <Row key={`r-${idx}`}>
          <TableBox
            text={work.title}
            id={"title"}
            style={{
              alignItems: "flex-start",
              paddingLeft: "30px",
              minWidth: "200px",
            }}
            data={work}
            onClick={handleClick}
          />
          <TableBox
            width={"150px"}
            id={"status"}
            text={renderStatus(work.status)}
            data={work}
            onClick={handleClick}
          />
          <TableBox
            width={"150px"}
            id={"priority"}
            text={renderPriority(work.priority)}
            data={work}
            onClick={handleClick}
          />

          <TableBox
            width={"150px"}
            id={"manager"}
            text={work?.manager.length > 0 ? getUserName(work?.manager) : "-"}
            data={work}
            onClick={handleClick}
          />
          <TableBox
            width={"150px"}
            id={"start"}
            text={dayjs(work.start).format(
              `${dayjs().isSame(work.start, "D") ? "오늘" : ` M월 D일`} HH:mm`
            )}
            data={work}
            onClick={handleClick}
          />
          <TableBox
            width={"150px"}
            id={"end"}
            text={dayjs(work.end).format(
              `${dayjs().isSame(work.end, "D") ? "오늘" : ` M월 D일`} HH:mm`
            )}
            data={work}
            onClick={handleClick}
          />
        </Row>
      ))}
    </Container>
  );
}

const Row = styled.div`
  display: flex;
  height: 40px;
  background-color: white;
`;

const Container = styled.div``;

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

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 72px;
  height: 26px;
  border-radius: 25px;
  background-color: ${(props) => props.styledbgcolor};
  color: white;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

const Priority = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: 500;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
`;

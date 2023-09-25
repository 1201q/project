import styled from "styled-components";
import * as colors from "../../../../styles/colors";

import ArrowDown from "../../../../assets/arrow-small-down.svg";
import ArrowUp from "../../../../assets/arrow-small-up.svg";
import Emergency from "../../../../assets/light-emergency-on.svg";
import Minus from "../../../../assets/minus-small.svg";
import { useProject } from "@/utils/context/ProjectContext";

export default function OptionPopup({ id, workData }) {
  const { selectedProjectMembersData } = useProject();
  const renderStatus = () => {
    return (
      <>
        <Status styledbgcolor={"#00B2FF"}>요청</Status>
        <Status styledbgcolor={"#00B01C"}>진행</Status>
        <Status styledbgcolor={"#402A9D"}>완료</Status>
        <Status styledbgcolor={"#FD7900"}>피드백</Status>
        <Status styledbgcolor={"#777777"}>보류</Status>
      </>
    );
  };

  const renderPriority = () => {
    return (
      <>
        <Priority>
          <Emergency fill={colors.calendar.red} width={20} height={20} />
          긴급
        </Priority>
        <Priority>
          <ArrowUp fill={colors.calendar.red} width={20} height={20} />
          높음
        </Priority>
        <Priority>
          <Minus fill={colors.calendar.blue} width={20} height={20} />
          중간
        </Priority>
        <Priority>
          <ArrowDown fill={colors.calendar.gray} width={20} height={20} />
          낮음
        </Priority>
        <Priority>우선순위 없음</Priority>
      </>
    );
  };

  const renderManager = () => {
    console.log(workData?.manager);
    console.log(selectedProjectMembersData);
  };

  const renderContents = (id) => {
    if (id === "status") {
      return renderStatus();
    } else if (id === "priority") {
      return renderPriority();
    } else if (id === "manager") {
    } else if (id === "start") {
    } else if (id === "end") {
    }
  };

  return <Container onClick={renderManager}>{renderContents(id)}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 13px;
  margin: 3px 0px;
  cursor: pointer;
`;

const Priority = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: 500;
  cursor: pointer;
  margin: 3px 0px;
  svg {
    margin-right: 5px;
  }
`;

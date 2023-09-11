import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import { toggleScheduleComplete } from "@/utils/firebase/calendar";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function Todo({
  scheduleData,
  color,
  title,
  isCompleted,
  start,
  end,
}) {
  const isExpired = !isCompleted && dayjs(end).diff(dayjs(), "minutes") <= 0;
  const user = useAuth();
  const getTime = (minutes) => {
    let min = minutes * -1;

    if (min < 0) {
      return;
    }

    const days = Math.floor(min / (24 * 60));
    min %= 24 * 60;

    const hours = Math.floor(min / 60);
    min %= 60;

    return { day: days, hour: hours, min: min };
  };

  const getRemainingTimeText = (minutes) => {
    const { day, hour, min } = getTime(minutes);

    let renderText = "";

    if (day > 0) {
      renderText += `${day}일 `;
    }

    if (hour > 0) {
      renderText += `${hour}시간 `;
    }

    if (day === 0 && min > 0) {
      renderText += `${min}분 `;
    }

    if (day === 0 && hour === 0 && min <= 0) {
      return "마감임박";
    } else {
      return renderText.trim() + " 남음";
    }
  };

  const renderStatus = () => {
    if (isExpired) {
      return (
        <Status styledbg={"#F7F7F7"} styledfontcolor={colors.font.gray}>
          <StatusColor styledbg={colors.font.gray}></StatusColor>
          만료됨
        </Status>
      );
    } else if (isCompleted) {
      return (
        <Status styledbg={"#FFF3F0"} styledfontcolor={"#FF6C45"}>
          <StatusColor styledbg={"#FF6C45"}></StatusColor>
          완료됨
        </Status>
      );
    } else if (!isCompleted) {
      return (
        <Status styledbg={"#E6FAED"} styledfontcolor={"#0BD34D"}>
          <StatusColor styledbg={"#0BD34D"}></StatusColor>
          진행중
        </Status>
      );
    }
  };

  return (
    <Container
      onClick={() => {
        console.log(getRemainingTime());
        console.log(scheduleData);

        toggleScheduleComplete(
          "schedule",
          user.user.uid,
          "data",
          scheduleData.id
        );
      }}
      isdone={isExpired || isCompleted}
    >
      <TodoHeader>{renderStatus()}</TodoHeader>

      <TodoTitle isdone={isExpired || isCompleted}>{title}</TodoTitle>
      {!isExpired && !isCompleted && (
        <TodoTime>
          <Time>{getRemainingTimeText(dayjs().diff(end, "minutes"))}</Time>
        </TodoTime>
      )}
    </Container>
  );
}

// todo
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  opacity: ${(props) => (props.isdone ? "0.4" : "1")};
  border-radius: 7px;
  padding: 3px 10px;

  :hover {
    background-color: ${colors.background.gray};
  }
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 12px;
  min-width: 60px;
`;

const Color = styled.div`
  width: 11px;
  height: 11px;
  min-width: 11px;
  min-height: 11px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color ? props.color : colors.calendar.green};
  margin-right: 3px;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  min-width: 62px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  padding: 3px 5px;
  border-radius: 7px;

  color: ${(props) => props.styledfontcolor};
  background-color: ${(props) => props.styledbg};
`;

const StatusColor = styled.div`
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.styledbg};
  margin-right: 5px;
`;

const TodoTitle = styled.div`
  padding: 7px;
  width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  text-decoration: ${(props) => (props.isdone ? "line-through" : "none")};
`;

const TodoTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 140px;
  min-width: 140px;
  height: 100%;
`;

const Time = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${colors.font.gray};
  margin-left: 3px;
`;

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
  const getRemainingTime = () => {
    const now = dayjs();
    const diffDays = dayjs(end).diff(now, "days");
    const diffHours = dayjs(end).diff(now, "hours");
    const diffMinutes = dayjs(end).diff(now, "minutes");

    let days = 0;
    let hours = 0;
    let min = 0;

    if (diffDays >= 1) {
      days = diffDays;
    }
    hours = diffHours - days * 24;
    min = diffMinutes - hours * 60 - days * 1440;

    return { days, hours, min };
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
          {getRemainingTime().days > 0 && (
            <Time>{getRemainingTime().days}일</Time>
          )}
          {getRemainingTime().hours > 0 && (
            <Time>{getRemainingTime().hours}시간</Time>
          )}
          {getRemainingTime().min > 0 && getRemainingTime().days === 0 && (
            <Time>{getRemainingTime().min}분 </Time>
          )}
          {!isExpired && !isCompleted && <Time>남음</Time>}
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

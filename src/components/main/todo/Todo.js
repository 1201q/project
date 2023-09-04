import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";

export default function Todo({
  scheduleData,
  color,
  title,
  isCompleted,
  start,
  end,
}) {
  const isExpired = dayjs(end).diff(dayjs(), "minutes") <= 0;

  const getRemainingTime = () => {
    const diffDays = dayjs(end).diff(dayjs(), "days");
    const diffHours = dayjs(end).diff(dayjs(), "hours");
    const diffMinutes = dayjs(end).diff(dayjs(), "minutes");

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
        <Status styledbg={colors.calendar.gray} styledfontcolor={"white"}>
          만료됨
        </Status>
      );
    } else if (isCompleted) {
      return (
        <Status styledbg={colors.calendar.red} styledfontcolor={"white"}>
          완료
        </Status>
      );
    } else if (!isCompleted) {
      return (
        <Status styledbg={colors.calendar.green} styledfontcolor={"white"}>
          진행중
        </Status>
      );
    }
  };

  return (
    <Container
      onClick={() => {
        console.log(getRemainingTime());
      }}
    >
      <TodoHeader>{renderStatus()}</TodoHeader>
      <Color color={color}></Color>
      <TodoTitle>
        {title} ({dayjs(end).format("M월 DD일 HH:mm")})
      </TodoTitle>
      <TodoTime>
        {getRemainingTime().days > 0 && (
          <Time>{getRemainingTime().days}일</Time>
        )}
        {getRemainingTime().hours > 0 && (
          <Time>{getRemainingTime().hours}시간</Time>
        )}
        {getRemainingTime().min > 0 && <Time>{getRemainingTime().min}분 </Time>}
      </TodoTime>
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
  padding-bottom: 10px;
  /* background-color: blue; */
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 20px;
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
  min-width: 60px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  padding: 3px 10px;
  border-radius: 7px;

  color: ${(props) => props.styledfontcolor};
  background-color: ${(props) => props.styledbg};
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
`;

const TodoTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100px;
  min-width: 100px;
  height: 100%;
`;

const Time = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${colors.font.gray};
  margin-left: 3px;
`;

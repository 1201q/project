import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import { toggleScheduleComplete } from "@/utils/firebase/calendar";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function TodoDetail({
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
    const now = dayjs(); // 현재 시간
    const elevenAM = dayjs().set("hour", 11).set("minute", 0).set("second", 0); // 오전 11시
    const elevenPM = dayjs().set("hour", 23).set("minute", 0).set("second", 0); // 오후 11시

    let end;

    // 현재 시간이 오전 11시 이전인 경우
    if (now.isBefore(elevenAM)) {
      end = elevenAM;
    } else {
      end = elevenPM;
    }

    const diff = end.diff(now);
    const diffDays = Math.floor(diff / (24 * 60 * 60 * 1000)); // 일 단위
    const diffHours = Math.floor(
      (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    ); // 시간 단위
    const diffMinutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)); // 분 단위

    return { days: diffDays, hours: diffHours, minutes: diffMinutes };
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
        console.log(dayjs().diff(end, "minutes"));
        toggleScheduleComplete(
          "schedule",
          user.user.uid,
          "data",
          scheduleData.id
        );
      }}
      isdone={isExpired || isCompleted}
    >
      <Color color={color}></Color>
      <FlexDiv>
        <Title>
          <TodoTitle isdone={isExpired || isCompleted}>{title}</TodoTitle>{" "}
          <TodoHeader>{renderStatus()}</TodoHeader>
        </Title>
        <Date>{dayjs(end).format("M월 D일 HH:mm")} 까지</Date>
      </FlexDiv>
      {!isCompleted && (
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
  padding: 0px 15px;
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 20px;
  min-width: 60px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background-color: red; */
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
  margin-right: 20px;
  font-size: 25px;
  font-weight: 700;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  text-decoration: ${(props) => (props.isdone ? "line-through" : "none")};
`;

const Date = styled.div`
  font-size: 13px;
  color: ${colors.font.gray};
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

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 7px;
`;

const Color = styled.div`
  width: 7px;
  height: 43px;
  max-height: 100%;
  margin-right: 10px;
  margin-top: 2px;
  background-color: ${(props) =>
    props.color ? props.color : colors.calendar.green};
  border-radius: 2px;
`;

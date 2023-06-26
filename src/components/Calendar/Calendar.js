import styled from "styled-components";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect } from "react";
import Todo from "./Todo";
import Image from "next/image";

dayjs.extend(isSameOrBefore);

export default function Calendar({ currentDate, setCurrentDate }) {
  const MonthControl = (mode) => {
    if (mode === "prev") {
      setCurrentDate(currentDate.add(-1, "month"));
    } else if (mode === "next") {
      setCurrentDate(currentDate.add(1, "month"));
    }
  };

  const renderCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");

    const calendar = [];
    let day = startOfWeek;
    while (day.isSameOrBefore(endOfWeek)) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(
          <Date key={day.format("YYYY-MM-DD")}>
            <TodoContainer>
              {<Todo day={day} currentDate={currentDate} />}
            </TodoContainer>
            <DateText day={day} currentDate={currentDate}>
              {day.format("D")}
            </DateText>
          </Date>
        );
        day = day.add(1, "day");
      }
      calendar.push(<Week key={week[0].key}>{week}</Week>);
    }
    return calendar;
  };

  return (
    <Container>
      <Controller>
        <CurrentMonth>{currentDate.format("YYYY년 M월")}</CurrentMonth>
        <div>
          <Button onClick={() => MonthControl("prev")}>
            <Image
              src={require("../../assets/angle-small-left.svg")}
              alt="left"
              width={20}
              height={20}
            />
          </Button>
          <Button onClick={() => MonthControl("next")}>
            <Image
              src={require("../../assets/angle-small-right.svg")}
              alt="right"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </Controller>
      <Header>
        <Day>일</Day>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
      </Header>
      <div>
        <Body>{renderCalendar()}</Body>
      </div>
    </Container>
  );
}

// 스타일링

const Container = styled.div`
  width: 100%;
`;

const Controller = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;

const CurrentMonth = styled.p`
  margin-right: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #283f5b;
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 10px;
  border: 2px solid #f3f4f7;
  margin-left: 10px;
  cursor: pointer;
`;

const Week = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Date = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  min-width: 130px;
  /* border: none; */
  cursor: pointer;
  border: 0.1px solid #f3f4f7;

  padding: 8px 5px;
`;

const DateText = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${({ day, currentDate }) => {
    if (day.get("d") === 0) {
      return "#EF9280";
    } else if (day.get("d") === 6) {
      return "#307FF5";
    } else if (currentDate.get("month") === day.get("month")) {
      return "#758496";
    } else {
      return "#D1D3D9";
    }
  }};
  opacity: ${({ day, currentDate }) => {
    if (currentDate.get("month") !== day.get("month")) {
      if (day.get("d") === 0) {
        return "0.4";
      } else if (day.get("d") === 6) {
        return "0.4";
      } else {
        return 1;
      }
    }
  }};
`;

const TodoContainer = styled.div`
  width: 100%;
  top: 4px;
  left: 0px;
  position: absolute;
  background-color: white;
  z-index: 20;
`;

const Header = styled.div`
  display: flex;
  background-color: white;
  font-size: 13px;
`;

const Day = styled.div`
  width: 100%;
  min-width: 130px;
  border: none;
  text-align: center;
  font-weight: 600;
  padding-bottom: 15px;
  color: #d1d3d9;
  font-size: 18px;
`;

const Body = styled.div`
  height: calc(100vh - 150px);
  max-height: 100vh;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
`;

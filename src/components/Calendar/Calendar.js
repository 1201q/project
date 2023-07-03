import styled from "styled-components";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import Image from "next/image";
import * as colors from "../../styles/colors";
import AngleLeft from "../../assets/angle-small-left.svg";
import AngleRight from "../../assets/angle-small-right.svg";
import { motion } from "framer-motion";

dayjs.extend(isSameOrBefore);

export default function Calendar({ currentDate, setCurrentDate }) {
  const monthControl = (mode) => {
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
        const isPrevMonth = day.isBefore(startOfMonth);
        const isNextMonth = day.isAfter(endOfMonth);
        const isSunday = day.day() === 0;
        const isSaturday = day.day() === 6;

        week.push(
          <Date
            key={day.format("YYYY-MM-DD")}
            isPrevMonth={isPrevMonth}
            isNextMonth={isNextMonth}
            isSunday={isSunday}
            isSaturday={isSaturday}
          >
            {day.format("D")}
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
      <ControllerContainer>
        <CurrentDateText>{currentDate.format("YYYY년 M월")}</CurrentDateText>
        <ControlBtn
          whileTap={{ scale: 0.9 }}
          onClick={() => monthControl("prev")}
        >
          <AngleLeft width={20} height={20} fill={colors.font.black} />
        </ControlBtn>
        <ControlBtn
          whileTap={{ scale: 0.9 }}
          onClick={() => monthControl("next")}
        >
          <AngleRight width={20} height={20} fill={colors.font.black} />
        </ControlBtn>
      </ControllerContainer>
      <DayHeaderContainer>
        <Day>일</Day>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
      </DayHeaderContainer>
      <DateContainer>{renderCalendar()}</DateContainer>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ControllerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid ${colors.border.gray};
  height: 61px;
`;

const DayHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  /* border-top: ; */
  border-bottom: 1px solid ${colors.border.deepgray};
  height: 30px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 90px);
`;

// 컨트롤러 헤더
const CurrentDateText = styled.p`
  width: 150px;
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
`;

const ControlBtn = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 5px;
  margin-top: 3px;
`;

// 달력
const Week = styled.div`
  display: flex;
  height: 100%;
`;

const Day = styled.div`
  /* 요일 */
  text-align: center;
  width: 100%;
  min-width: 185px;
  padding: 5px 10px;
  font-size: 13px;
  color: ${colors.font.black};
  font-weight: 400;
`;

const Date = styled.div`
  /* 숫자로 된 일 */
  width: 100%;
  min-width: 185px;
  height: 100%;
  border-right: 1px solid ${colors.border.deepgray};
  border-bottom: 1px solid ${colors.border.deepgray};
  padding: 10px 10px;
  font-size: 15px;
  text-align: start;
  color: ${(props) => {
    if (props.isPrevMonth && !props.isSaturday && !props.isSunday)
      return "#dcdcdc"; // 이전 달 날짜
    if (props.isNextMonth && !props.isSaturday && !props.isSunday)
      return "#dcdcdc"; // 다음 달 날짜
    if (props.isSunday) return colors.others.orange; // 일요일
    if (props.isSaturday) return colors.others.blue; // 토요일
    return colors.font.black; // 현재 달 날짜
  }};
`;

import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import * as colors from "../../styles/colors";
// svg
import AngleLeft from "../../assets/angle-small-left.svg";
import AngleRight from "../../assets/angle-small-right.svg";
// 컴포넌트
import AddScheduleModal from "./Modal/AddSchedule";
import DetailInfoPopup from "./Modal/DetailInfo";
import MoreListPopup from "./Modal/MoreList";
// context
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";
import Date from "./Contents/Date";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function Calendar() {
  const {
    currentDate,
    setCurrentDate,
    setSelectedDate,
    scheduleList = [],
  } = useCalendar();

  const {
    isAddScheduleModalOpen,
    setIsAddScheduleModalOpen,
    isDetailInfoPopupOpen,
    isMoreListPopupOpen,
  } = useCalendarModal();

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsAddScheduleModalOpen(true);
  };

  const monthControl = (mode) => {
    if (mode === "prev") {
      setCurrentDate(dayjs(currentDate).add(-1, "month"));
    } else if (mode === "next") {
      setCurrentDate(dayjs(currentDate).add(1, "month"));
    }
  };

  // 현재 보고 있는 달의 todo목록만 return
  const returnCurrentTodoList = (startOfWeek, endOfWeek) => {
    const currentMonthArr = scheduleList
      .filter((item) => {
        if (
          dayjs(item.start).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
          dayjs(item.end).isBetween(startOfWeek, endOfWeek, "day", "[]")
        ) {
          return item;
        }
      })
      .sort((a, b) => dayjs(a.start) - dayjs(b.start));
    return currentMonthArr;
  };

  // 임시 arr를 만듦
  // 여기서 만든 arr에 따라 렌더링하게 됨.
  const makeArr = (startOfWeek, endOfWeek) => {
    let todolistSet = [];
    let day = startOfWeek;

    while (day.isSameOrBefore(endOfWeek)) {
      todolistSet.push({
        day: day,

        more: false,
      });
      day = day.add(1, "day");
    }
    return todolistSet;
  };

  const setTodoList = (todolist, arr) => {
    const todolistCopy = [...todolist];

    let renderTodoList = [];

    arr.map((item) => {
      let list = [];
      let count = 0;
      todolist.map((todo, idx) => {
        if (item.day.isBetween(todo.start, todo.end, "day", "[]")) {
          count++;
          // order_set

          if (!todolistCopy[idx].order) {
            todolistCopy[idx].order = count;
          }

          // order_set
          list.push(todolistCopy[idx]);
        }
      });

      renderTodoList.push(list);
      list = [];
    });

    return renderTodoList;
  };

  const renderCalendar = () => {
    const startOfMonth = dayjs(currentDate).startOf("month");
    const endOfMonth = dayjs(currentDate).endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");
    const today = dayjs();

    const calendar = [];
    const currentTodoList = returnCurrentTodoList(startOfWeek, endOfWeek);
    const tempArr = makeArr(startOfWeek, endOfWeek);
    const renderTodoArr = setTodoList(currentTodoList, tempArr);

    let day = startOfWeek;
    let number = 0;

    while (day.isSameOrBefore(endOfWeek)) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const isPrevMonth = day.isBefore(startOfMonth);
        const isNextMonth = day.isAfter(endOfMonth);
        const isSunday = day.day() === 0;
        const isSaturday = day.day() === 6;
        const isToday = day.isSame(today, "day");

        week.push(
          <DateContainer
            key={day.format("YYYY-MM-DD")}
            id={day.format("YYYY-MM-DD")}
            onClick={() => {
              handleDateClick(week[i].key);
            }}
          >
            <Date
              day={day}
              isPrevMonth={isPrevMonth}
              isNextMonth={isNextMonth}
              isSunday={isSunday}
              isSaturday={isSaturday}
              isToday={isToday}
              renderTodo={renderTodoArr[number]}
            />
          </DateContainer>
        );
        number++;
        day = day.add(1, "day");
      }
      calendar.push(
        <Week id={week[0].key} key={week[0].key}>
          {week}
        </Week>
      );
    }

    return calendar;
  };

  return (
    <Container>
      <ControllerContainer>
        <CurrentDateText>
          {dayjs(currentDate).format("YYYY년 M월")}
        </CurrentDateText>
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
        <DayHeader>일</DayHeader>
        <DayHeader>월</DayHeader>
        <DayHeader>화</DayHeader>
        <DayHeader>수</DayHeader>
        <DayHeader>목</DayHeader>
        <DayHeader>금</DayHeader>
        <DayHeader>토</DayHeader>
      </DayHeaderContainer>
      <MainContainer>{renderCalendar()}</MainContainer>
      {isDetailInfoPopupOpen && <DetailInfoPopup />}
      {isAddScheduleModalOpen && <AddScheduleModal />}
      {isMoreListPopupOpen && <MoreListPopup />}
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  max-height: 100vh;
  overflow-x: scroll;
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
  border-bottom: 1px solid ${colors.border.deepgray};
  height: 30px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 91px);
`;

const DateContainer = styled.div`
  position: relative;
  /* 숫자로 된 일 */
  width: 100%;
  min-width: 185px;
  height: 100%;
  min-height: 104px;

  border-bottom: 1px solid ${colors.border.deepgray};
  cursor: pointer;
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

const DayHeader = styled.div`
  /* 요일 */
  text-align: center;
  width: 100%;
  min-width: 185px;

  font-size: 13px;
  color: ${colors.font.black};
  font-weight: 400;
`;

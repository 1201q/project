import styled from "styled-components";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";

import { useEffect, useState, useRef } from "react";

import * as colors from "../../styles/colors";
import AngleLeft from "../../assets/angle-small-left.svg";
import AngleRight from "../../assets/angle-small-right.svg";
import { motion } from "framer-motion";
import Todo from "./Todo";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import InfoPopup from "./InfoPopup";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function Calendar({ currentDate, setCurrentDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTodoData, setSelectedTodoData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDateClick = (clickedDay) => {
    setSelectedDate(clickedDay);
    setIsModalOpen(true);
  };

  const handleTodoClick = (todoData, event) => {
    setIsModalOpen(false);
    setIsPopupOpen(true);
    setSelectedTodoData(todoData);
  };

  const monthControl = (mode) => {
    if (mode === "prev") {
      setCurrentDate(currentDate.add(-1, "month"));
    } else if (mode === "next") {
      setCurrentDate(currentDate.add(1, "month"));
    }
  };

  const todoList = [
    {
      id: uuidv4(),
      title: "1번에 배정받아야",
      start: dayjs("2023-07-08"),
      end: dayjs("2023-07-11"),
      color: "yellow",
    },
    {
      id: uuidv4(),
      title: "얘는 2번에 배정받음",
      start: dayjs("2023-07-10"),
      end: dayjs("2023-07-12"),
      color: "mint",
    },
    {
      id: uuidv4(),
      title: "할일 3할일이할일이할일이할일이ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ",
      start: dayjs("2023-07-11"),
      end: dayjs("2023-07-17"),
      color: "green",
    },
    {
      id: uuidv4(),
      title: "할일 5",
      start: dayjs("2023-07-15"),
      end: dayjs("2023-07-18"),
      color: "purple",
    },

    {
      id: uuidv4(),
      title: "할일 11",
      start: dayjs("2023-07-13"),
      end: dayjs("2023-07-13"),
      color: "gray",
    },
    {
      id: uuidv4(),
      title: "할일 11",
      start: dayjs("2023-07-11"),
      end: dayjs("2023-07-11"),
      color: "red",
    },
    {
      id: uuidv4(),
      title: "할일 15",
      start: dayjs("2023-07-12"),
      end: dayjs("2023-07-12"),
      color: "red",
    },
  ];

  const renderCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");
    const today = dayjs();

    const calendar = [];
    const currentTodoList = returnCurrentTodoList(startOfWeek, endOfWeek);

    const tempArr = makeArr(startOfWeek, endOfWeek);

    // 함수
    const renderTodoArr = setTodoList(currentTodoList, tempArr);

    // 함수

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
          <Date
            key={day.format("YYYY-MM-DD")}
            id={day.format("YYYY-MM-DD")}
            onClick={() => {
              handleDateClick(week[i].key);
            }}
          >
            <DateText
              isPrevMonth={isPrevMonth}
              isNextMonth={isNextMonth}
              isSunday={isSunday}
              isSaturday={isSaturday}
              isToday={isToday}
            >
              {day.format("D")}
            </DateText>
            <TodoContainer>
              {renderTodoArr[number].map((item) => item.order).includes(1) ? (
                <Todo
                  day={day}
                  data={
                    renderTodoArr[number][
                      renderTodoArr[number].map((item) => item.order).indexOf(1)
                    ]
                  }
                  handleTodoClick={handleTodoClick}
                />
              ) : (
                <BlankTodo />
              )}
            </TodoContainer>
            <TodoContainer>
              {renderTodoArr[number].map((item) => item.order).includes(2) ? (
                <Todo
                  day={day}
                  data={
                    renderTodoArr[number][
                      renderTodoArr[number].map((item) => item.order).indexOf(2)
                    ]
                  }
                  handleTodoClick={handleTodoClick}
                />
              ) : (
                <BlankTodo />
              )}
            </TodoContainer>
            <TodoContainer>
              {renderTodoArr[number].map((item) => item.order).includes(3) ? (
                <Todo
                  day={day}
                  data={
                    renderTodoArr[number][
                      renderTodoArr[number].map((item) => item.order).indexOf(3)
                    ]
                  }
                  handleTodoClick={handleTodoClick}
                />
              ) : (
                <BlankTodo />
              )}
            </TodoContainer>
            <TodoContainer>
              {renderTodoArr[number].map((item) => item.order).includes(4) ? (
                <More>더보기</More>
              ) : (
                <BlankTodo />
              )}
            </TodoContainer>
          </Date>
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

  // 현재 보고 있는 달의 todo목록만 return
  const returnCurrentTodoList = (startOfWeek, endOfWeek) => {
    const currentMonthArr = todoList
      .filter((item) => {
        if (
          item.start.isBetween(startOfWeek, endOfWeek, "day", "[]") ||
          item.end.isBetween(startOfWeek, endOfWeek, "day", "[]")
        ) {
          return item;
        }
      })
      .sort((a, b) => a.start - b.start);
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

      {isPopupOpen && (
        <InfoPopup
          setIsPopupOpen={setIsPopupOpen}
          selectedTodoData={selectedTodoData}
        />
      )}

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      )}
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  height: 100vh;
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

  font-size: 13px;
  color: ${colors.font.black};
  font-weight: 400;
`;

const Date = styled.div`
  position: relative;
  /* 숫자로 된 일 */
  width: 100%;
  min-width: 185px;
  height: 100%;
  min-height: 104px;
  /* border-right: 1px solid ${colors.border.deepgray}; */
  border-bottom: 1px solid ${colors.border.deepgray};
  cursor: pointer;
`;

const DateText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => {
    if (props.isPrevMonth && !props.isSaturday && !props.isSunday)
      return "#dcdcdc"; // 이전 달 날짜
    if (props.isNextMonth && !props.isSaturday && !props.isSunday)
      return "#dcdcdc"; // 다음 달 날짜
    if (props.isSunday && !props.isToday) return colors.others.orange; // 일요일
    if (props.isSaturday && !props.isToday) return colors.others.blue; // 토요일
    if (props.isToday) return "white";
    return colors.font.black; // 현재 달 날짜
  }};
  font-size: 13px;
  background-color: ${(props) => {
    if (props.isToday) return colors.others.blue;
  }};
  border-radius: 50%;

  width: 20px;
  height: 20px;
  margin: 6px 6px;
`;

// todo
const TodoContainer = styled.div``;

const BlankTodo = styled.div`
  width: 100%;
  height: 16px;
  background: none;
  margin-bottom: 2px;
  padding: 1px 5px;
`;

const More = styled.a`
  position: absolute;
  top: 84px;
  z-index: 100;
  width: 100%;
  margin-top: 2px;
  padding-right: 5px;
  color: ${colors.others.black};
  text-align: right;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

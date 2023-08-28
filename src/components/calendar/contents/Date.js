import dayjs from "dayjs";
import styled from "styled-components";
import Todo from "./Todo";
import More from "./More";
import * as colors from "../../../styles/colors";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";

// svg
import Check from "../../../assets/check.svg";
import Complete from "./Complete";

export default function DateComponents({
  day,
  isPrevMonth,
  isNextMonth,
  isSunday,
  isSaturday,
  isToday,
  renderTodo,
}) {
  const { setSelectedTodoData } = useCalendar();
  const { setIsAddScheduleModalOpen, setIsDetailInfoPopupOpen } =
    useCalendarModal();

  const handleTodoClick = (todoData) => {
    setIsDetailInfoPopupOpen(false);
    setIsAddScheduleModalOpen(false);

    setTimeout(() => {
      setIsDetailInfoPopupOpen(true);
      setSelectedTodoData(todoData);
    }, 50);
  };

  return (
    <>
      <DateText
        isPrevMonth={isPrevMonth}
        isNextMonth={isNextMonth}
        isSunday={isSunday}
        isSaturday={isSaturday}
        isToday={isToday}
      >
        {dayjs(day).format("D")}
      </DateText>
      {renderTodo.some((item) => item.isCompleted) && (
        <Complete data={renderTodo} clickedDay={day} />
      )}

      {[1, 2, 3].map((orderNumber) => (
        <TodoContainer key={orderNumber}>
          {renderTodo.map((item) => item.order).includes(orderNumber) ? (
            <Todo
              day={day}
              data={
                renderTodo[
                  renderTodo.map((item) => item.order).indexOf(orderNumber)
                ]
              }
              handleTodoClick={handleTodoClick}
            />
          ) : (
            <BlankTodo />
          )}
        </TodoContainer>
      ))}

      <TodoContainer>
        {renderTodo.map((item) => item.order).includes(4) ? (
          <More data={renderTodo} clickedDay={day} />
        ) : (
          <BlankTodo />
        )}
      </TodoContainer>
    </>
  );
}

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

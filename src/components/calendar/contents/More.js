import styled from "styled-components";
import * as colors from "../../../styles/colors";
import { useRef } from "react";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";
import dayjs from "dayjs";

export default function More({ data, clickedDay }) {
  const moreRef = useRef();

  const { setSelectedDate, setSelectedTodayScheduleArr } = useCalendar();

  const {
    setIsAddScheduleModalOpen,
    setIsMoreListPopupOpen,
    setMoreListPopupPosition,
  } = useCalendarModal();

  const handleMoreClick = (todoArr, position) => {
    setSelectedDate(clickedDay);
    setIsAddScheduleModalOpen(false);
    setIsMoreListPopupOpen(true);
    setSelectedTodayScheduleArr(todoArr);
    setMoreListPopupPosition(position);
  };

  return (
    <Container ref={moreRef}>
      <Text
        onClick={(event) => {
          event.stopPropagation();
          handleMoreClick(data, moreRef.current.getBoundingClientRect());
        }}
      >
        더보기
      </Text>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 5px;
  right: 5px;
  z-index: 100;
  width: fit-content;
  color: ${colors.others.black};

  text-align: right;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Text = styled.div`
  overflow-x: hidden;
  white-space: nowrap; /* 텍스트가 한 줄로 이어지도록 함 */
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  z-index: 800;
`;

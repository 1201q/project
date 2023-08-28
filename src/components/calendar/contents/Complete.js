import styled from "styled-components";
import * as colors from "../../../styles/colors";
import { useRef } from "react";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";
import dayjs from "dayjs";

// svg
import Check from "../../../assets/check.svg";

export default function Complete({ data, clickedDay }) {
  const completeRef = useRef();
  return (
    <Container ref={completeRef}>
      <Check
        width={12}
        height={12}
        fill={`${colors.calendar.green}`}
        onClick={(event) => {
          event.stopPropagation();
          console.log(data, clickedDay);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;

  width: 20px;
  height: 20px;
  margin: 6px 6px;
`;

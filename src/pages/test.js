import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar/Calendar";
import styled from "styled-components";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useState } from "react";

dayjs.extend(isSameOrBefore);

export default function Test() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  return (
    <Container>
      <Sidebar />
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

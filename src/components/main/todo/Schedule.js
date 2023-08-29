import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import Todo from "./Todo";
import { useEffect, useState, useRef } from "react";

export default function Schedule() {
  const containerRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log("hello");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("bye");
    setIsHovered(false);
  };

  return (
    <Container
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Header isHovered={isHovered}>할 일</Header>
      <Contents>
        <Todo
          color={colors.calendar.green}
          title={"제목"}
          isCompleted={false}
          remainTime={dayjs()}
        />
        <Todo
          color={colors.calendar.green}
          title={"제목"}
          isCompleted={false}
          remainTime={dayjs()}
        />
        <Todo
          color={colors.calendar.green}
          title={"제목"}
          isCompleted={false}
          remainTime={dayjs()}
        />
        <Todo
          color={colors.calendar.green}
          title={"제목"}
          isCompleted={false}
          remainTime={dayjs()}
        />
        <Todo
          color={colors.calendar.green}
          title={"제목"}
          isCompleted={false}
          remainTime={dayjs()}
        />
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background-color: white;
  overflow-y: auto;
  transition-duration: 0.3s;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  padding: 15px 20px 15px 20px;
  background-color: white;
  /* color: ${colors.font.white}; */
  position: sticky;
  font-size: 20px;
  font-weight: 600;
  top: 0px;
  left: 0px;
  box-shadow: ${(props) =>
    props.isHovered ? "5px 5px 10px 5px rgba(0, 0, 0, 0.03)" : "none"};

  transition-duration: 0.3s;
  z-index: 1;
`;

const Contents = styled.div`
  margin-top: 5px;
  width: 100%;
  padding: 5px 20px 30px 20px;
`;

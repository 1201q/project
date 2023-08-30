import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";

export default function Todo({ color, title, isCompleted, remainTime }) {
  return (
    <Container>
      <TodoStatus>
        <Color color={color}></Color>
        <StatusText>{isCompleted ? "완료" : "진행"}</StatusText>
      </TodoStatus>
      <TodoTitle>{title}</TodoTitle>
      <TodoTime>{dayjs(remainTime).format("M월 DD일 HH:mm")}</TodoTime>
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
  padding-bottom: 10px;
`;

const TodoStatus = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  min-width: 80px;
  padding: 7px 0px 7px 0px;
`;

const Color = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color ? props.color : colors.calendar.green};
`;
const StatusText = styled.p`
  margin-left: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const TodoTitle = styled.div`
  padding: 7px;
  width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TodoTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  font-weight: 400;
  color: ${colors.font.gray};

  width: 100px;
  min-width: 100px;
  /* padding: 7px; */
  height: 100%;
`;

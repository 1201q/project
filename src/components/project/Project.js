import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import { toggleScheduleComplete } from "@/utils/firebase/calendar";
import { useAuth } from "@/utils/context/auth/AuthProvider";

export default function Project({ color, title }) {
  const user = useAuth();

  return (
    <Container>
      <Color color={color && colors.calendar[color]}></Color>
      <FlexDiv>
        <Title>
          <TodoTitle>{title}</TodoTitle>
        </Title>
        <Date>{dayjs().format("M월 D일 HH:mm")} 까지</Date>
      </FlexDiv>
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
  margin-bottom: 10px;
  opacity: ${(props) => (props.isdone ? "0.4" : "1")};
  border-radius: 7px;
  padding: 0px 15px;
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 20px;
  min-width: 60px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TodoTitle = styled.div`
  margin-right: 20px;
  font-size: 25px;
  font-weight: 700;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  text-decoration: ${(props) => (props.isdone ? "line-through" : "none")};
`;

const Date = styled.div`
  font-size: 13px;
  color: ${colors.font.gray};
`;

const TodoTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 140px;
  min-width: 140px;
  height: 100%;
`;

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 7px;
`;

const Color = styled.div`
  width: 7px;
  height: 43px;
  max-height: 100%;
  margin-right: 10px;
  margin-top: 2px;
  background-color: ${(props) =>
    props.color ? props.color : colors.calendar.green};
  border-radius: 2px;
`;

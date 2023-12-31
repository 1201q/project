import styled from "styled-components";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";

export default function Todo({ day, data, handleTodoClick }) {
  return (
    <Container
      order={data.order}
      styledbgcolor={colors.calendar[data.color]}
      styledfontcolor={"white"}
      onClick={(event) => {
        event.stopPropagation();
        handleTodoClick(data);
      }}
    >
      {dayjs(day).get("day") === 0 || dayjs(day).isSame(data.start, "date") ? (
        <>
          <Text>
            {data.title} {data.isCompleted && " (완료)"}
          </Text>
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${(props) =>
    props.order === 2 ? "48px" : props.order === 3 ? "66px" : "30px"};
  z-index: 1;
  width: 100%;
  height: 17px;
  background-color: ${(props) =>
    props.styledbgcolor ? props.styledbgcolor : colors.calendar.red};
  color: white;
  padding: 1px 5px;

  cursor: pointer;
`;

const Text = styled.div`
  overflow-x: hidden;
  white-space: nowrap; /* 텍스트가 한 줄로 이어지도록 함 */
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  z-index: 800;
`;

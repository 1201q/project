import styled from "styled-components";
import dayjs from "dayjs";

export default function Todo({ day, currentDate }) {
  return (
    <Do day={day} currentDate={currentDate}>
      <Wrapper>
        <p>내 일정</p>
      </Wrapper>
    </Do>
  );
}

const Do = styled.div`
  width: 100%;
  opacity: ${({ day, currentDate }) => {
    if (currentDate.get("month") !== day.get("month")) {
      if (day.get("d") === 0) {
        return "0.4";
      } else if (day.get("d") === 6) {
        return "0.4";
      } else {
        return 1;
      }
    }
  }};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 6px;
  padding: 1px 3px;
  background-color: #e2ecf9;
  color: #758496;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
`;

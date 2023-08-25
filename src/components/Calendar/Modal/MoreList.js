import dayjs from "dayjs";
import { motion } from "framer-motion";
import styled from "styled-components";
import * as colors from "../../../styles/colors";

// svg
import X from "../../../assets/x.svg";

import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";

export default function MoreListPopup() {
  const { selectedDate, setSelectedTodoData, selectedTodayScheduleArr } =
    useCalendar();
  const {
    setIsAddScheduleModalOpen,
    setIsDetailInfoPopupOpen,
    moreListPopupPosition,
    setIsMoreListPopupOpen,
  } = useCalendarModal();

  const handleTodoClick = (todoData) => {
    setIsAddScheduleModalOpen(false);
    setIsDetailInfoPopupOpen(false);

    setTimeout(() => {
      setIsDetailInfoPopupOpen(true);
      setSelectedTodoData(todoData);
    }, 50);
  };

  return (
    <Container
      styledmarginx={moreListPopupPosition.left}
      styledmarginy={moreListPopupPosition.top}
    >
      <Wrapper>
        <HeaderContainer>
          <HeaderText>
            {dayjs(selectedDate).format("YYYY년 MM월 DD일")}
          </HeaderText>
        </HeaderContainer>
        <ScheduleContainer>
          {selectedTodayScheduleArr.map((item) => (
            <Schedule
              onClick={() => {
                handleTodoClick(item);
              }}
              key={item.id}
              styledbgcolor={colors.calendar[item.color]}
            >
              {item.title}
            </Schedule>
          ))}
        </ScheduleContainer>
        <CloseButton onClick={() => setIsMoreListPopupOpen(false)}>
          <X width={11} height={11} fill={colors.font.darkgray} />
        </CloseButton>
      </Wrapper>
    </Container>
  );
}

// container, wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 250px;
  max-width: 90vw;
  height: 150px;
  background-color: white;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  border: 1px solid ${colors.border.deepgray};

  margin-top: ${(props) => `${props.styledmarginy - 130}px`};
  margin-left: ${(props) => `${props.styledmarginx - 450}px`};
  z-index: 100;
`;

const HeaderContainer = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
`;

const ScheduleContainer = styled.div`
  height: 100%;
  max-height: 110px;
  padding: 0px 0px;
  overflow-y: scroll;
`;

// button
const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 8px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

const HeaderText = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Schedule = styled.div`
  height: 25px;
  font-size: 13px;
  background-color: red;
  margin-bottom: 1px;
  padding: 5px;
  color: white;
  background-color: ${(props) => props.styledbgcolor};
  cursor: pointer;
  overflow-x: hidden;
`;

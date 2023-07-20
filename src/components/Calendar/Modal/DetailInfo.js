import dayjs from "dayjs";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as colors from "../../../styles/colors";

// svg
import X from "../../../assets/x.svg";
import Check from "../../../assets/check.svg";

// 함수, context
import { removeArrayItem } from "@/utils/firebase/db";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";

export default function DetailInfoPopup() {
  const user = useAuth();
  const { selectedTodoData } = useCalendar();
  const { setIsDetailInfoPopupOpen, setIsMoreListPopupOpen } =
    useCalendarModal();

  const onRemoveSchedule = async () => {
    const remove = await removeArrayItem(
      "schedule",
      user.user.uid,
      "data",
      selectedTodoData.id
    );

    if (!remove) {
      setIsDetailInfoPopupOpen(false);
      setIsMoreListPopupOpen(false);
    } else {
      console.log(remove);
    }
  };

  return (
    <Container
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <SmallHeaderText>제목</SmallHeaderText>
      <InfoText>{selectedTodoData.title}</InfoText>
      <SmallHeaderText>일시</SmallHeaderText>
      <InfoText>
        {dayjs(selectedTodoData.start).format("YYYY-MM-DD")} ~
        {dayjs(selectedTodoData.end).format("YYYY-MM-DD")}
      </InfoText>
      <CloseButton onClick={() => setIsDetailInfoPopupOpen(false)}>
        <X width={13} height={13} fill={colors.font.darkgray} />
      </CloseButton>
      <ButtonContainer>
        <SaveButton
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          styledbg={"#d32f2f"}
          styledfont={"white"}
          onClick={onRemoveSchedule}
        >
          삭제
        </SaveButton>
        <SaveButton
          onClick={() => setIsDetailInfoPopupOpen(false)}
          whileHover={{ backgroundColor: colors.background.gray }}
          whileTap={{ scale: 0.95 }}
        >
          확인
        </SaveButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  width: 400px;
  max-width: 90vw;
  height: 210px;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
  z-index: 101;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
  display: flex;
`;

// button
const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;

  margin: 20px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

const SaveButton = styled(motion.button)`
  width: fit-content;
  border-radius: 7px;
  padding: 8px 23px;
  border: none;
  background-color: ${(props) => props.styledbg};
  color: ${(props) => props.styledfont};
  font-size: 15px;
  margin-left: 10px;
`;

// text
const HeaderText = styled.p`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 800;
`;

const SmallHeaderText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 10px;
  color: ${colors.font.darkgray};
`;

const InfoText = styled.p`
  margin-bottom: 15px;
`;

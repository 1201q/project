import dayjs from "dayjs";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import * as colors from "../../../styles/colors";

// svg
import X from "../../../assets/x.svg";
import Check from "../../../assets/check.svg";

// 함수, context
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";
import {
  removeSchedule,
  toggleScheduleComplete,
} from "@/utils/firebase/calendar";

export default function DetailInfoPopup() {
  const { selectedTodoData } = useCalendar();
  const { setIsDetailInfoPopupOpen, setIsMoreListPopupOpen } =
    useCalendarModal();

  const [checked, setChecked] = useState(selectedTodoData.isCompleted);
  const user = useAuth();

  const onRemoveSchedule = async () => {
    const confirm = window.confirm("삭제하시겠어요?");

    if (confirm) {
      const remove = await removeSchedule(
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
    }
  };

  return (
    <Container
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <InfoContainer>
        <SmallHeaderText>제목</SmallHeaderText>
        <InfoText>{selectedTodoData.title}</InfoText>
        <SmallHeaderText>일시</SmallHeaderText>
        <InfoText>
          {dayjs(selectedTodoData.start).format("YYYY-MM-DD")} ~
          {dayjs(selectedTodoData.end).format("YYYY-MM-DD")}
        </InfoText>
        <SmallHeaderText>상태</SmallHeaderText>
        <InfoText>1</InfoText>
      </InfoContainer>
      <CloseButton onClick={() => setIsDetailInfoPopupOpen(false)}>
        <X width={13} height={13} fill={colors.font.darkgray} />
      </CloseButton>
      <CheckBoxContainer
        onClick={() => {
          toggleScheduleComplete(
            "schedule",
            user.user.uid,
            "data",
            selectedTodoData.id
          );
          setChecked((prev) => !prev);
        }}
      >
        <HiddenCheckBox type="checkbox" checked={checked} onChange={() => {}} />
        <CheckBox checked={checked}>
          <Check
            width={15}
            height={15}
            fill="white"
            style={{ marginLeft: "3px", marginTop: "3px" }}
          />
        </CheckBox>
      </CheckBoxContainer>

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
  width: 280px;
  max-width: 90vw;
  height: 300px;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 2px;
  z-index: 101;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
  display: flex;
`;

const InfoContainer = styled.div`
  margin-top: 20px;
`;

const CheckBoxContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 45px;
  margin: 20px;
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

const InfoText = styled.div`
  margin-bottom: 15px;
  word-wrap: break-word;
`;

// checkbox

const CheckBox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: ${(props) =>
    props.checked ? `solid 2px ${colors.others.blue}` : `solid 2px #d5dadd`};
  background: ${(props) => (props.checked ? colors.others.blue : "#d5dadd")};
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.2s;
`;

const HiddenCheckBox = styled.input`
  border: none;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  overflow: hidden;
`;

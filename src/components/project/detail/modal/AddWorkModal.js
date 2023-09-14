import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as colors from "../../../../styles/colors";

// svg
import X from "../../../../assets/x.svg";
import Calendar from "../../../../assets/calendar.svg";
import Ex from "../../../../assets/cross-small.svg";

// 함수, context
import { useAuth } from "@/utils/context/auth/AuthProvider";

// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { addSchedule } from "@/utils/firebase/calendar";

export default function AddWorkModal({ setIsAddWorkModalOpen }) {
  const user = useAuth();
  const titleInputRef = useRef();
  const controls = useAnimationControls();

  const modalRef = useRef();

  const onUpdateSchedule = async () => {
    if (title !== "" && !error) {
      const update = await addSchedule(
        "schedule",
        user.user.uid,
        "data",
        scheduleData[0]
      );

      if (!update) {
        setIsAddScheduleModalOpen(false);
      } else {
        console.log(update);
      }
    } else {
      shakeModal();
      setError(true);
      titleInputRef.current.focus();

      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  const shakeModal = () => {
    controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.3,
      },
    });
  };

  return (
    <Container>
      <ModalContainer
        animate={controls}
        transition={{ duration: 0.1 }}
        ref={modalRef}
      >
        <HeaderText>업무 추가하기</HeaderText>
        {/* 제목 input */}
        <InputContainer>
          <SmallHeaderText>업무명</SmallHeaderText>
          <TitleInput
            type="text"
            name="title"
            placeholder="업무명을 입력하세요"
          />
        </InputContainer>
        <StatusSelectContainer>
          <SmallHeaderText>상태</SmallHeaderText>
          <JustifyFlexDiv>
            <Status styledbgcolor={"#00B2FF"}>요청</Status>
            <Status styledbgcolor={"#00B01C"}>진행</Status>
            <Status styledbgcolor={"#402A9D"}>완료</Status>
            <Status styledbgcolor={"#FD7900"}>피드백</Status>
            <Status styledbgcolor={"#777777"}>보류</Status>
          </JustifyFlexDiv>
        </StatusSelectContainer>
        {/* 버튼 컨테이너 */}
        <ButtonContainer>
          <SaveButton
            whileHover={{ backgroundColor: colors.background.gray }}
            whileTap={{ scale: 0.95 }}
            styledbg={"white"}
            styledfont={colors.font.darkgray}
            onClick={() => {
              setIsAddWorkModalOpen(false);
            }}
          >
            취소
          </SaveButton>

          <SaveButton
            styledfont={"white"}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpdateSchedule}
          >
            저장
          </SaveButton>
        </ButtonContainer>
        <CloseButton onClick={() => setIsAddWorkModalOpen(false)}>
          <X width={13} height={13} fill={colors.font.darkgray} />
        </CloseButton>
      </ModalContainer>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 580px;
  max-width: 90vw;

  height: 620px;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
  display: flex;
`;

const InputContainer = styled.div`
  margin-bottom: 30px;
  height: 70px;
`;

const StatusSelectContainer = styled.div``;

const JustifyFlexDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

// header
const HeaderText = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 800;
`;

const SmallHeaderText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: ${colors.font.darkgray};
`;

// input
const TitleInput = styled.input`
  width: 100%;
  padding: 10px;

  border-radius: 7px;

  outline: none;
  font-size: 15px;
  background-color: ${(props) =>
    props.errorbg ? "rgba(236, 112, 99, 0.1)" : colors.background.gray};
  border: ${(props) =>
    props.errorborder
      ? "2px solid rgba(236, 112, 99, 0.5)"
      : `1px solid ${colors.background.gray}`};
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

// select
const Status = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  border-radius: 25px;
  background-color: ${(props) => props.styledbgcolor};
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
`;

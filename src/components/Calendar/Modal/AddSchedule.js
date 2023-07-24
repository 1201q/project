import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as colors from "../../../styles/colors";

// svg
import X from "../../../assets/x.svg";
import Check from "../../../assets/check.svg";
import Calendar from "../../../assets/calendar.svg";

// 함수, context
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { updateArrayField } from "@/utils/firebase/db";
import { useCalendar, useCalendarModal } from "@/utils/context/CalendarContext";

// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";

export default function AddScheduleModal() {
  const user = useAuth();
  const { selectedDate } = useCalendar();
  const { setIsAddScheduleModalOpen } = useCalendarModal();

  // state
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [startDate, setStartDate] = useState(new Date(selectedDate));
  const [endDate, setEndDate] = useState(new Date(selectedDate));

  const modalRef = useRef();

  const scheduleData = [
    {
      id: uuidv4(),
      user: user.user.uid,
      title: title,
      color: selectedColor,
      start: dayjs(`${startDate}`).format(""),
      end: dayjs(`${endDate}`).format(""),
      isCompleted: false,
    },
  ];

  const onUpdateSchedule = async () => {
    const update = await updateArrayField(
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
  };

  return (
    <Container>
      <ModalContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
        ref={modalRef}
      >
        <HeaderText>일정 추가하기</HeaderText>
        {/* 제목 input */}
        <TitleInputContainer>
          <SmallHeaderText>제목</SmallHeaderText>
          <TitleInput
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleInputContainer>
        {/* 일자 셀렉 input */}
        <DateSelectContainer>
          {/* start */}
          <DatePickerContainer>
            <SmallHeaderText>시작</SmallHeaderText>
            <DatePicker
              locale={enUS}
              selected={startDate}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              onChange={(startdate) => {
                setStartDate(startdate);

                if (dayjs(endDate).isBefore(dayjs(startdate))) {
                  const newStart = new Date(startdate);
                  newStart.setHours(23);
                  newStart.setMinutes(59);
                  setEndDate(newStart);
                }
              }}
              customInput={
                <InputDatePicker>
                  {dayjs(startDate).format("YYYY-MM-DD HH:mm")}
                  <Calendar
                    width={13}
                    height={13}
                    style={{ position: "absolute", right: 10 }}
                    fill={colors.others.gray}
                  />
                </InputDatePicker>
              }
            />
          </DatePickerContainer>
          {/* end */}
          <DatePickerContainer>
            <SmallHeaderText>끝</SmallHeaderText>
            <DatePicker
              locale={enUS}
              selected={endDate}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              customInput={
                <InputDatePicker>
                  {dayjs(endDate).format("YYYY-MM-DD HH:mm")}{" "}
                  <Calendar
                    width={13}
                    height={13}
                    style={{ position: "absolute", right: 10 }}
                    fill={colors.others.gray}
                  />
                </InputDatePicker>
              }
            />
          </DatePickerContainer>
        </DateSelectContainer>
        {/* 버튼 컨테이너 */}
        <ButtonContainer>
          <SaveButton
            whileHover={{ backgroundColor: colors.background.gray }}
            whileTap={{ scale: 0.95 }}
            styledbg={"white"}
            styledfont={colors.font.darkgray}
            onClick={() => {
              setIsAddScheduleModalOpen(false);
            }}
          >
            취소
          </SaveButton>

          <SaveButton
            styledbg={"#1A73E8"}
            styledfont={"white"}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpdateSchedule}
          >
            저장
          </SaveButton>
        </ButtonContainer>
        <ColorPickerContainer>
          <SmallHeaderText>색인</SmallHeaderText>
          <ColorPickerWrapper>
            {Object.keys(colors.calendar).map((key) => (
              <ColorPickerButton
                key={key}
                styledbg={colors.calendar[key]}
                onClick={() => setSelectedColor(key)}
              >
                {selectedColor === key && (
                  <Check
                    width={14}
                    height={14}
                    fill={colors.font.black}
                    style={{ marginTop: "2px" }}
                  />
                )}
              </ColorPickerButton>
            ))}
          </ColorPickerWrapper>
        </ColorPickerContainer>
        <CloseButton onClick={() => setIsAddScheduleModalOpen(false)}>
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
  width: 530px;
  max-width: 90vw;

  height: 420px;
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.15);
`;

const DateSelectContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const DatePickerContainer = styled.div`
  margin-right: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
  display: flex;
`;

const TitleInputContainer = styled.div`
  margin-bottom: 30px;
`;

const ColorPickerContainer = styled.div``;

// wrapper

const ColorPickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  border: none;
  background-color: ${colors.background.gray};
  border-radius: 7px;
  outline: none;
  font-size: 15px;
`;

const InputDatePicker = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 155px;
  padding: 6px 10px;
  font-size: 13px;
  background-color: ${colors.background.gray};
  color: ${colors.font.darkgray};
  font-weight: 400;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
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

const ColorPickerButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  border: 2px solid ${colors.border.deepgray};
  background-color: ${(props) => props.styledbg};
`;

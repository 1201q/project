import dayjs from "dayjs";
import { useRef, useState } from "react";
import styled from "styled-components";
import * as colors from "../../styles/colors";
import X from "../../assets/x.svg";
import Check from "../../assets/check.svg";
import { color, motion } from "framer-motion";

export default function Modal({
  setIsModalOpen,
  setSelectedDate,
  selectedDate,
}) {
  const [selectedColor, setSelectedColor] = useState(null);

  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
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
          <TitleInput type="text" placeholder="제목을 입력하세요" />
        </TitleInputContainer>

        {/* 일자 셀렉 input */}
        <DateSelectContainer>
          <InputContainer>
            <div>
              <SmallHeaderText>시작</SmallHeaderText>
              <InputWrapper>
                <DatePicker
                  type="date"
                  defaultValue={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  style={{ marginRight: "8px" }}
                />
                <DatePicker type="time" defaultValue="09:00" />
              </InputWrapper>
            </div>
            <div>
              <SmallHeaderText>끝</SmallHeaderText>
              <InputWrapper>
                <DatePicker
                  type="date"
                  defaultValue={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  style={{ marginRight: "8px" }}
                />
                <DatePicker type="time" defaultValue="23:59" />
              </InputWrapper>
            </div>
          </InputContainer>
        </DateSelectContainer>
        {/* 버튼 컨테이너 */}
        <ButtonContainer>
          <SaveButton
            whileHover={{ backgroundColor: colors.background.gray }}
            whileTap={{ scale: 0.95 }}
            styledbg={"white"}
            styledfont={colors.font.darkgray}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            취소
          </SaveButton>
          <SaveButton
            styledbg={"#1A73E8"}
            styledfont={"white"}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
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
        <CloseButton onClick={() => setIsModalOpen(false)}>
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
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
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
const InputWrapper = styled.div`
  display: flex;
`;

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
const DatePicker = styled.input`
  width: 110px;
  padding: 2px 4px;
  font-size: 13px;
  background-color: ${colors.background.gray};
  border: none;
  border-radius: 5px;
  outline: none;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;

  border: none;
  background-color: ${colors.background.gray};
  border-radius: 7px;
  outline: none;
  font-size: 15px;
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

import dayjs from "dayjs";
import styled from "styled-components";
import { AnimatePresence, color, motion } from "framer-motion";
import { useState } from "react";
import * as colors from "../../../../styles/colors";

// svg
import X from "../../../../assets/x.svg";
import Check from "../../../../assets/check.svg";

export default function SettingModal() {
  return (
    <AnimatePresence>
      <Container
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <Controller>
          <OptionContainer>
            <OptionText>내 담당 업무만</OptionText>
            <Radio type="radio" name="option" />
            <OptionText>전체</OptionText>
            <Radio type="radio" name="option" />
          </OptionContainer>
          <OptionSelectContainer>
            <MenuBtn>상태</MenuBtn>
            <MenuBtn>우선순위</MenuBtn>
            <MenuBtn>마감일</MenuBtn>
          </OptionSelectContainer>
        </Controller>

        <CloseButton onClick={() => console.log("1")}>
          <X width={10} height={11} fill={"white"} />
        </CloseButton>
      </Container>
    </AnimatePresence>
  );
}

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;

  right: 20px;
  width: 450px;
  max-width: 90vw;
  height: 50px;
  background-color: ${colors.background.midnight};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 2px;
  z-index: 100;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const OptionContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  border-right: 1px solid ${colors.border.darkgray};
  padding-left: 20px;
`;

const OptionSelectContainer = styled.div`
  display: flex;
  width: 50%;
  padding-left: 10px;
`;

const Controller = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const OptionText = styled.p`
  font-size: 14px;
  margin-right: 10px;
  color: white;
`;

const Radio = styled.input`
  width: 17px;
  height: 17px;
  margin-right: 15px;
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

  margin-top: 15px;
  margin-right: 15px;

  &:hover {
    /* background-color: ${colors.background.gray}; */
  }
`;

const MenuBtn = styled.button`
  color: white;
  background: none;
  border: none;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 14px;
  :hover {
    background-color: #343541;
  }
`;

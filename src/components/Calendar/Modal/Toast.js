import dayjs from "dayjs";
import { useRef, useState } from "react";
import styled from "styled-components";
import * as colors from "../../../styles/colors";
import { color, motion } from "framer-motion";
import Check from "../../../assets/check.svg";

export default function Toast({ text }) {
  return (
    <Container
      initial={{ opacity: 0, y: 20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
    >
      <IconContainer>
        <Check fill={colors.calendar.mint} width={15} height={15} />
      </IconContainer>
      <TextContainer>삭제했어요.</TextContainer>
    </Container>
  );
}

const Container = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  width: 180px;
  height: 40px;
  background-color: ${colors.calendar.mint};
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  display: flex;
  align-items: center;
  padding: 12px 12px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  font-size: 17px;
  color: white;
  font-weight: 700;
`;

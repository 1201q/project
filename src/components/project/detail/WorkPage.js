import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../../styles/colors";
import { useEffect, useState, useRef } from "react";

export default function WorkPage() {
  return (
    <Container>
      <TableHeaderContainer>
        <HeaderBox>업무명</HeaderBox>
        <HeaderBox maxwidth={"150px"}> 상태</HeaderBox>
        <HeaderBox maxwidth={"150px"}>우선순위</HeaderBox>
        <HeaderBox maxwidth={"150px"}>담당자</HeaderBox>
        <HeaderBox maxwidth={"150px"}>시작일</HeaderBox>
        <HeaderBox maxwidth={"150px"}>마감일</HeaderBox>
      </TableHeaderContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: white;
`;

const HeaderBox = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxwidth};
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${colors.border.deepgray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: ${colors.font.gray};

  :hover {
    border: 2px solid rgba(139, 0, 234, 0.4);
    background-color: #f5f3ff;
  }
`;

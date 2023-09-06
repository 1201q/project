import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import Exclamation from "../../assets/exclamation (3).svg";
import Image from "next/image";
import { useAuth } from "@/utils/context/auth/AuthProvider";
import { useState, useEffect } from "react";

export default function Welcome() {
  const user = useAuth();
  const [today, setToday] = useState(null);

  const getWeekDay = () => {
    switch (dayjs().day()) {
      case 0:
        setToday("일");
        break;
      case 1:
        setToday("월");
        break;
      case 2:
        setToday("화");
        break;
      case 3:
        setToday("수");
        break;
      case 4:
        setToday("목");
        break;
      case 5:
        setToday("금");
        break;
      case 6:
        setToday("토");
        break;
    }
  };

  useEffect(() => {
    getWeekDay();
  }, []);

  return (
    <FlexDiv>
      <Circle>
        <Exclamation />
      </Circle>
      <Contents>
        <FlexDiv>
          <Hi>안녕하세요. {user.user ? user.user.displayName : ""}님!</Hi>
          <Image
            src={require("../../assets/smile.png")}
            width={22}
            height={22}
            alt="smile"
            style={{ marginLeft: "10px", marginBottom: "2px" }}
          />
        </FlexDiv>
        <TodayHi>
          오늘은 {dayjs().format("YYYY년 M월 D일")} {today}요일이에요.
        </TodayHi>
      </Contents>
    </FlexDiv>
  );
}

const Contents = styled.div``;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 18px;
`;
const Hi = styled.p`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.font.black};
`;
const TodayHi = styled.p`
  margin-top: 2px;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.font.gray};
`;

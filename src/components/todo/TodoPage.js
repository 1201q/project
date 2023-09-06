import styled from "styled-components";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import * as colors from "../../styles/colors";
import TodoDetail from "./TodoDetail";
import { useEffect, useState, useRef } from "react";
import CaretDown from "../../assets/caret-down.svg";
import { useCalendar } from "@/utils/context/CalendarContext";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMain } from "@/utils/context/MainContext";
import { useRouter } from "next/router";

dayjs.extend(customParseFormat);

export default function TodoPage() {
  const { scheduleList } = useCalendar();
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectMenu, setSelectMenu] = useState("today");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const router = useRouter();

  const renderMenuText = () => {
    if (selectMenu === "today") {
      return <div>오늘</div>;
    } else if (selectMenu === "week") {
      return <div>이번 주</div>;
    } else if (selectMenu === "month") {
      return <div>이번 달</div>;
    } else if (selectMenu === "all") {
      return <div>전체</div>;
    }
  };

  useEffect(() => {
    if (selectMenu === "today") {
      setStartDate(currentDate.startOf("day"));
      setEndDate(currentDate.endOf("day"));
    } else if (selectMenu === "week") {
      const isSunday = currentDate.get("day") === 0;
      if (isSunday) {
        // current date가 일요일일 경우
        // 시작일은 -1일 후 토요일에서 구함. 시작일은 일요일이므로 다시 1을 더함.
        // 끝나는일은 currentdate (일요일이므로) 별다른 로직x
        setEndDate(currentDate.endOf("day"));
      } else {
        // current date가 일요일이 아닐 경우
        // 시작일은 일요일이므로 하루를 더해 월요일로 만듦
        // 끝나는일은 토요일이므로 하루를 더해 일요일로 만듦
        setStartDate(currentDate.startOf("week").add(1, "day"));
        setEndDate(currentDate.endOf("week").add(1, "day"));
      }
    } else if (selectMenu === "month") {
      setStartDate(currentDate.startOf("month"));
      setEndDate(currentDate.endOf("month"));
    } else if (selectMenu === "all") {
      setStartDate(dayjs("2023-01-01"));
      setEndDate(dayjs("2032-01-01"));
    }
    setIsDropDownVisible(false);
  }, [selectMenu]);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeaderContainer>
        <HeaderText>할 일</HeaderText>
        <ControlBtn
          onClick={() => {
            setIsDropDownVisible((prev) => !prev);
          }}
        >
          {renderMenuText()}
          <CaretDown
            width={12}
            height={12}
            style={{ marginLeft: "4px" }}
            fill={colors.font.gray}
          />
          {isDropDownVisible && (
            <DropDown>
              <DropDownMenu
                onClick={() => {
                  setSelectMenu("today");
                }}
              >
                오늘
              </DropDownMenu>
              <DropDownMenu
                onClick={() => {
                  setSelectMenu("week");
                }}
              >
                이번 주
              </DropDownMenu>
              <DropDownMenu
                onClick={() => {
                  setSelectMenu("month");
                }}
              >
                이번 달
              </DropDownMenu>
              <DropDownMenu
                onClick={() => {
                  setSelectMenu("all");
                }}
              >
                전체
              </DropDownMenu>
            </DropDown>
          )}
        </ControlBtn>
        {selectMenu !== "all" && (
          <DateText>{endDate.format(`YYYY년 MM월 DD일`)}까지</DateText>
        )}
      </HeaderContainer>
      <Contents>
        {scheduleList
          .filter((item) => {
            if (selectMenu === "today") {
              return currentDate.isSame(dayjs(item.end), "day");
            } else if (selectMenu === "week") {
              return (
                dayjs(item.start).isBetween(dayjs(startDate), dayjs(endDate)) ||
                dayjs(item.end).isBetween(dayjs(startDate), dayjs(endDate))
              );
            } else if (selectMenu === "month") {
              return (
                dayjs(item.start).isBetween(dayjs(startDate), dayjs(endDate)) ||
                dayjs(item.end).isBetween(dayjs(startDate), dayjs(endDate))
              );
            } else if (selectMenu === "all") {
              return true;
            }
          })
          .sort(
            (a, b) =>
              dayjs(a.end).diff(dayjs(), "minutes") -
              dayjs(b.end).diff(dayjs(), "minutes")
          )
          .sort((a, b) => {
            const aa = dayjs(a.end).diff(dayjs(), "minutes");
            const bb = dayjs(b.end).diff(dayjs(), "minutes");

            if (aa > 0 && bb > 0) {
              return 0;
            } else {
              return -1;
            }
          })
          .sort((a, b) => a.isCompleted - b.isCompleted)
          .map((item) => (
            <TodoDetail
              key={item.id}
              scheduleData={item}
              color={colors.calendar[item.color]}
              title={item.title}
              isCompleted={item.isCompleted}
              start={item.start}
              end={item.end}
            />
          ))}
      </Contents>
    </Container>
  );
}

// 컨테이너
const Container = styled(motion.div)`
  width: 100%;
  max-height: 99vh;
`;
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid ${colors.border.gray};
  height: 61px;
`;

const HeaderText = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: ${colors.font.black};
  cursor: pointer;
`;

const DateText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.font.gray};
`;

const ControlBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.font.gray};
  padding: 0px 13px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 24px;
  width: 60px;
  padding-top: 2px;
  background-color: white;
  border: 1px solid ${colors.border.deepgray};
`;

const DropDownMenu = styled.div`
  width: 100%;
  font-size: 13px;
  margin-bottom: 5px;
  padding: 5px 6px;

  &:hover {
    background-color: ${colors.background.gray};
  }
`;

const Contents = styled(motion.div)`
  margin-top: 5px;
  width: 100%;
  max-height: 90vh;
  overflow-y: scroll;
  padding: 5px 10px 30px 10px;
  background-color: white;
`;

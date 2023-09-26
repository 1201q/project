import styled from "styled-components";
import * as colors from "../../../../styles/colors";
import ArrowDown from "../../../../assets/arrow-small-down.svg";
import ArrowUp from "../../../../assets/arrow-small-up.svg";
import Emergency from "../../../../assets/light-emergency-on.svg";
import Minus from "../../../../assets/minus-small.svg";
import Calendar from "../../../../assets/calendar.svg";
import { useProject } from "@/utils/context/ProjectContext";
import { useEffect, useState } from "react";

// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { addSchedule } from "@/utils/firebase/calendar";
import dayjs from "dayjs";

export default function OptionPopup({ id, workData }) {
  const { selectedProjectMembersData } = useProject();
  const [userArr, setUserArr] = useState(
    new Array(selectedProjectMembersData.length).fill(true)
  );
  const [startDate, setStartDate] = useState(new Date(workData?.start));
  const [endDate, setEndDate] = useState(
    new Date(dayjs(workData?.end).endOf("day"))
  );

  useEffect(() => {
    setUserArr(
      selectedProjectMembersData.map((user) =>
        workData?.manager.includes(user.uid)
      )
    );
  }, []);

  const renderStatus = () => {
    return (
      <>
        <Status styledbgcolor={"#00B2FF"}>요청</Status>
        <Status styledbgcolor={"#00B01C"}>진행</Status>
        <Status styledbgcolor={"#402A9D"}>완료</Status>
        <Status styledbgcolor={"#FD7900"}>피드백</Status>
        <Status styledbgcolor={"#777777"}>보류</Status>
      </>
    );
  };

  const renderPriority = () => {
    return (
      <>
        <Priority>
          <Emergency fill={colors.calendar.red} width={20} height={20} />
          긴급
        </Priority>
        <Priority>
          <ArrowUp fill={colors.calendar.red} width={20} height={20} />
          높음
        </Priority>
        <Priority>
          <Minus fill={colors.calendar.blue} width={20} height={20} />
          중간
        </Priority>
        <Priority>
          <ArrowDown fill={colors.calendar.gray} width={20} height={20} />
          낮음
        </Priority>
        <Priority>우선순위 없음</Priority>
      </>
    );
  };

  const renderManager = () => {
    const onCheckBoxChange = (index) => {
      setUserArr((prev) => {
        const newArr = [...prev];
        newArr[index] = !newArr[index];
        return newArr;
      });
    };

    return (
      <>
        {selectedProjectMembersData.map((user, index) => (
          <User key={user.uid}>
            <input
              type="checkbox"
              checked={userArr[index]}
              onChange={() => {
                onCheckBoxChange(index);
              }}
            />
            <div>{user.name}</div>
          </User>
        ))}
        <SaveButton
          onClick={() => {
            console.log(
              selectedProjectMembersData.filter((user, index) => {
                if (userArr[index]) {
                  return user;
                }
              })
            );
          }}
        >
          저장
        </SaveButton>
      </>
    );
  };

  const renderDate = () => {
    return (
      <FlexDiv>
        {/* 시작일 */}
        <ContentsContainer>
          <SmallHeaderText>시작일</SmallHeaderText>
          <DatePicker
            locale={ko}
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
        </ContentsContainer>
        {/* 마감일 */}
        <ContentsContainer>
          <SmallHeaderText>마감일</SmallHeaderText>
          <DatePicker
            locale={ko}
            selected={endDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            customInput={
              <InputDatePicker>
                {dayjs(endDate).format("YYYY-MM-DD HH:mm")}
                <Calendar
                  width={13}
                  height={13}
                  style={{ position: "absolute", right: 10 }}
                  fill={colors.others.gray}
                />
              </InputDatePicker>
            }
          />
        </ContentsContainer>
        <SaveButton2>저장</SaveButton2>
      </FlexDiv>
    );
  };

  const renderContents = (id) => {
    if (id === "status") {
      return renderStatus();
    } else if (id === "priority") {
      return renderPriority();
    } else if (id === "manager") {
      return renderManager();
    } else if (id === "date") {
      return renderDate();
    }
  };

  return <Container>{renderContents(id)}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 72px;
  height: 26px;
  border-radius: 25px;
  background-color: ${(props) => props.styledbgcolor};
  color: white;
  font-weight: 500;
  font-size: 13px;
  margin: 3px 0px;
  cursor: pointer;
`;

const Priority = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: 500;
  height: 26px;
  cursor: pointer;
  margin: 3px 0px;
  svg {
    margin-right: 5px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0px;
  width: 100%;
  height: 25px;
  background-color: #eeeeee;
  padding: 0px 3px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 700;
  border: 2px solid #eeeeee;

  input {
    margin-right: 5px;
  }
`;

const SaveButton = styled.button`
  border: none;
  border-radius: 7px;
  padding: 2px 5px;
  margin-top: 5px;
  width: 100%;
  background-color: #1a73e8;
  color: white;
  font-weight: 300;
`;
const SaveButton2 = styled.button`
  border: none;
  border-radius: 7px;
  padding: 3px 7px;
  margin-top: 5px;
  width: 50px;
  background-color: #1a73e8;
  color: white;
  font-weight: 300;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

//
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

const ContentsContainer = styled.div`
  margin-bottom: 30px;
`;

const FlexDiv = styled.div`
  width: 360px;
  height: 310px;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const SmallHeaderText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: ${colors.font.darkgray};
`;

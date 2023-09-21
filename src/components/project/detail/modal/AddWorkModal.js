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
import UserIcon from "../../../../assets/user.svg";

// 함수, context
import { useAuth } from "@/utils/context/auth/AuthProvider";

// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { addSchedule } from "@/utils/firebase/calendar";

import ArrowDown from "../../../../assets/arrow-small-down.svg";
import ArrowUp from "../../../../assets/arrow-small-up.svg";
import Emergency from "../../../../assets/light-emergency-on.svg";
import Minus from "../../../../assets/minus-small.svg";
import { useProject } from "@/utils/context/ProjectContext";
import { addProject } from "@/utils/firebase/project";

export default function AddWorkModal({ setIsAddWorkModalOpen }) {
  const controls = useAnimationControls();
  const {
    selectedProjectMembersData,
    setSelectedProjectMembersData,
    selectedProjectUid,
    selectedProjectData,
  } = useProject();

  const modalRef = useRef();
  const managerModalRef = useRef();
  const priorityModalRef = useRef();
  const groupSelectModalRef = useRef();
  const status = ["요청", "진행", "완료", "피드백", "보류"];
  const statusColor = ["#00B2FF", "#00B01C", "#402A9D", "#FD7900", "#777777"];
  const [statusArrSelect, setStatusArrSelect] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(dayjs().endOf("day")));
  const [workStatus, setWorkStatus] = useState("request");
  const [workPriority, setWorkPriority] = useState(null);
  const [group, setGroup] = useState(null);
  const [managerArr, setManagerArr] = useState([]);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [isGroupSelectModalOpen, setIsGroupSelectModalOpen] = useState(false);

  const test = async () => {
    const data = {
      title: title,
      workUID: uuidv4(),
      projectUID: selectedProjectUid,
      group: group,
      status: workStatus,
      priority: workPriority,
      start: dayjs(startDate).format(""),
      end: dayjs(endDate).format(""),
      manager: managerArr.map((user) => user.uid),
    };

    const update = await addProject(
      "project-work",
      selectedProjectUid,
      "work",
      data
    );
    if (update === null) {
      setIsAddWorkModalOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isPriorityModalOpen &&
        priorityModalRef.current &&
        !priorityModalRef.current.contains(e.target)
      ) {
        setIsPriorityModalOpen(false);
      }
    };

    if (isPriorityModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, [isPriorityModalOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isManagerModalOpen &&
        managerModalRef.current &&
        !managerModalRef.current.contains(e.target)
      ) {
        setIsManagerModalOpen(false);
      }
    };
    if (isManagerModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, [isManagerModalOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isGroupSelectModalOpen &&
        groupSelectModalRef.current &&
        !groupSelectModalRef.current.contains(e.target)
      ) {
        setIsGroupSelectModalOpen(false);
      }
    };
    if (isGroupSelectModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, [isGroupSelectModalOpen]);

  const handlerStatus = (index) => {
    let arr = new Array(5).fill(false);
    let status = "request";
    arr[index] = true;
    setStatusArrSelect(arr);

    if (index === 0) {
      status = "request";
    } else if (index === 1) {
      status = "progress";
    } else if (index === 2) {
      status = "complete";
    } else if (index === 3) {
      status = "feedback";
    } else if (index === 4) {
      status = "pending";
    }
    setWorkStatus(status);
  };

  const handlerPriority = (name) => {
    setWorkPriority(name);
    setIsPriorityModalOpen(false);
  };

  const handlerManager = (name) => {
    handlerManagerArr(name);
    setIsManagerModalOpen(false);
  };

  const handlerGroup = (group) => {
    setGroup(group);
    setIsGroupSelectModalOpen(false);
  };

  const handlerManagerArr = (user) => {
    const newUser = user;
    if (managerArr.includes(user)) {
      return;
    }

    if (managerArr.length === 0) {
      setManagerArr([newUser]);
    } else if (managerArr.length < 3) {
      setManagerArr([...managerArr, newUser]);
    }
  };

  const handlerRemoveManager = (clickedUser) => {
    let newArr = [...managerArr];
    let index = managerArr.findIndex((user) => user.uid === clickedUser.uid);

    if (index !== -1) {
      newArr.splice(index, 1);
      if (newArr.length === 0) {
        newArr = [];
      }
      setManagerArr(newArr);
    }
  };

  const getPriorityText = () => {
    if (workPriority === "urgent") {
      return "우선순위 긴급";
    } else if (workPriority === "high") {
      return "우선순위 높음";
    } else if (workPriority === "medium") {
      return "우선순위 중간";
    } else if (workPriority === "low") {
      return "우선순위 낮음";
    } else {
      return "우선순위 없음";
    }
  };

  const renderPriorityImg = () => {
    if (workPriority === "urgent") {
      return <Emergency fill={colors.calendar.red} width={15} height={15} />;
    } else if (workPriority === "high") {
      return <ArrowUp fill={colors.calendar.red} width={15} height={15} />;
    } else if (workPriority === "medium") {
      return <Minus fill={colors.calendar.blue} width={15} height={15} />;
    } else if (workPriority === "low") {
      return <ArrowDown fill={colors.calendar.gray} width={15} height={15} />;
    }
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
        <ContentsContainer>
          <SmallHeaderText>업무명</SmallHeaderText>
          <TitleInput
            type="text"
            name="title"
            placeholder="업무명을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </ContentsContainer>
        {/* 상태 */}
        <ContentsContainer>
          <SmallHeaderText>상태</SmallHeaderText>
          <JustifyFlexDiv>
            {status.map((item, index) => (
              <Status
                onClick={() => {
                  handlerStatus(index);
                }}
                styledbgcolor={
                  statusArrSelect[index] ? statusColor[index] : "#EEEEEE"
                }
                styledfontcolor={
                  statusArrSelect[index] ? "white" : colors.font.gray
                }
                name={status[index]}
                key={uuidv4()}
              >
                {item}
              </Status>
            ))}
          </JustifyFlexDiv>
        </ContentsContainer>
        {/* 업무 담당자 */}
        <ContentsContainer>
          <SmallHeaderText>업무 담당자</SmallHeaderText>
          <ManagerContainer>
            <ManagerInput
              placeholder="업무 담당자"
              onClick={() => {
                setIsManagerModalOpen((prev) => !prev);
              }}
            />
            {managerArr.map((user) => (
              <User
                key={user.uid}
                onClick={() => {
                  handlerRemoveManager(user);
                }}
              >
                {user.name}
                <UserXBtn>
                  <X width={8} height={8} fill={colors.font.darkgray} />
                </UserXBtn>
              </User>
            ))}

            {isManagerModalOpen && (
              <ManagerModal ref={managerModalRef}>
                {selectedProjectMembersData.map((item, index) => (
                  <InviteUser
                    key={item.uid}
                    onClick={() => {
                      handlerManager(item);
                    }}
                  >
                    {item.name}
                  </InviteUser>
                ))}
              </ManagerModal>
            )}
          </ManagerContainer>
        </ContentsContainer>
        {/* 시작일 마감일 */}
        <JustifyFlexDiv>
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
        </JustifyFlexDiv>
        {/* 우선순위 */}
        <PriorityContainer>
          <SmallHeaderText>우선순위</SmallHeaderText>
          <ClickText
            onClick={() => {
              setIsPriorityModalOpen((prev) => !prev);
            }}
          >
            {renderPriorityImg()}
            {getPriorityText()}
          </ClickText>
          {isPriorityModalOpen && (
            <PriorityModal ref={priorityModalRef}>
              <Priority
                onClick={() => {
                  handlerPriority("urgent");
                }}
              >
                <Emergency fill={colors.calendar.red} width={15} height={15} />
                긴급
              </Priority>
              <Priority
                onClick={() => {
                  handlerPriority("high");
                }}
              >
                <ArrowUp fill={colors.calendar.red} width={15} height={15} />
                높음
              </Priority>
              <Priority
                onClick={(e) => {
                  handlerPriority("medium");
                }}
              >
                <Minus fill={colors.calendar.blue} width={15} height={15} />
                중간
              </Priority>
              <Priority
                onClick={(e) => {
                  handlerPriority("low");
                }}
              >
                <ArrowDown fill={colors.calendar.gray} width={15} height={15} />
                낮음
              </Priority>
            </PriorityModal>
          )}
        </PriorityContainer>
        {/* 그룹 */}
        <GroupSelectContainer>
          <SmallHeaderText>그룹</SmallHeaderText>
          <ClickText
            onClick={() => {
              setIsGroupSelectModalOpen((prev) => !prev);
            }}
          >
            {!group ? "그룹 없음" : group}
          </ClickText>

          {isGroupSelectModalOpen && (
            <GroupSelectModal ref={groupSelectModalRef}>
              {selectedProjectData.projectGroup.map((item, index) => (
                <Group
                  key={uuidv4()}
                  onClick={() => {
                    handlerGroup(item);
                  }}
                >
                  {item}
                </Group>
              ))}
            </GroupSelectModal>
          )}
        </GroupSelectContainer>

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
            onClick={test}
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

  height: 640px;
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

const ContentsContainer = styled.div`
  margin-bottom: 30px;
`;

const JustifyFlexDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`;

const ManagerContainer = styled.div`
  display: flex;
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

const PriorityContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const GroupSelectContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
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
  color: ${(props) => props.styledfontcolor};
  font-weight: 500;
  font-size: 14px;
  border: none;
`;

const ManagerInput = styled.input`
  border: 1px solid black;
  width: 100px;
  height: 25px;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${colors.border.deepgray};
  margin-right: 15px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  margin-right: 10px;
  width: fit-content;
  height: 25px;

  background-color: #eeeeee;
  padding: 0px 5px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #eeeeee;

  :hover {
    box-sizing: border-box;
    border: 2px solid ${colors.calendar.mint};
  }
`;

const UserXBtn = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 5px;

  :hover {
    background-color: ${colors.calendar.mint};
    border-radius: 100%;

    svg {
      fill: white;
    }
  }
`;

const ClickText = styled.p`
  display: flex;
  width: fit-content;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  svg {
    margin-top: 1px;
    margin-right: 5px;
  }
`;

// 모달
const PriorityModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100px;
  background-color: white;
  position: absolute;
  margin-top: 10px;
  border: 1px solid ${colors.font.black};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  padding: 5px;
  z-index: 70;
`;

const Priority = styled.button`
  svg {
    margin-top: 2px;
    margin-right: 7px;
  }

  font-size: 16px;
  padding-top: 1px;
  /* margin-bottom: 2px; */
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    color: ${colors.font.darkgray};
  }
`;

const ManagerModal = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  position: absolute;
  margin-top: 30px;
  border: 1px solid ${colors.font.black};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  padding: 5px;
  z-index: 70;
  overflow-y: scroll;
`;

const InviteUser = styled.div`
  font-size: 15px;
  padding-top: 1px;
  margin-bottom: 3px;
  cursor: pointer;
  :hover {
    color: ${colors.font.darkgray};
  }
`;

const GroupSelectModal = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  position: absolute;
  margin-top: 10px;
  border: 1px solid ${colors.font.black};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 3px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  padding: 5px;
  z-index: 70;
  overflow-y: scroll;
`;
const Group = styled.div`
  font-size: 15px;
  padding-top: 1px;
  margin-bottom: 3px;
  cursor: pointer;
  :hover {
    color: ${colors.font.darkgray};
  }
`;

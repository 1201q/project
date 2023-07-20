import React, { useState, createContext, useContext } from "react";
import dayjs from "dayjs";

const CalendarContext = createContext();
const CalendarModalContext = createContext();

// calendar
export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // 캘린더 전달 다음달 이동시 사용
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 요일
  const [selectedTodoData, setSelectedTodoData] = useState(null); // 선택한 하나의 단일 스케줄
  const [selectedTodayScheduleArr, setSelectedTodayScheduleArr] = useState([]); // 선택한 하루 동안의 스케줄 array
  const [scheduleList, setScheduleList] = useState([]); // 스케줄 리스트

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        selectedDate,
        setSelectedDate,
        selectedTodoData,
        setSelectedTodoData,
        selectedTodayScheduleArr,
        setSelectedTodayScheduleArr,
        scheduleList,
        setScheduleList,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  return useContext(CalendarContext);
};

// modal, nonmodal
export const CalendarModalProvider = ({ children }) => {
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [isDetailInfoPopupOpen, setIsDetailInfoPopupOpen] = useState(false);
  const [isMoreListPopupOpen, setIsMoreListPopupOpen] = useState(false);
  const [moreListPopupPosition, setMoreListPopupPosition] = useState(null);

  return (
    <CalendarModalContext.Provider
      value={{
        isAddScheduleModalOpen,
        setIsAddScheduleModalOpen,
        isDetailInfoPopupOpen,
        setIsDetailInfoPopupOpen,
        isMoreListPopupOpen,
        setIsMoreListPopupOpen,
        moreListPopupPosition,
        setMoreListPopupPosition,
      }}
    >
      {children}
    </CalendarModalContext.Provider>
  );
};

export const useCalendarModal = () => {
  return useContext(CalendarModalContext);
};
